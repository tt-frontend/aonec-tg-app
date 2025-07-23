import { ProductionOrderDocumentLinkRequest } from "@/api/types";

export type AddDocumentToTaskPayload = {
  taskId: number;
  data: ProductionOrderDocumentLinkRequest[];
};

export type UpdateReportRequestPayload = {
  id: number;
  report: string;
};
