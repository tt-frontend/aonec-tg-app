import { api } from "@/api";
import { ProductionOrderResponse } from "@/api/types";
import { createQuery } from "@farfetched/core";

export const taskQuery = createQuery<[number], ProductionOrderResponse>({
  handler: (id) => api.get(`/ProductionOrders/${id}`),
});
