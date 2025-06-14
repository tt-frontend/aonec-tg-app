import { FC } from "react";
import { Wrapper } from "./PlusFile.styled";
import { Props } from "./PlusFile.types";
import { PlusIcon } from "@/components/icons/PlusIcon";

export const PlusFile: FC<Props> = ({ uniqId, accept, fileHandler }) => {
  const id = `file-input-${uniqId}`;

  const handleFile = (files: FileList) => {
    fileHandler(files);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) handleFile(event.target.files);
  };

  return (
    <>
      <input
        id={id}
        type="file"
        name="file"
        multiple={false}
        value=""
        onChange={handleChange}
        style={{ display: "none" }}
        accept={accept}
      />
      <label htmlFor={id} style={{ margin: 0 }}>
        <Wrapper>
          <PlusIcon />
        </Wrapper>
      </label>
    </>
  );
};
