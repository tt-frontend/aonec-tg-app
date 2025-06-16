import { FC, useEffect, useState } from "react";
import {
  ButtonsWrapper,
  SearchButtonWrapper,
  TasksListWrapper,
  Wrapper,
} from "./TasksList.styled";
import { Props } from "./TasksList.types";
import { Title } from "@/components/Title";
import { Segmented, Skeleton } from "antd";
import { FiltersPanel } from "./FiltersPanel";
import { TaskItem } from "./TaskItem";

export const TasksList: FC<Props> = ({ tasksListPagedList, isLoading }) => {
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
        <FiltersPanel handleApply={() => setIsFilterOpen(false)} />
      )}
      <Wrapper>
        <Title>
          Активные задачи
          <ButtonsWrapper>
            <SearchButtonWrapper>
              {/* <Search /> */}
            </SearchButtonWrapper>
            <SearchButtonWrapper onClick={() => setIsFilterOpen(true)}>
              {/* <Funnel /> */}
            </SearchButtonWrapper>
          </ButtonsWrapper>
        </Title>
        <Segmented
          defaultValue="Сегодня"
          options={["Сегодня", "Все задачи"]}
          block
          size="large"
        />
        {!isLoading && (
          <TasksListWrapper>
            {tasksListPagedList?.items?.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
          </TasksListWrapper>
        )}
        {isLoading && <Skeleton active />}
      </Wrapper>
    </div>
  );
};
