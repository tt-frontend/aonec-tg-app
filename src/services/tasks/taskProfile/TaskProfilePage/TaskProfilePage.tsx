import { FC } from "react";
import {
  CharacterisicWrapper,
  NomenclatureName,
  RequestNumber,
  TitleWrapper,
  Wrapper,
} from "./TaskProfilePage.styled";
import { Props } from "./TaskProfilePage.types";
import { Empty, Segmented, Skeleton } from "antd";
import { TaskProgressPanel } from "./TaskProgressPanel";
import { InputCommentPanel } from "./InputCommentPanel";

export const TaskProfilePage: FC<Props> = ({ isLoading, task }) => {
  if (isLoading) return <Skeleton active />;

  if (!task) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
    );
  }

  return (
    <Wrapper>
      <TaskProgressPanel task={task} />
      <TitleWrapper>
        <RequestNumber>№{task.requestNumber}</RequestNumber>
        <NomenclatureName>{task.nomenclature?.name}</NomenclatureName>
        <CharacterisicWrapper>
          <div>{task.characteristic?.name}</div>
          <div>
            {task.amount}
            {task.nomenclature?.units}
          </div>
        </CharacterisicWrapper>
      </TitleWrapper>
      <InputCommentPanel task={task} />
      <Segmented
        block
        size="large"
        defaultValue="О задаче"
        options={["О задаче", "Комментарии"]}
      />
    </Wrapper>
  );
};
