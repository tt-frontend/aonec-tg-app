import { api } from "@/api";
import {
  CharacteristicResponse,
  ContractListResponsePagedList,
  NomenclatureListResponse,
  ProductionOrderListResponsePagedList,
} from "@/api/types";
import { createQuery } from "@farfetched/core";
import {
  GetContractsQueryParams,
  GetExecutingContractsQueryParams,
  GetTasksListQueryParams,
} from "./tasksListService.types";

export const tasksListQuery = createQuery<
  [GetTasksListQueryParams],
  ProductionOrderListResponsePagedList
>({
  handler: (params) => api.get("/ProductionOrders", { params }),
});

export const nomenclaturesListQuery = createQuery<
  [
    {
      NomenclatureName?: string;
    }
  ],
  NomenclatureListResponse[]
>({
  handler: (payload) => api.get("/Nomenclatures", { params: payload }),
});

export const contractsListQuery = createQuery<
  [GetContractsQueryParams],
  ContractListResponsePagedList
>({
  handler: (params): Promise<ContractListResponsePagedList> =>
    api.get("/Filters/contracts", { params }),
});

export const executingContractsListQuery = createQuery<
  [GetExecutingContractsQueryParams],
  ContractListResponsePagedList
>({
  handler: (params) => api.get("/Filters/executionContracts", { params }),
});

export const nomenclatureCharacteristicsQuery = createQuery<
  [number],
  CharacteristicResponse[]
>({
  handler: (id) => api.get(`/Nomenclatures/${id}`),
});
