import { api } from "@/api";
import {
  CommentRequest,
  CommentResponse,
  ProductionOrderResponse,
} from "@/api/types";
import { createMutation, createQuery } from "@farfetched/core";
import axios from "axios";

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
