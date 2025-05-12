import { FC, useEffect, useState } from "react";
import {
  ButtonsWrapper,
  SearchButtonWrapper,
  TasksListWrapper,
  Wrapper,
} from "./TasksList.styled";
import { Props } from "./TasksList.types";
import { Title } from "@/components/Title";
import { Funnel, Search } from "react-bootstrap-icons";
import { Segmented } from "antd";
import { MockTask } from "./MockTask";
import { FiltersPanel } from "./FiltersPanel";

export const TasksList: FC<Props> = () => {
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
              <Search />
            </SearchButtonWrapper>
            <SearchButtonWrapper onClick={() => setIsFilterOpen(true)}>
              <Funnel />
            </SearchButtonWrapper>
          </ButtonsWrapper>
        </Title>
        <Segmented
          defaultValue="Сегодня"
          options={["Сегодня", "Все задачи"]}
          block
          size="large"
        />
        <TasksListWrapper>
          <MockTask />
          <MockTask />
          <MockTask />
          <MockTask />
          <MockTask />
          <MockTask />
        </TasksListWrapper>
      </Wrapper>
    </div>
  );
};
