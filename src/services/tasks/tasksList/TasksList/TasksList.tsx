import { FC, useEffect, useState } from "react";
import {
  ButtonsWrapper,
  SearchButtonWrapper,
  TasksListWrapper,
  Wrapper,
} from "./TasksList.styled";
import { Props } from "./TasksList.types";
import { Title } from "@/components/Title";
import { Empty, Skeleton } from "antd";
import { FiltersPanel } from "./FiltersPanel";
import { TaskItem } from "./TaskItem";
import { FilterIcon } from "@/components/icons/FilterIcon";

export const TasksList: FC<Props> = ({
  tasksListPagedList,
  isLoading,
  nomenclatures,
  contracts,
  executingContracts,
  filters,
  setTasksListFilters,
  characteristics,
  resetFilters,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isFilterOpen]);

  return (
    <div>
      {isFilterOpen && (
        <FiltersPanel
          handleApply={() => setIsFilterOpen(false)}
          handleCancel={resetFilters}
          nomenclatures={nomenclatures}
          contracts={contracts}
          executingContracts={executingContracts}
          filters={filters}
          setTasksListFilters={setTasksListFilters}
          characteristics={characteristics}
          handleClose={() => setIsFilterOpen(false)}
        />
      )}
      <Wrapper>
        <Title>
          Активные задачи
          <ButtonsWrapper>
            <SearchButtonWrapper onClick={() => setIsFilterOpen(true)}>
              <FilterIcon />
            </SearchButtonWrapper>
          </ButtonsWrapper>
        </Title>

        {!isLoading && (
          <TasksListWrapper>
            {tasksListPagedList?.items?.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </TasksListWrapper>
        )}
        {!isLoading && !tasksListPagedList?.items?.length && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет задач" />
        )}
        {isLoading && <Skeleton active />}
      </Wrapper>
    </div>
  );
};
