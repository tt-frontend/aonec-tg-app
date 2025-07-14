import { useNavigate, useParams } from "react-router-dom";
import { taskProfileService } from "./taskProfileService.models";
import { TaskProfilePage } from "./TaskProfilePage";
import { useUnit } from "effector-react";
import {
  completeTaskMutation,
  deleteDocumentMutation,
  taskQuery,
} from "./taskProfileService.api";
import { uploadFileMutation } from "@/services/filesUpload";
import { useEffect } from "react";
import useMessage from "antd/lib/message/useMessage";

const {
  inputs,
  gates: { TaskProfileGate },
} = taskProfileService;

export const TaskProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [message, ctx] = useMessage();

  const {
    task,
    isLoading,
    handleFile,
    handleDeleteDocument,
    isLoadingUploadFile,
    completeTask,
  } = useUnit({
    task: taskQuery.$data,
    isLoading: taskQuery.$pending,
    handleFile: inputs.handleFile,
    handleDeleteDocument: deleteDocumentMutation.start,
    isLoadingUploadFile: uploadFileMutation.$pending,
    completeTask: completeTaskMutation.start,
  });

  function handleCompleteTask() {
    completeTask(Number(id));
  }

  useEffect(() => {
    return completeTaskMutation.finished.success.watch(() => {
      message.success("Задача завершена!");
      navigate("/tasks", { replace: true });
    }).unsubscribe;
  }, [message, navigate]);

  return (
    <>
      {ctx}
      {id && <TaskProfileGate id={Number(id)} />}
      <TaskProfilePage
        task={task}
        isLoading={isLoading}
        handleFile={handleFile}
        handleDeleteDocument={(documentId) =>
          handleDeleteDocument([Number(id), documentId])
        }
        isLoadingUploadFile={isLoadingUploadFile}
        handleCompleteTask={handleCompleteTask}
      />
    </>
  );
};
