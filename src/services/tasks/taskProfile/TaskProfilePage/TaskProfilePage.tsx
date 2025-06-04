import { FC, useState } from "react";
import {
  CharacterisicWrapper,
  FilesAttachCardHeader,
  NomenclatureName,
  RequestNumber,
  TitleWrapper,
  Wrapper,
} from "./TaskProfilePage.styled";
import { Props } from "./TaskProfilePage.types";
import { Empty, Segmented, Skeleton } from "antd";
import { TaskProgressPanel } from "./TaskProgressPanel";
import { InputCommentPanel } from "./InputCommentPanel";
import { Card } from "@/components/Card";
import { PlusIcon } from "@/components/icons/PlusIcon";
import { TaskInfo } from "./TaskInfo";

export const TaskProfilePage: FC<Props> = ({ isLoading, task }) => {
  const [section, setSection] = useState<"about" | "comments">("about");

  if (isLoading) return <Skeleton active />;

  if (!task) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
    );
  }

  return (
    <Wrapper>
      <TaskProgressPanel task={task} />
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
      <InputCommentPanel task={task} />
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Акт</div>
            <PlusIcon />
          </FilesAttachCardHeader>
        }
      />
      <Card
        header={
          <FilesAttachCardHeader>
            <div>Фотографии</div>
            <PlusIcon />
          </FilesAttachCardHeader>
        }
      />
      <Segmented
        block
        size="large"
        value={section}
        onChange={setSection}
        options={[
          { label: "О задаче", value: "about" },
          { label: "Комментарии", value: "comments" },
        ]}
      />
      {section === "about" && <TaskInfo task={task} />}
    </Wrapper>
  );
};
