import { useNavigate, useParams } from "react-router-dom";
import { taskProfileService } from "./taskProfileService.models";
import { TaskProfilePage } from "./TaskProfilePage";
import { useUnit } from "effector-react";
import {
  completeTaskMutation,
  deleteDocumentMutation,
  taskQuery,
  updateReportMutation,
} from "./taskProfileService.api";
import { uploadFileMutation } from "@/services/filesUpload";
import { useEffect } from "react";

const {
  inputs,
  gates: { TaskProfileGate },
} = taskProfileService;

export const TaskProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    task,
    isLoading,
    handleFile,
    handleDeleteDocument,
    isLoadingUploadFile,
    completeTask,
    updateReport,
  } = useUnit({
    task: taskQuery.$data,
    isLoading: taskQuery.$pending,
    handleFile: inputs.handleFile,
    handleDeleteDocument: deleteDocumentMutation.start,
    isLoadingUploadFile: uploadFileMutation.$pending,
    completeTask: completeTaskMutation.start,
    updateReport: updateReportMutation.start,
  });

  function handleCompleteTask() {
    completeTask(Number(id));
  }

  useEffect(() => {
    return completeTaskMutation.finished.success.watch(() => {
      navigate(-1);
    }).unsubscribe;
  }, [navigate]);

  return (
    <>
      {id && <TaskProfileGate id={Number(id)} />}
      <TaskProfilePage
        task={task}
        isLoading={isLoading}
        handleFile={(payload) => handleFile({ ...payload, taskId: Number(id) })}
        handleDeleteDocument={(documentId) =>
          handleDeleteDocument([Number(id), documentId])
        }
        isLoadingUploadFile={isLoadingUploadFile}
        handleCompleteTask={handleCompleteTask}
        updateReport={(report) => updateReport({ id: Number(id), report })}
      />
    </>
  );
};
