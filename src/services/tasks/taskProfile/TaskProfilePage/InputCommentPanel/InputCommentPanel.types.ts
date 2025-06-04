import { CommentRequest, ProductionOrderResponse } from "@/api/types";

export type Props = {
  task: ProductionOrderResponse;
  handleAddComment: (payload: CommentRequest) => void;
  isLoadingComment: boolean;
};
