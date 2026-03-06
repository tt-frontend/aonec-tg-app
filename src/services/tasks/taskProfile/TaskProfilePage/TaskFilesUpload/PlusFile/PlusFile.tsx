import { FC, useRef } from "react";
import { Wrapper } from "./PlusFile.styled";
import { Props } from "./PlusFile.types";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { Spin } from "antd";
import { compressImage } from "./PlusFile.compressor";

export const PlusFile: FC<Props> = ({
  uniqId,
  accept,
  fileHandler,
  isLoading,
  multiple,
}) => {
  const id = `file-input-${uniqId}`;
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files) return;


    if (files.length > 3) {
      const isContinue = confirm(
        "Максимальное кол-во файлов для одновременной загрузки — 3, продолжить?",
      );
      if (!isContinue) return;
    }

    try {
      const processedFiles = await Promise.all(
        Array.from(files).map(async (file) => {
          if (file.type.startsWith("image/")) {
            return await compressImage(file);
          }
          return file;
        }),
      );

      // console.log(
      //   "Размеры файлов после обработки (KB):",
      //   processedFiles.map((f) => f.size / 1024),
      // );

      const dataTransfer = new DataTransfer();
      processedFiles.forEach((file) => dataTransfer.items.add(file));

      fileHandler(dataTransfer.files);
    } catch (error) {
      console.error("Ошибка сжатия:", error);
    }

    if (inputFileRef.current?.value) {
      inputFileRef.current.value = "";
    }
  };

  return (
    <>
      <input
        id={id}
        type="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        accept={accept}
        onChange={handleFileChange}
        multiple={multiple}
      />

      <Wrapper onClick={handleClick}>
        {!isLoading && <PlusIcon />}
        {isLoading && <Spin />}
      </Wrapper>
    </>
  );
};
