import { FC } from "react";
import { Props } from "./TaskInfo.types";
import { Card } from "@/components/Card";
import { CommonInfo } from "@/components/CommonInfo";
import dayjs from "dayjs";

export const TaskInfo: FC<Props> = ({ task }) => {
  return (
    <>
      <Card lable="Основная информация">
        <CommonInfo
          items={[
            { key: "Номер наряд-задания", value: task.requestNumber },
            {
              key: "Дата создания",
              value: dayjs(task.creationTime).format("DD.MM.YYYY"),
            },
          ]}
        />
      </Card>
      <Card lable="Исполнитель">
        <CommonInfo
          items={[
            {
              key: "Ответственнй исполнитель",
              value: task.executor?.name,
            },

            {
              key: "Договор с исполнителем",
              value: `${task.contract?.name} ${task.contract?.type} (${task.contract?.id})`,
            },
            {
              key: "Нормативный срок задания",
              value: dayjs(task.normativeCompletionDate).format(
                "DD.MM.YYYY HH:mm"
              ),
            },
            {
              key: "Дата начала выполнения работ",
              value: dayjs(task.startDate).format("DD.MM.YYYY HH:mm"),
            },
          ]}
        />
      </Card>

      {/* <Card lable="Работы">
        <CommonInfo
          items={[
            {
              key: "Номенклатура работ",
              value: task.outputMaterials
                ?.map((elem) => elem.nomenclature?.name)
                .join(", "),
            },

            {
              key: "Единица хранения используемых материалов",
              value: task.outputMaterials?.map((elem) => elem.units).join(", "),
            },
            {
              key: "Характеристика работ",
              value: task.characteristic?.name,
            },
            {
              key: "Количество работ",
              value: task.amount,
            },
          ]}
        />
      </Card> */}
    </>
  );
};
