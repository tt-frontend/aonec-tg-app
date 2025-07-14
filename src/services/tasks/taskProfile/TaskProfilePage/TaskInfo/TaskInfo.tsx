import { FC } from "react";
import { Props } from "./TaskInfo.types";
import { Card } from "@/components/Card";
import { CommonInfo } from "@/components/CommonInfo";
import dayjs from "dayjs";

export const TaskInfo: FC<Props> = ({ task }) => {
  return (
    <>
      <Card lable="Комментарий к заданию">{task.description}</Card>
      <Card lable="Основная информация">
        <CommonInfo
          items={[
            {
              key: "Дата создания",
              value: dayjs(task.creationTime).format("DD.MM.YYYY"),
            },
            {
              key: "Дата начала выполнения работ",
              value: dayjs(task.startDate).format("DD.MM.YYYY HH:mm"),
            },
            {
              key: "Нормативный срок задания",
              value: dayjs(task.normativeCompletionDate).format(
                "DD.MM.YYYY HH:mm"
              ),
            },
          ]}
        />
      </Card>
      <Card lable="Договор">
        <CommonInfo
          items={[
            {
              key: "Описание",
              value: task.contract?.name,
            },
            {
              key: "Дата начала",
              value: dayjs(task.contract?.startDate).format("DD.MM.YYYY"),
            },
            {
              key: "Дата окончания",
              value:
                task.contract?.endDate &&
                dayjs(task.contract?.endDate).format("DD.MM.YYYY"),
            },
          ]}
        />
      </Card>
    </>
  );
};
