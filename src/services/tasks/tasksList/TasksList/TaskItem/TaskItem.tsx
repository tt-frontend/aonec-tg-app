import { FC } from "react";
import {
  Address,
  CharacterisicWrapper,
  DateName,
  DateSection,
  DateString,
  DateWrapper,
  FilesInfo,
  FilesInfoItem,
  IconWrapper,
  InfoWrapper,
  NomenclatureName,
  RequestNumber,
  Stage,
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
import { FileIcon } from "@/components/icons/FileIcon";
import { PhotoIcon } from "@/components/icons/PhotoIcon";

export const TaskItem: FC<Props> = ({ task, status }) => {
  const percent = getDateProgressBarPercent(
    dayjs(task.startDate),
    dayjs(task.normativeCompletionDate)
  );

  const isActive = status === EProductionOrderStatus.InProgress;

  const dateSegment = (
    <DateSection>
      <DateWrapper>
        <DateName>
          <IconWrapper>
            <DateIcon />
          </IconWrapper>
          {/* Начать до: */}
        </DateName>
        <DateString>{dayjs(task.startDate).format("DD.MM.YYYY")}</DateString>
      </DateWrapper>
      {/* <ArrowRight /> */}
      <span>—</span>
      <DateWrapper>
        <DateName>
          <IconWrapper>
            <FinishIcon />
          </IconWrapper>
          {/* Выполнить до: */}
        </DateName>
        <DateString>
          {dayjs(task.normativeCompletionDate).format("DD.MM.YYYY")}
        </DateString>
      </DateWrapper>
    </DateSection>
  );

  return (
    <Wrapper to={`/tasks/${task.id}`}>
      {task.stage && <Stage>{task.stage}</Stage>}
      <Address>{task.objectAddress}</Address>
      <RequestNumber>№{task.requestNumber}</RequestNumber>
      {task.outputMaterials?.map((elem) => (
        <>
          <NomenclatureName>{elem.nomenclature?.name}</NomenclatureName>
          <CharacterisicWrapper>
            {elem.characteristic?.name}
          </CharacterisicWrapper>
          <InfoWrapper>
            <CharacterisicWrapper>
              {elem.amount} • {elem.units}
            </CharacterisicWrapper>
            <FilesInfo>
              {Boolean(task.actsCount) && (
                <FilesInfoItem>
                  <FileIcon /> {task.actsCount}
                </FilesInfoItem>
              )}

              {Boolean(task.photosCount) && (
                <FilesInfoItem>
                  <PhotoIcon /> {task.photosCount}
                </FilesInfoItem>
              )}
            </FilesInfo>
          </InfoWrapper>
        </>
      ))}
      {isActive && (
        <Progress
          percent={percent}
          size="small"
          showInfo={false}
          strokeColor={getProgressBarColor(percent)}
          strokeLinecap="butt"
          strokeWidth={4}
        />
      )}
      {isActive && dateSegment}
    </Wrapper>
  );
};
