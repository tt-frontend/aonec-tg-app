import { CommentResponse } from "@/api/types";

export type Props = {
  comment: CommentResponse;
  handleDeleteComment: (commentId: number) => void;
};
