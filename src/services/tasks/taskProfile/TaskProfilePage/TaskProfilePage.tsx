import { FC } from "react";
import {
  CharacterisicWrapper,
  NomenclatureName,
  ProgressWrapper,
  RequestNumber,
  TitleWrapper,
  Wrapper,
} from "./TaskProfilePage.styled";
import { Props } from "./TaskProfilePage.types";
import { Empty, Progress, Skeleton } from "antd";

export const TaskProfilePage: FC<Props> = ({ isLoading, task }) => {
  if (isLoading) return <Skeleton active />;

  if (!task) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
    );
  }

  return (
    <Wrapper>
      <ProgressWrapper>
        <Progress
          percent={30}
          size="small"
          showInfo={false}
          strokeColor="#17B45A"
        />
      </ProgressWrapper>
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
    </Wrapper>
  );
};
