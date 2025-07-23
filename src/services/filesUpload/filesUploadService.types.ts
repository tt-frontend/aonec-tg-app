import { EDocumentType } from "@/api/types";

export type UploadFileRequestPayload = {
  /** @minItems 1 */
  file?: File[];
  /** @default "Act" */
  type?: EDocumentType;

  taskId?: number;
};
