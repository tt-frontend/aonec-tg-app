import Compressor from "compressorjs";

const TARGET = 500 * 1024;
const TOLERANCE = 5 * 1024; // ±5 KB допустим

export const compressImage = async (file: File): Promise<File> => {
  const compress = (q: number) =>
    new Promise<File>((resolve, reject) => {
      new Compressor(file, {
        quality: q,
        mimeType: "image/jpeg",
        convertSize: 0,
        success(result) {
          resolve(
            new File([result], "image.jpg", {
              type: "image/jpeg",
            }),
          );
        },
        error(err) {
          reject(err);
        },
      });
    });

  let low = 0.05;
  let high = 0.95;

  let bestFile: File = file;
  let bestDiff = Infinity;

  for (let i = 0; i < 10; i++) {
    const mid = (low + high) / 2;

    const compressed = await compress(mid);
    const diff = Math.abs(compressed.size - TARGET);

    // запоминаем лучший результат
    if (diff < bestDiff) {
      bestDiff = diff;
      bestFile = compressed;
    }

    // если попали в диапазон — выходим
    if (diff <= TOLERANCE) {
      return compressed;
    }

    if (compressed.size > TARGET) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return bestFile;
};
