import { useParams } from "react-router-dom";
import { taskProfileService } from "./taskProfileService.models";
import { TaskProfilePage } from "./TaskProfilePage";
import { useUnit } from "effector-react";
import { addCommnetMutation, taskQuery } from "./taskProfileService.api";
import { useEffect } from "react";
import useMessage from "antd/es/message/useMessage";

const {
  gates: { TaskProfileGate },
} = taskProfileService;

export const TaskProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const [message, contextHolder] = useMessage();

  const { task, isLoading, handleAddComment, isLoadingComment } = useUnit({
    task: taskQuery.$data,
    isLoading: taskQuery.$pending,
    handleAddComment: addCommnetMutation.start,
    isLoadingComment: addCommnetMutation.$pending,
  });

  useEffect(() => {
    return addCommnetMutation.finished.success.watch(() => {
      message.success("Комментарий успешно добавлен");
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
        isLoadingComment={isLoadingComment}
      />
    </>
  );
};
