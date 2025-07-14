import { useParams } from "react-router-dom";
import { taskProfileService } from "./taskProfileService.models";
import { TaskProfilePage } from "./TaskProfilePage";
import { useUnit } from "effector-react";
import { deleteDocumentMutation, taskQuery } from "./taskProfileService.api";
import { uploadFileMutation } from "@/services/filesUpload";

const {
  inputs,
  gates: { TaskProfileGate },
} = taskProfileService;

export const TaskProfileContainer = () => {
  const { id } = useParams<{ id: string }>();

  const {
    task,
    isLoading,
    handleFile,
    handleDeleteDocument,
    isLoadingUploadFile,
  } = useUnit({
    task: taskQuery.$data,
    isLoading: taskQuery.$pending,
    handleFile: inputs.handleFile,
    handleDeleteDocument: deleteDocumentMutation.start,
    isLoadingUploadFile: uploadFileMutation.$pending,
  });

  return (
    <>
      {id && <TaskProfileGate id={Number(id)} />}
      <TaskProfilePage
        task={task}
        isLoading={isLoading}
        handleFile={handleFile}
        handleDeleteDocument={(documentId) =>
          handleDeleteDocument([Number(id), documentId])
        }
        isLoadingUploadFile={isLoadingUploadFile}
      />
    </>
  );
};
