import { FC, useState } from "react";
import {
  ButtonWrapper,
  RequestNumber,
  TitleWrapper,
  Wrapper,
} from "./TaskProfilePage.styled";
import { Props } from "./TaskProfilePage.types";
import { Button, Empty, Segmented, Skeleton } from "antd";
import { TaskProgressPanel } from "./TaskProgressPanel";
import { InputCommentPanel } from "./InputCommentPanel";
import { TaskInfo } from "./TaskInfo";
import { CommentsList } from "./CommentsList";
import { TaskFilesUpload } from "./TaskFilesUpload";

export const TaskProfilePage: FC<Props> = ({
  isLoading,
  task,
  handleAddComment,
  isLoadingComment,
  handleDeleteComment,
  handleFile,
  handleDeleteDocument,
  isLoadingUploadFile,
}) => {
  const [section, setSection] = useState<"about" | "comments">("comments");

  if (isLoading && !task) return <Skeleton active />;

  if (!task) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
    );
  }

  return (
    <>
      <ButtonWrapper>
        <Button
          onClick={() => {
            confirm("Завершить задачу?");
          }}
          size="large"
          type="primary"
          style={{ height: 64 }}
        >
          Завершить задачу
        </Button>
      </ButtonWrapper>
      <Wrapper>
        <TaskProgressPanel task={task} />
        <TitleWrapper>
          <RequestNumber>№{task.requestNumber}</RequestNumber>
          {/* <NomenclatureName>{task.nomenclature?.name}</NomenclatureName>
          <CharacterisicWrapper>
            <div>{task.characteristic?.name}</div>
            <div>
              {task.outputMaterials.amount}
              {task.nomenclature?.units}
            </div>
          </CharacterisicWrapper> */}
        </TitleWrapper>
        <TaskFilesUpload
          documents={task.documents}
          handleFile={handleFile}
          handleDeleteDocument={handleDeleteDocument}
          isLoadingUploadFile={isLoadingUploadFile}
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
        {section === "comments" && (
          <>
            <CommentsList
              comments={task.comments || []}
              handleDeleteComment={handleDeleteComment}
            />
            <InputCommentPanel
              task={task}
              handleAddComment={handleAddComment}
              isLoadingComment={isLoadingComment}
            />
          </>
        )}
      </Wrapper>
    </>
  );
};
