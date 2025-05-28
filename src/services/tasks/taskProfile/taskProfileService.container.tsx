import { useParams } from "react-router-dom";
import { taskProfileService } from "./taskProfileService.models";
import { TaskProfilePage } from "./TaskProfilePage";
import { useUnit } from "effector-react";
import { taskQuery } from "./taskProfileService.api";

const {
  gates: { TaskProfileGate },
} = taskProfileService;

export const TaskProfileContainer = () => {
  const { id } = useParams<{ id: string }>();

  const { task, isLoading } = useUnit({
    task: taskQuery.$data,
    isLoading: taskQuery.$pending,
  });

  return (
    <>
      {id && <TaskProfileGate id={Number(id)} />}
      <TaskProfilePage task={task} isLoading={isLoading} />
    </>
  );
};
