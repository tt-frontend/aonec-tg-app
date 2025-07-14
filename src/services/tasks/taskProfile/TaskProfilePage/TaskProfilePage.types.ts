import { ProductionOrderResponse } from "@/api/types";
import { UploadFileRequestPayload } from "@/services/filesUpload/filesUploadService.types";

export type Props = {
  task: ProductionOrderResponse | null;
  isLoading: boolean;
  handleFile(payload: UploadFileRequestPayload): void;
  handleDeleteDocument: (documentId: number) => void;
  isLoadingUploadFile: boolean;
  handleCompleteTask(): void;
};
