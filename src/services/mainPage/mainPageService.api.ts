import { api } from "@/api";
import { ExecutorResponse, ProductionOrderListResponsePagedList } from "@/api/types";
import { createQuery } from "@farfetched/core";

export const currentUserQuery = createQuery<[], ExecutorResponse>({
  handler: () => api.get("Executors/current"),
});

export const tasksCountQuery = createQuery<
  [],
  ProductionOrderListResponsePagedList
>({
  handler: () => api.get("/ProductionOrders", { params: { PageSize: 1 } }),
});
