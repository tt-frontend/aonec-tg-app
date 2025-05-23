import { ProductionOrderListResponsePagedList } from "@/api/types";

export type Props = {
  tasksListPagedList: ProductionOrderListResponsePagedList | null;
  isLoading: boolean;
};
