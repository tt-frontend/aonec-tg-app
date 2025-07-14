import { api } from "@/api";
import { ProductionOrderResponse } from "@/api/types";
import { createMutation, createQuery } from "@farfetched/core";
import axios from "axios";
import {
  AddDocumentToTaskPayload,
  UpdateReportRequestPayload,
} from "./taskProfileService.types";

export const taskQuery = createQuery<[number], ProductionOrderResponse>({
  handler: (id) => api.get(`/ProductionOrders/${id}`),
});

export const addDocumentMutation = createMutation<
  AddDocumentToTaskPayload,
  void
>({
  handler: ({ taskId, ...data }) =>
    axios.post(`/ProductionOrders/${taskId}/documents`, data),
});

export const deleteDocumentMutation = createMutation<[number, number], void>({
  handler: ([productionOrderId, documentId]) =>
    api.delete(
      `/ProductionOrders/${productionOrderId}/documents/${documentId}`
    ),
});

export const completeTaskMutation = createMutation<number, void>({
  handler: (id) => axios.post(`/ProductionOrders/${id}/complete`),
});

export const updateReportMutation = createMutation<
  UpdateReportRequestPayload,
  void
>({
  handler: ({ id, ...data }): Promise<void> =>
    axios.post(`/ProductionOrders/${id}/report`, data),
});
