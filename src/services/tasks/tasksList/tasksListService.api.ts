import { api } from "@/api";
import {
  ContractListResponsePagedList,
  NomenclatureListResponse,
  ProductionOrderListResponsePagedList,
  StringPagedList,
} from "@/api/types";
import { createQuery } from "@farfetched/core";
import {
  GetContractorsCustomersQueryParams,
  GetContractsQueryParams,
  GetExecutingContractsQueryParams,
  GetTasksListQueryParams,
} from "./tasksListService.types";

export const tasksListQuery = createQuery<
  [GetTasksListQueryParams],
  ProductionOrderListResponsePagedList
>({
  handler: () => api.get("/ProductionOrders"),
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

export const customersListQuery = createQuery<
  [GetContractorsCustomersQueryParams],
  StringPagedList
>({
  handler: (params) => api.get("/Contractors/customers", { params }),
});

export const contractsListQuery = createQuery<
  [GetContractsQueryParams],
  ContractListResponsePagedList
>({
  handler: (params): Promise<ContractListResponsePagedList> =>
    api.get("/Contractors/contracts", { params }),
});

export const executingContractsListQuery = createQuery<
  [GetExecutingContractsQueryParams],
  ContractListResponsePagedList
>({
  handler: (params) => api.get("/Contractors/executionContracts", { params }),
});
