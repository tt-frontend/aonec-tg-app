import { FC } from "react";
import {
  AddessWrapper,
  ButtonWrapper,
  CharacterisicWrapper,
  NomenclatureName,
  RequestNumber,
  TitleWrapper,
  Wrapper,
} from "./TaskProfilePage.styled";
import { Props } from "./TaskProfilePage.types";
import { Button, Empty, Skeleton } from "antd";
import { TaskProgressPanel } from "./TaskProgressPanel";
import { TaskInfo } from "./TaskInfo";
import { TaskFilesUpload } from "./TaskFilesUpload";

export const TaskProfilePage: FC<Props> = ({
  isLoading,
  task,
  handleFile,
  handleDeleteDocument,
  isLoadingUploadFile,
}) => {
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
        <AddessWrapper>{task.objectAddress}</AddessWrapper>
        <TitleWrapper>
          <RequestNumber>№{task.requestNumber}</RequestNumber>
          {task.outputMaterials?.map((elem) => (
            <>
              <NomenclatureName>{elem.nomenclature?.name}</NomenclatureName>
              <CharacterisicWrapper>
                <div>{elem.characteristic?.name}</div>
                <div>
                  {elem.amount} {elem.units}
                </div>
              </CharacterisicWrapper>
            </>
          ))}
        </TitleWrapper>
        <TaskFilesUpload
          documents={task.documents}
          handleFile={handleFile}
          handleDeleteDocument={handleDeleteDocument}
          isLoadingUploadFile={isLoadingUploadFile}
        />

        <TaskInfo task={task} />
      </Wrapper>
    </>
  );
};
