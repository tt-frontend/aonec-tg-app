import { FC } from "react";
import {
  CharacterisicWrapper,
  DateWrapper,
  DaysDifference,
  IconWrapper,
  NomenclatureName,
  ProgressInfo,
  ProgressWrapper,
  RequestNumber,
  TitleWrapper,
  Wrapper,
} from "./TaskProfilePage.styled";
import { Props } from "./TaskProfilePage.types";
import { Empty, Progress, Skeleton } from "antd";
import { FinishIcon } from "@/components/icons/FinishIcon";
import dayjs from "dayjs";
import {
  getDateDifference,
  getDateProgressBarPercent,
  getProgressBarColor,
} from "@/utils/dateDiffs";
import { getProgressDateText } from "./TaskProfilePage.utils";

export const TaskProfilePage: FC<Props> = ({ isLoading, task }) => {
  if (isLoading) return <Skeleton active />;

  if (!task) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
    );
  }

  const completionDateDiff = getDateDifference(
    dayjs(),
    dayjs(task.normativeCompletionDate)
  );

  const percent = getDateProgressBarPercent(
    dayjs(task.startDate),
    dayjs(task.normativeCompletionDate)
  );

  const progressDateText = getProgressDateText(completionDateDiff);

  const progressInfo = (
    <>
      <ProgressInfo>
        <DateWrapper>
          <IconWrapper>
            <FinishIcon />
          </IconWrapper>
          Выполнить до{" "}
          {dayjs(task.normativeCompletionDate).format("DD.MM.YYYY")}
        </DateWrapper>
        <DaysDifference>{progressDateText}</DaysDifference>
      </ProgressInfo>
    </>
  );

  return (
    <Wrapper>
      <ProgressWrapper>
        <Progress
          percent={percent}
          size="small"
          showInfo={false}
          strokeColor={getProgressBarColor(percent)}
        />
        {progressInfo}
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
