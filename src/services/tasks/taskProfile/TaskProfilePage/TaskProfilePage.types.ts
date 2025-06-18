import { CommentRequest, ProductionOrderResponse } from "@/api/types";
import { UploadFileRequestPayload } from "@/services/filesUpload/filesUploadService.types";

export type Props = {
  task: ProductionOrderResponse | null;
  isLoading: boolean;
  handleAddComment: (payload: CommentRequest) => void;
  isLoadingComment: boolean;
  handleDeleteComment: (commentId: number) => void;
  handleFile(payload: UploadFileRequestPayload): void;
  handleDeleteDocument: (documentId: number) => void;
};
