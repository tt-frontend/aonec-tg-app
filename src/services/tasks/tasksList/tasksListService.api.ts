import { api } from "@/api";
import { ProductionOrderListResponsePagedList } from "@/api/types";
import { createQuery } from "@farfetched/core";
import { GetTasksListQueryParams } from "./tasksListService.types";

export const tasksListQuery = createQuery<
  [GetTasksListQueryParams],
  ProductionOrderListResponsePagedList
>({
  handler: () => api.get("/ProductionOrders"),
});
