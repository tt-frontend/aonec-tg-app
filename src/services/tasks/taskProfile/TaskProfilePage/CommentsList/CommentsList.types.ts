import { CommentResponse } from "@/api/types";

export type Props = {
  comments?: CommentResponse[];
  handleDeleteComment: (commentId: number) => void;
};
