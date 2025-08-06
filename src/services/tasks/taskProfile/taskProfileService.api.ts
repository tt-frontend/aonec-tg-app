import { api } from "@/api";
import { ProductionOrderResponse } from "@/api/types";
import { createMutation, createQuery } from "@farfetched/core";
import axios from "axios";
import {
  AddDocumentToTaskPayload,
  UpdateReportRequestPayload,
} from "./taskProfileService.types";
import { EffectFailDataAxiosError } from "@/types";
import { createEffect } from "effector";

export const taskQuery = createQuery<[number], ProductionOrderResponse>({
  handler: (id) => api.get(`/ProductionOrders/${id}`),
});

export const addDocumentMutation = createMutation({
  effect: createEffect<
    AddDocumentToTaskPayload,
    void,
    EffectFailDataAxiosError
  >(async ({ taskId, ...payload }): Promise<void> => {
    await Promise.all(
      payload.data.map((file) =>
        axios.post(`/ProductionOrders/${taskId}/documents`, file)
      )
    );
  }),
});

export const deleteDocumentMutation = createMutation<[number, number], void>({
  handler: ([productionOrderId, documentId]) =>
    api.delete(
      `/ProductionOrders/${productionOrderId}/documents/${documentId}`
    ),
});

export const completeTaskMutation = createMutation({
  effect: createEffect<number, void, EffectFailDataAxiosError>((id) =>
    axios.post(`/ProductionOrders/${id}/complete`)
  ),
});

export const updateReportMutation = createMutation({
  effect: createEffect<
    UpdateReportRequestPayload,
    void,
    EffectFailDataAxiosError
  >(
    ({ id, ...data }): Promise<void> =>
      axios.post(`/ProductionOrders/${id}/report`, data)
  ),
});
