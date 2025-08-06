import { createEvent, sample } from "effector";
import { createGate } from "effector-react";
import {
  addDocumentMutation,
  completeTaskMutation,
  deleteDocumentMutation,
  taskQuery,
  updateReportMutation,
} from "./taskProfileService.api";
import { UploadFileRequestPayload } from "@/services/filesUpload/filesUploadService.types";
import { uploadFileMutation } from "@/services/filesUpload";
import { deleteFileMutation } from "@/services/filesUpload/filesUploadService.api";
import { message } from "antd";
import { AddDocumentToTaskPayload } from "./taskProfileService.types";

const TaskProfileGate = createGate<{ id: number }>();
const handleFile = createEvent<UploadFileRequestPayload>();
const handleSavedFile = createEvent<{
  ids: number[] | null;
  taskId: number | null;
}>();

sample({
  source: TaskProfileGate.state,
  clock: [
    TaskProfileGate.open,
    addDocumentMutation.finished.success,
    deleteDocumentMutation.finished.success,
  ],
  fn: ({ id }) => id,
  target: taskQuery.start,
});

sample({
  clock: TaskProfileGate.close,
  target: taskQuery.reset,
});

sample({
  clock: [updateReportMutation.finished.success],
  source: TaskProfileGate.state,
  filter: TaskProfileGate.status,
  fn: ({ id }) => id,
  target: taskQuery.start,
});

sample({
  source: TaskProfileGate.state,
  clock: handleFile,
  fn: ({ id: taskId }, payload) => ({ taskId, ...payload }),
  target: uploadFileMutation.start,
});

sample({
  clock: uploadFileMutation.finished.success,
  filter: TaskProfileGate.status,
  fn: ({ result, params }) => ({
    ids: result?.map((elem) => elem.id!) || null,
    taskId: params.taskId || null,
  }),
  target: handleSavedFile,
});

sample({
  source: TaskProfileGate.state,
  clock: handleSavedFile,
  fn: ({ id }, payload): AddDocumentToTaskPayload => ({
    taskId: payload.taskId || id,
    data: payload.ids?.map((id) => ({ id })) || [],
  }),
  target: addDocumentMutation.start,
});

sample({
  clock: deleteDocumentMutation.finished.success,
  fn({ params: [, documentId] }) {
    return documentId;
  },
  target: deleteFileMutation.start,
});

updateReportMutation.finished.success.watch(() => {
  message.success("Комментарий обновлен");
});

updateReportMutation.finished.failure.watch(({ error }) =>
  message.error(error.response.data.error.Text)
);

completeTaskMutation.finished.success.watch(() => {
  message.success("Задача завершена!");
});

completeTaskMutation.finished.failure.watch(({ error }) =>
  message.error(error.response.data.error.Text)
);

addDocumentMutation.finished.failure.watch(({ error }) =>
  message.error(error.response.data.error.Text)
);

export const taskProfileService = {
  inputs: { handleFile },
  outputs: {},
  gates: { TaskProfileGate },
};
