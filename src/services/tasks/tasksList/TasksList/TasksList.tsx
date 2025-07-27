import { FC, useEffect, useState } from "react";
import {
  ButtonsWrapper,
  Container,
  SearchButtonWrapper,
  TasksListWrapper,
  TitleWrapper,
  Wrapper,
} from "./TasksList.styled";
import { Props } from "./TasksList.types";
import { Title } from "@/components/Title";
import { Empty, Skeleton } from "antd";
import { FiltersPanel } from "./FiltersPanel";
import { TaskItem } from "./TaskItem";
import { FilterIcon } from "@/components/icons/FilterIcon";
import { useLocation } from "react-router-dom";
import { getScrollPosition, saveScrollPosition } from "@/utils/scrollManager";
import { useInfiniteScroll } from "@/utils/useInfiniteScroll";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

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
  addressesList,
  tasksList,
  handleNextPage,
}) => {
  const location = useLocation();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isFilterOpen]);

  useEffect(() => {
    const y = getScrollPosition(location.pathname);
    window.scrollTo(0, y);
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      saveScrollPosition(location.pathname);
    };
  }, [location.pathname]);

  useInfiniteScroll(
    handleNextPage,
    tasksListPagedList?.hasNextPage && location.pathname === "/tasks"
  );

  return (
    <Container>
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
          addressesList={addressesList}
        />
      )}
      <Wrapper>
        <TitleWrapper>
          <Title>
            <div onClick={scrollToTop}>Активные задачи</div>
            <ButtonsWrapper>
              <SearchButtonWrapper onClick={() => setIsFilterOpen(true)}>
                <FilterIcon />
              </SearchButtonWrapper>
            </ButtonsWrapper>
          </Title>
        </TitleWrapper>

        <TasksListWrapper>
          {tasksList?.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </TasksListWrapper>

        {!isLoading && !tasksList?.length && (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет задач" />
        )}

        {isLoading && <Skeleton active />}
      </Wrapper>
    </Container>
  );
};
