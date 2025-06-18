import { ProductionOrderDocumentLinkRequest } from "@/api/types";

export type AddDocumentToTaskPayload = {
  taskId: number;
} & ProductionOrderDocumentLinkRequest;
