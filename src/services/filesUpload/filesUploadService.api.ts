import { api } from "@/api";
import { createMutation } from "@farfetched/core";
import { UploadFileRequestPayload } from "./filesUploadService.types";
import { DocumentResponse } from "@/api/types";

export const uploadFileMutation = createMutation<
  UploadFileRequestPayload,
  DocumentResponse[]
>({
  handler: async ({ type, file }) => {
    const formData = new FormData();

    formData.append("type", type as string);

    const filesToUpload = (file ?? []).slice(0, 3); // максимум 3 файла

    filesToUpload.forEach((fileItem) => {
      formData.append("file", fileItem); // один ключ "file" для нескольких файлов
    });

    const response: DocumentResponse[] = await api.post(
      "/Documents/upload",
      formData
    );

    return response; // возвращаем "как есть"
  },
});

export const deleteFileMutation = createMutation<number, void>({
  handler: (id: number) => api.delete(`/Documents/${id}`),
});
