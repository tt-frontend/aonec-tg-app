import { FC } from "react";
import { Props } from "./TaskFilesUpload.types";
import { Card } from "@/components/Card";
import { FilesAttachCardHeader } from "../TaskProfilePage.styled";
import { PlusFile } from "./PlusFile";

export const TaskFilesUpload: FC<Props> = () => {
  return (
    <>
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Акт</div>
            <PlusFile uniqId="task-act-add" fileHandler={() => {}} />
          </FilesAttachCardHeader>
        }
      />
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Фотографии</div>
            <PlusFile
              uniqId="task-photo-add"
              accept="image/png, image/jpeg"
              fileHandler={() => {}}
            />
          </FilesAttachCardHeader>
        }
      />
    </>
  );
};
