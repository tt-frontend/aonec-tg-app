import {
  AddressResponsePagedList,
  CharacteristicResponse,
  ContractListResponsePagedList,
  NomenclatureListResponse,
} from "@/api/types";
import { GetTasksListQueryParams } from "../../tasksListService.types";

export type Props = {
  handleApply: () => void;
  handleCancel: () => void;
  setTasksListFilters: (filters: GetTasksListQueryParams) => void;
  filters: GetTasksListQueryParams;
  nomenclatures: NomenclatureListResponse[] | null;
  contracts: ContractListResponsePagedList | null;
  executingContracts: ContractListResponsePagedList | null;
  characteristics: CharacteristicResponse[] | null;
  handleClose: () => void;
  addressesList: AddressResponsePagedList | null;
};
