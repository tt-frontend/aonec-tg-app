import { useParams } from "react-router-dom";
import { taskProfileService } from "./taskProfileService.models";
import { TaskProfilePage } from "./TaskProfilePage";
import { useUnit } from "effector-react";
import {
  addCommnetMutation,
  deleteCommentMutation,
  deleteDocumentMutation,
  taskQuery,
} from "./taskProfileService.api";
import { useEffect } from "react";
import useMessage from "antd/es/message/useMessage";
import { uploadFileMutation } from "@/services/filesUpload";

const {
  inputs,
  gates: { TaskProfileGate },
} = taskProfileService;

export const TaskProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const [message, contextHolder] = useMessage();

  const {
    task,
    isLoading,
    handleAddComment,
    isLoadingComment,
    handleDeleteComment,
    handleFile,
    handleDeleteDocument,
    isLoadingUploadFile,
  } = useUnit({
    task: taskQuery.$data,
    isLoading: taskQuery.$pending,
    handleAddComment: addCommnetMutation.start,
    isLoadingComment: addCommnetMutation.$pending,
    handleDeleteComment: deleteCommentMutation.start,
    handleFile: inputs.handleFile,
    handleDeleteDocument: deleteDocumentMutation.start,
    isLoadingUploadFile: uploadFileMutation.$pending,
  });

  useEffect(() => {
    return addCommnetMutation.finished.success.watch(() => {
      message.success("Комментарий успешно добавлен");
    }).unsubscribe;
  }, [message]);

  useEffect(() => {
    return deleteCommentMutation.finished.success.watch(() => {
      message.info("Комментарий удален");
    }).unsubscribe;
  }, [message]);

  return (
    <>
      {contextHolder}
      {id && <TaskProfileGate id={Number(id)} />}
      <TaskProfilePage
        task={task}
        isLoading={isLoading}
        handleAddComment={(data) => handleAddComment([Number(id), data])}
        handleDeleteComment={(commentId) =>
          handleDeleteComment([Number(id), commentId])
        }
        isLoadingComment={isLoadingComment}
        handleFile={handleFile}
        handleDeleteDocument={(documentId) =>
          handleDeleteDocument([Number(id), documentId])
        }
        isLoadingUploadFile={isLoadingUploadFile}
      />
    </>
  );
};
