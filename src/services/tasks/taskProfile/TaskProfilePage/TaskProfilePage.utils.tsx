import { getCountText } from "@/utils/getCountText";
import {
  daysCountForms,
  hoursCountForms,
  minutesCountForms,
} from "./TaskProfilePage.constants";
import { IDateDifference } from "@/utils/dateDiffs";

export const getProgressDateText = ({
  days,
  hours,
  minutes,
  isNegative,
}: IDateDifference) => {
  const daysText = Boolean(days) && (
    <>
      {days} {getCountText(days, daysCountForms)}{" "}
    </>
  );

  const hoursText = Boolean(hours) && (
    <>
      {hours} {getCountText(hours, hoursCountForms)}
    </>
  );

  const minutesText = Boolean(minutes) && (
    <>
      {minutes} {getCountText(minutes, minutesCountForms)}
    </>
  );

  const isShowMinutes = Boolean(minutes) && !days && !hours;

  const prefix = isNegative ? "Просрочено" : "Осталось";

  const differenceText = (
    <>
      {prefix}: {daysText} {hoursText} {isShowMinutes && minutesText}
    </>
  );

  return differenceText;
};
