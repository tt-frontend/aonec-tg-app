import { api } from "@/api";
import {
  CommentRequest,
  CommentResponse,
  ProductionOrderResponse,
} from "@/api/types";
import { createMutation, createQuery } from "@farfetched/core";
import axios from "axios";
import { AddDocumentToTaskPayload } from "./taskProfileService.types";

export const taskQuery = createQuery<[number], ProductionOrderResponse>({
  handler: (id) => api.get(`/ProductionOrders/${id}`),
});

export const addCommnetMutation = createMutation<
  [number, CommentRequest],
  CommentResponse
>({
  handler: ([id, data]): Promise<CommentResponse> =>
    axios.post(`/ProductionOrders/${id}/comments`, data),
});

export const deleteCommentMutation = createMutation<[number, number], void>({
  handler: ([productionOrderId, commentId]) =>
    api.delete(`/ProductionOrders/${productionOrderId}/comments/${commentId}`),
});

export const addDocumentMutation = createMutation<
  AddDocumentToTaskPayload,
  void
>({
  handler: ({ taskId, ...data }) =>
    axios.post(`/ProductionOrders/${taskId}/documents`, data),
});
