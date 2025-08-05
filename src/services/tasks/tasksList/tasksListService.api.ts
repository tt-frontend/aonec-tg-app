import { api } from "@/api";
import {
  AddressResponsePagedList,
  CharacteristicResponse,
  ContractListResponsePagedList,
  NomenclatureListResponse,
  ProductionOrderListResponsePagedList,
} from "@/api/types";
import { createQuery } from "@farfetched/core";
import {
  AddressesOfTasksQueryParams,
  GetContractsQueryParams,
  GetExecutingContractsQueryParams,
  GetNomenclaturesQueryParams,
  GetTasksListQueryParams,
} from "./tasksListService.types";
import axios from "axios";

export const tasksListQuery = createQuery<
  [GetTasksListQueryParams],
  ProductionOrderListResponsePagedList
>({
  handler: (params) => api.get("/ProductionOrders", { params }),
});

export const nomenclaturesListQuery = createQuery<
  [GetNomenclaturesQueryParams],
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

export const addressesOfTasksQuery = createQuery<
  [AddressesOfTasksQueryParams],
  AddressResponsePagedList
>({
  handler: (params): Promise<AddressResponsePagedList> =>
    axios.get(`Filters/addresses`, { params }),
});
