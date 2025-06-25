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

    if (files) fileHandler(files);
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
      />

      <Wrapper onClick={handleClick}>
        {!isLoading && <PlusIcon />}
        {}
        {isLoading && <Spin />}
      </Wrapper>
    </>
  );
};
