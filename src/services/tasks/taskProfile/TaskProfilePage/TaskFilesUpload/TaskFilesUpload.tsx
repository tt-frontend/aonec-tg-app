import { FC } from "react";
import { Props } from "./TaskFilesUpload.types";
import { Card } from "@/components/Card";
import { PlusFile } from "./PlusFile";
import { EDocumentType } from "@/api/types";
import {
  DocumentItem,
  DocumentName,
  FilesAttachCardHeader,
  ImageItem,
  ImagesList,
  XWrapper,
} from "./TaskFilesUpload.styled";
import { ClipIcon } from "@/components/icons/ClipIcon";
import { XIcon } from "@/components/icons/XIcon";
import { XWhiteIcon } from "@/components/icons/XWhiteIcon";

export const TaskFilesUpload: FC<Props> = ({
  handleFile,
  documents,
  handleDeleteDocument,
  isLoadingUploadFile,
  isActive,
}) => {
  const actsList = documents?.filter((doc) => doc.type === EDocumentType.Act);
  const photosList = documents?.filter(
    (doc) => doc.type === EDocumentType.Photo
  );

  const onDeleteDocument = (documentId: number) => {
    if (!confirm("Удалить файл?")) return;

    handleDeleteDocument(documentId);
  };

  return (
    <>
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Акт</div>
            {isActive && (
              <PlusFile
                isLoading={isLoadingUploadFile}
                uniqId="task-act-add"
                multiple
                fileHandler={(files) => {
                  if (isLoadingUploadFile) return;

                  handleFile({
                    file: Array.from(files),
                    type: EDocumentType.Act,
                  });
                }}
              />
            )}
          </FilesAttachCardHeader>
        }
      >
        {actsList?.map((doc) => (
          <DocumentItem key={doc.id}>
            <ClipIcon />
            <DocumentName>{doc.name}</DocumentName>
            {isActive && (
              <XWrapper onClick={() => onDeleteDocument(doc.id!)}>
                <XIcon />
              </XWrapper>
            )}
          </DocumentItem>
        ))}
      </Card>
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Фотографии</div>
            {isActive && (
              <PlusFile
                isLoading={isLoadingUploadFile}
                uniqId="task-photo-add"
                // accept="image/*"
                multiple
                fileHandler={(files) => {
                  if (isLoadingUploadFile) return;

                  handleFile({
                    file: Array.from(files),
                    type: EDocumentType.Photo,
                  });
                }}
              />
            )}
          </FilesAttachCardHeader>
        }
      >
        {Boolean(photosList?.length) && (
          <ImagesList>
            {photosList?.map((doc) => (
              <ImageItem key={doc.id} url={doc.url!}>
                {isActive && (
                  <XWrapper onClick={() => onDeleteDocument(doc.id!)}>
                    <XWhiteIcon />
                  </XWrapper>
                )}
              </ImageItem>
            ))}
          </ImagesList>
        )}
      </Card>
    </>
  );
};
