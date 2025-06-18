import { FC } from "react";
import { Props } from "./TaskFilesUpload.types";
import { Card } from "@/components/Card";
import { FilesAttachCardHeader } from "../TaskProfilePage.styled";
import { PlusFile } from "./PlusFile";
import { EDocumentType } from "@/api/types";
import { DocumentItem } from "./TaskFilesUpload.styled";

export const TaskFilesUpload: FC<Props> = ({ handleFile, documents }) => {
  const actsList = documents?.filter((doc) => doc.type === EDocumentType.Act);
  // const photosList = documents?.filter(
  //   (doc) => doc.type === EDocumentType.Photo
  // );

  return (
    <>
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Акт</div>
            <PlusFile
              uniqId="task-act-add"
              fileHandler={(files) => {
                handleFile({
                  file: Array.from(files),
                  type: EDocumentType.Act,
                });
              }}
            />
            {actsList?.map((doc) => (
              <DocumentItem key={doc.id}>{doc.name}</DocumentItem>
            ))}
          </FilesAttachCardHeader>
        }
      />
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Фотографии</div>
            <PlusFile
              uniqId="task-photo-add"
              accept="image/*"
              fileHandler={(files) => {
                handleFile({
                  file: Array.from(files),
                  type: EDocumentType.Photo,
                });
              }}
            />
          </FilesAttachCardHeader>
        }
      />
    </>
  );
};
