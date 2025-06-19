import { api } from "@/api";
import { createMutation } from "@farfetched/core";
import { UploadFileRequestPayload } from "./filesUploadService.types";
import { DocumentResponse } from "@/api/types";

export const uploadFileMutation = createMutation<
  UploadFileRequestPayload,
  DocumentResponse[]
>({
  handler: ({ type, file }) => {
    const formData = new FormData();

    const fileData = file?.[0];

    formData.append("type", type as string);
    if (fileData) formData.append("file", fileData);

    return api.post(`/Documents/upload`, formData);
  },
});

export const deleteFileMutation = createMutation<number, void>({
  handler: (id: number) => api.delete(`/Documents/${id}`),
});
