import { EOrderByRule, EProductionOrderOrderRule } from "@/api/types";
import { GetTasksListQueryParams } from "../../tasksListService.types";

export enum ETasksSortType {
  AscStartDate = "AscStartDate",
  DescStartDate = "DescStartDate",
  AscNormativeDate = "AscNormativeDate",
  DescNormativeDate = "DescNormativeDate",
}

export const TasksSortTypeToLable = {
  [ETasksSortType.AscStartDate]: "По дате начала: старые",
  [ETasksSortType.DescStartDate]: "По дате начала: новые",
  [ETasksSortType.AscNormativeDate]: "По дате завершения: старые",
  [ETasksSortType.DescNormativeDate]: "По дате завершения: новые",
};

export const TaskSortTypeToFilter: {
  [key in keyof typeof ETasksSortType]: Pick<
    GetTasksListQueryParams,
    "OrderBy" | "OrderRule"
  >;
} = {
  [ETasksSortType.AscStartDate]: {
    OrderBy: EOrderByRule.Ascending,
    OrderRule: EProductionOrderOrderRule.StartDate,
  },
  [ETasksSortType.DescStartDate]: {
    OrderBy: EOrderByRule.Descending,
    OrderRule: EProductionOrderOrderRule.StartDate,
  },
  [ETasksSortType.AscNormativeDate]: {
    OrderBy: EOrderByRule.Ascending,
    OrderRule: EProductionOrderOrderRule.NormativeDate,
  },
  [ETasksSortType.DescNormativeDate]: {
    OrderBy: EOrderByRule.Descending,
    OrderRule: EProductionOrderOrderRule.NormativeDate,
  },
};

export const filterToTaskSortType = (
  orderBy?: EOrderByRule | null,
  orderRule?: EProductionOrderOrderRule | null
): ETasksSortType | null => {
  const entries = Object.entries(TaskSortTypeToFilter) as [
    keyof typeof ETasksSortType,
    Pick<GetTasksListQueryParams, "OrderBy" | "OrderRule">
  ][];

  for (const [key, value] of entries) {
    if (value.OrderBy === orderBy && value.OrderRule === orderRule) {
      return key as ETasksSortType;
    }
  }

  return null;
};
