import { createEvent, sample } from "effector";
import { createGate } from "effector-react";
import {
  addCommnetMutation,
  addDocumentMutation,
  deleteCommentMutation,
  deleteDocumentMutation,
  taskQuery,
} from "./taskProfileService.api";
import { UploadFileRequestPayload } from "@/services/filesUpload/filesUploadService.types";
import { uploadFileMutation } from "@/services/filesUpload";
import { deleteFileMutation } from "@/services/filesUpload/filesUploadService.api";

const TaskProfileGate = createGate<{ id: number }>();
const handleFile = createEvent<UploadFileRequestPayload>();
const handleSavedFile = createEvent<number | null>();

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
  clock: [
    addCommnetMutation.finished.success,
    deleteCommentMutation.finished.success,
  ],
  source: TaskProfileGate.state,
  filter: TaskProfileGate.status,
  fn: ({ id }) => id,
  target: taskQuery.start,
});

sample({
  clock: handleFile,
  target: uploadFileMutation.start,
});

sample({
  clock: uploadFileMutation.finished.success,
  filter: TaskProfileGate.status,
  fn: ({ result }) => result[0]?.id || null,
  target: handleSavedFile,
});

sample({
  source: TaskProfileGate.state,
  clock: handleSavedFile,
  filter: (_, id): id is number => id !== null,
  fn: ({ id }, fileId) => ({
    taskId: id,
    id: fileId!,
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

export const taskProfileService = {
  inputs: { handleFile },
  outputs: {},
  gates: { TaskProfileGate },
};
