import { FC } from "react";
import {
  DateWrapper,
  DaysDifference,
  IconWrapper,
  ProgressInfo,
  ProgressWrapper,
} from "./TaskProgressPanel.styled";
import { Props } from "./TaskProgressPanel.types";
import { FinishIcon } from "@/components/icons/FinishIcon";
import dayjs from "dayjs";
import {
  getDateDifference,
  getDateProgressBarPercent,
  getProgressBarColor,
} from "@/utils/dateDiffs";
import { getProgressDateText } from "./TaskProgressPanel.utils";
import { Progress } from "antd";

export const TaskProgressPanel: FC<Props> = ({ task }) => {
  const completionDateDiff = getDateDifference(
    dayjs(),
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

  const percent = getDateProgressBarPercent(
    dayjs(task.startDate),
    dayjs(task.normativeCompletionDate)
  );

  return (
    <ProgressWrapper>
      <Progress
        percent={percent}
        size="small"
        showInfo={false}
        strokeColor={getProgressBarColor(percent)}
      />
      {progressInfo}
    </ProgressWrapper>
  );
};
