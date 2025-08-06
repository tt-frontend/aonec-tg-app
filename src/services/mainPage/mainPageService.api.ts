import { api } from "@/api";
import {
  EProductionOrderStatus,
  ExecutorResponse,
  ProductionOrderListResponsePagedList,
} from "@/api/types";
import { createQuery } from "@farfetched/core";

export const currentUserQuery = createQuery<[], ExecutorResponse>({
  handler: () => api.get("Executors/current"),
});

export const tasksCountQuery = createQuery<
  [],
  ProductionOrderListResponsePagedList
>({
  handler: () =>
    api.get("/ProductionOrders", {
      params: { PageSize: 1, Status: EProductionOrderStatus.InProgress },
    }),
});

export const archiveTasksCountQuery = createQuery<
  [],
  ProductionOrderListResponsePagedList
>({
  handler: () =>
    api.get("/ProductionOrders", {
      params: { PageSize: 1, Status: EProductionOrderStatus.Archived },
    }),
});
