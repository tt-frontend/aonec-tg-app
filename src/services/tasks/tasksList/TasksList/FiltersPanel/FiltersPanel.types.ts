import {
  ContractListResponsePagedList,
  NomenclatureListResponse,
  StringPagedList,
} from "@/api/types";
import { GetTasksListQueryParams } from "../../tasksListService.types";

export type Props = {
  handleApply: () => void;
  handleCancel: () => void;
  setTasksListFilters: (filters: GetTasksListQueryParams) => void;
  filters: GetTasksListQueryParams;
  nomenclatures: NomenclatureListResponse[] | null;
  customers: StringPagedList | null;
  contracts: ContractListResponsePagedList | null;
  executingContracts: ContractListResponsePagedList | null;
};
