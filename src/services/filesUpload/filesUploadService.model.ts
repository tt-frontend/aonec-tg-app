import { message } from "antd";
import { uploadFileMutation } from "./filesUploadService.api";

uploadFileMutation.finished.failure.watch(({ error }) => {
  const e = error.response.data.error;
  message.error(e.Text || e.Message || JSON.stringify({ e }));
});
