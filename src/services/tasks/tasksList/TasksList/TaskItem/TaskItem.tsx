import { FC } from "react";
import {
  Address,
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
import {
  getDateProgressBarPercent,
  getProgressBarColor,
} from "@/utils/dateDiffs";
import { EProductionOrderStatus } from "@/api/types";

export const TaskItem: FC<Props> = ({ task, status }) => {
  const percent = getDateProgressBarPercent(
    dayjs(task.startDate),
    dayjs(task.normativeCompletionDate)
  );

  const isActive = status === EProductionOrderStatus.InProgress;

  const dateSegment = (
    <>
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
    </>
  );

  return (
    <Wrapper to={`/tasks/${task.id}`}>
      <Address>{task.objectAddress}</Address>
      <RequestNumber>№{task.requestNumber}</RequestNumber>
      {task.outputMaterials?.map((elem) => (
        <>
          <NomenclatureName>{elem.nomenclature?.name}</NomenclatureName>
          <CharacterisicWrapper>
            {elem.characteristic?.name}
          </CharacterisicWrapper>
          <CharacterisicWrapper>
            {elem.amount} • {elem.units}
          </CharacterisicWrapper>
        </>
      ))}
      {isActive && (
        <Progress
          percent={percent}
          size="small"
          showInfo={false}
          strokeColor={getProgressBarColor(percent)}
        />
      )}
      {isActive && dateSegment}
    </Wrapper>
  );
};
