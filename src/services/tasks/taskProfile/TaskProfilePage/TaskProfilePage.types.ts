import { CommentRequest, ProductionOrderResponse } from "@/api/types";

export type Props = {
  task: ProductionOrderResponse | null;
  isLoading: boolean;
  handleAddComment: (payload: CommentRequest) => void;
  isLoadingComment: boolean;
  handleDeleteComment: (commentId: number) => void;
};
