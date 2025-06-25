import { DocumentResponse } from "@/api/types";
import { UploadFileRequestPayload } from "@/services/filesUpload/filesUploadService.types";

export type Props = {
  handleFile(payload: UploadFileRequestPayload): void;
  documents?: DocumentResponse[] | null;
  handleDeleteDocument: (documentId: number) => void;
  isLoadingUploadFile: boolean;
};
