import { FC, useEffect, useState } from "react";
import {
  ButtonsWrapper,
  Container,
  PaginationWrapper,
  ReloadWrapper,
  SearchButtonWrapper,
  TaskAmount,
  TasksListWrapper,
  TitleWrapper,
  Wrapper,
} from "./TasksList.styled";
import { Props } from "./TasksList.types";
import { Title } from "@/components/Title";
import { Empty, Pagination, Skeleton } from "antd";
import { FiltersPanel } from "./FiltersPanel";
import { TaskItem } from "./TaskItem";
import { FilterIcon } from "@/components/icons/FilterIcon";
import { useLocation } from "react-router-dom";
import { getScrollPosition, saveScrollPosition } from "@/utils/scrollManager";
import { ReloadIcon } from "@/components/icons/Reload";
import { EProductionOrderStatus } from "@/api/types";

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
  handleReload,
  status,
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

  useEffect(() => {
    scrollToTop();
  }, [filters.PageNumber]);

  const isActive = status === EProductionOrderStatus.InProgress;

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
            <div onClick={scrollToTop}>
              {isActive && "Активные задачи"}
              {!isActive && "Архивные задачи"}
              {typeof tasksListPagedList?.totalItems === "number" && (
                <TaskAmount>
                  Всего задач: {tasksListPagedList?.totalItems}
                </TaskAmount>
              )}
            </div>
            <ButtonsWrapper>
              <SearchButtonWrapper onClick={handleReload}>
                <ReloadWrapper isLoading={isLoading}>
                  <ReloadIcon />
                </ReloadWrapper>
              </SearchButtonWrapper>
              <SearchButtonWrapper onClick={() => setIsFilterOpen(true)}>
                <FilterIcon />
              </SearchButtonWrapper>
            </ButtonsWrapper>
          </Title>
        </TitleWrapper>

        <TasksListWrapper>
          {!tasksList.length && isLoading && <Skeleton active />}

          {!isLoading && !tasksList?.length && (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="Нет задач"
            />
          )}

          {tasksList?.map((task) => (
            <TaskItem status={status} task={task} key={task.id} />
          ))}
        </TasksListWrapper>

        <PaginationWrapper>
          {Boolean(tasksList.length) && (
            <Pagination
              responsive
              size="default"
              current={tasksListPagedList?.pageNumber}
              onChange={(pageNumber) =>
                setTasksListFilters({ PageNumber: pageNumber })
              }
              total={tasksListPagedList?.totalItems}
              showSizeChanger={false}
              showQuickJumper={false}
              hideOnSinglePage
            />
          )}
        </PaginationWrapper>
      </Wrapper>
    </Container>
  );
};
