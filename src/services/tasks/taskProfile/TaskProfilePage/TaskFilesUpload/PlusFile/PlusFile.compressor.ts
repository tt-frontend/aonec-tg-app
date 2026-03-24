import { IS_TASK_FILES_IMAGE_COMPRESSION_ENABLED } from "@/constants/features";

const TARGET = 500 * 1024;
const TOLERANCE = 5 * 1024;
const MIN_SCALE = 0.1;
const MAX_ITERATIONS = 10;

type LoadedImage = {
  cleanup: () => void;
  height: number;
  source: CanvasImageSource;
  width: number;
};

export const shouldCompressImage = (file: File) =>
  IS_TASK_FILES_IMAGE_COMPRESSION_ENABLED &&
  file.type.startsWith("image/") &&
  file.size > TARGET;

const loadImage = async (file: File): Promise<LoadedImage> => {
  if ("createImageBitmap" in window) {
    const bitmap = await createImageBitmap(file);

    return {
      cleanup: () => bitmap.close(),
      height: bitmap.height,
      source: bitmap,
      width: bitmap.width,
    };
  }

  const image = new Image();
  const url = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve({
        cleanup: () => URL.revokeObjectURL(url),
        height: image.naturalHeight,
        source: image,
        width: image.naturalWidth,
      });
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for compression."));
    };

    image.src = url;
  });
};

const drawScaledImage = async (
  file: File,
  image: LoadedImage,
  scale: number,
): Promise<File | null> => {
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D context is not available.");
  }

  context.drawImage(image.source, 0, 0, width, height);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, file.type);
  });

  if (!blob || blob.type !== file.type) {
    return null;
  }

  return new File([blob], file.name, {
    lastModified: file.lastModified,
    type: file.type,
  });
};

export const compressImage = async (file: File): Promise<File> => {
  if (!shouldCompressImage(file)) {
    return file;
  }

  const loadedImage = await loadImage(file);

  try {
    let low = MIN_SCALE;
    let high = 1;
    let bestFile: File = file;
    let bestDiff = Infinity;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const mid = (low + high) / 2;
      const resized = await drawScaledImage(file, loadedImage, mid);

      if (!resized) {
        return file;
      }

      const diff = Math.abs(resized.size - TARGET);

      if (resized.size < file.size && diff < bestDiff) {
        bestDiff = diff;
        bestFile = resized;
      }

      if (diff <= TOLERANCE) {
        return resized.size < file.size ? resized : file;
      }

      if (resized.size > TARGET) {
        high = mid;
      } else {
        low = mid;
      }
    }

    return bestFile.size < file.size ? bestFile : file;
  } finally {
    loadedImage.cleanup();
  }
};
