import { FC, useRef } from "react";
import { Wrapper } from "./PlusFile.styled";
import { Props } from "./PlusFile.types";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { Spin } from "antd";

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
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    if (files.length > 3) {
      const isContinue = confirm(
        "Максимальное кол-во файлов для одновременной загрузки — 3, продолжить?"
      );

      if (!isContinue) return;
    }

    fileHandler(files);

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
        capture="environment"
      />

      <Wrapper onClick={handleClick}>
        {!isLoading && <PlusIcon />}
        {}
        {isLoading && <Spin />}
      </Wrapper>
    </>
  );
};
