import dayjs from "dayjs";

export interface IDateDifference {
  days: number;
  hours: number;
  minutes: number;
  isNegative: boolean;
}

export function getDateDifference(
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
): IDateDifference {
  const diffHours = endDate.diff(startDate, "hours");

  const days = Math.trunc(diffHours / 24);

  const hours = diffHours % 24;

  const minutes = endDate.diff(startDate, "minutes");

  return {
    days: Math.abs(days),
    hours: Math.abs(hours),
    minutes: Math.abs(minutes),
    isNegative: days < 0 || hours < 0 || minutes < 0,
  };
}

export function getDateProgressBarPercent(
  startDate: dayjs.Dayjs,
  completionDate: dayjs.Dayjs
) {
  const currentDate = dayjs();

  if (currentDate.isBefore(startDate)) return 0;

  const percent =
    100 * (currentDate.diff(startDate) / completionDate.diff(startDate));

  if (percent > 100) return 100;

  return percent;
}

export function getProgressBarColor(percent: number) {
  if (percent <= 50) return "#17B45A";

  if (percent <= 80) return "#ffa600";

  return "#ff4747";
}
