import { FC } from "react";
import {
  AddessWrapper,
  ButtonWrapper,
  CharacterisicWrapper,
  NomenclatureName,
  OutputMaterial,
  RequestNumber,
  TaskStage,
  TaskUnitAmountWrapper,
  TaskUnitInfoWrapper,
  TaskUnitWrapper,
  TitleWrapper,
  Wrapper,
} from "./TaskProfilePage.styled";
import { Props } from "./TaskProfilePage.types";
import { Button, Empty, message, Skeleton, Tooltip } from "antd";
import { TaskProgressPanel } from "./TaskProgressPanel";
import { TaskInfo } from "./TaskInfo";
import { TaskFilesUpload } from "./TaskFilesUpload";
import { ReportPanel } from "./ReportPanel";
import { EProductionOrderStatus } from "@/api/types";

export const TaskProfilePage: FC<Props> = ({
  isLoading,
  task,
  handleFile,
  handleDeleteDocument,
  isLoadingUploadFile,
  handleCompleteTask,
  updateReport,
}) => {
  if (isLoading && !task) return <Skeleton active />;

  if (!task) {
    return (
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
    );
  }

  const onCompleteTask = () => {
    const isApproveComplete = confirm("Завершить задачу?");
    const isReportExist = Boolean(task.report);

    if (!isApproveComplete) return;

    if (!isReportExist) {
      message.error("Добавьте комментарий к задаче!");
      return;
    }

    if (!task.documents?.length) {
      message.error("Добавьте фото/документы к задаче!");
      return;
    }

    handleCompleteTask();
  };

  const isActive = task.status === EProductionOrderStatus.InProgress;

  return (
    <>
      {isActive && (
        <ButtonWrapper>
          <Button
            onClick={onCompleteTask}
            size="large"
            type="primary"
            style={{ height: 64 }}
          >
            Завершить задачу
          </Button>
        </ButtonWrapper>
      )}
      <Wrapper isActive={isActive}>
        {isActive && <TaskProgressPanel task={task} />}
        {task.stage && (
          <TaskStage>
            <span style={{ fontWeight: 300 }}>Этап: </span>
            {task.stage}
          </TaskStage>
        )}
        <TitleWrapper>
          <AddessWrapper>{task.objectAddress}</AddessWrapper>
          <RequestNumber>№{task.requestNumber}</RequestNumber>
          {task.outputMaterials?.map((elem) => (
            <OutputMaterial>
              {elem.nomenclature?.name && (
                <NomenclatureName>{elem.nomenclature?.name}</NomenclatureName>
              )}
              {elem.characteristic?.name && (
                <CharacterisicWrapper>
                  {elem.characteristic?.name}
                </CharacterisicWrapper>
              )}
              <TaskUnitInfo amount={elem.amount} unit={elem.units} />
            </OutputMaterial>
          ))}
        </TitleWrapper>
        <ReportPanel
          isActive={isActive}
          task={task}
          updateReport={updateReport}
        />
        <TaskFilesUpload
          isActive={isActive}
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

export const TaskUnitInfo: FC<{
  unit?: string | null;
  amount?: string | null | number;
}> = ({ unit, amount }) => {
  if (!unit && !amount) {
    return null;
  }

  return (
    <TaskUnitInfoWrapper>
      {amount && (
        <Tooltip title="Значение">
          <TaskUnitAmountWrapper>{amount}</TaskUnitAmountWrapper>
        </Tooltip>
      )}
      {unit && (
        <Tooltip title="Единицы измерения">
          <TaskUnitWrapper>{unit}</TaskUnitWrapper>
        </Tooltip>
      )}
    </TaskUnitInfoWrapper>
  );
};
