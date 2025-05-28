import { FC } from "react";
import {
  CharacterisicWrapper,
  DateName,
  DateString,
  DateWrapper,
  IconWrapper,
  NomenclatureName,
  RequestNumber,
  Wrapper,
} from "./TaskItem.styled";
import { Props } from "./TaskItem.types";
import { Progress } from "antd";
import dayjs from "dayjs";
import { DateIcon } from "@/components/icons/DateIcon";
import { FinishIcon } from "@/components/icons/FinishIcon";

export const TaskItem: FC<Props> = ({ task }) => {
  return (
    <Wrapper to={`/tasks/${task.id}`}>
      <RequestNumber>№{task.requestNumber}</RequestNumber>
      <NomenclatureName>{task.nomenclature?.name}</NomenclatureName>
      <CharacterisicWrapper>
        <div>{task.characteristic?.name}</div>
        <div>
          {task.amount}
          {task.nomenclature?.units}
        </div>
      </CharacterisicWrapper>
      <Progress
        percent={30}
        size="small"
        showInfo={false}
        strokeColor="#17B45A"
      />
      <DateWrapper>
        <DateName>
          <IconWrapper>
            <DateIcon />
          </IconWrapper>
          Начать до:
        </DateName>
        <DateString>{dayjs(task.startDate).format("DD.MM.YYYY")}</DateString>
      </DateWrapper>
      <DateWrapper>
        <DateName>
          <IconWrapper>
            <FinishIcon />
          </IconWrapper>
          Выполнить до:
        </DateName>
        <DateString>
          {dayjs(task.normativeCompletionDate).format("DD.MM.YYYY")}
        </DateString>
      </DateWrapper>
    </Wrapper>
  );
};
