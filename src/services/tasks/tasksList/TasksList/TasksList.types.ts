import { ProductionOrderListResponsePagedList } from "@/api/types";
import { GetTasksListQueryParams } from "../tasksListService.types";

export type Props = {
  tasksListPagedList: ProductionOrderListResponsePagedList | null;
  isLoading: boolean;
  setTasksListFilters: (filters: GetTasksListQueryParams) => void;
  filters: GetTasksListQueryParams;
};
