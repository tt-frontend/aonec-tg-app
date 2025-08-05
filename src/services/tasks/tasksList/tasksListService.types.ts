import {
  EOrderByRule,
  EProductionOrderOrderRule,
  EProductionOrderStatus,
} from "@/api/types";

export type GetTasksListQueryParams = {
  /** @format int32 */
  NomenclatureId?: number;
  /** @format int32 */
  CharacteristicId?: number | null;
  Status?: EProductionOrderStatus;
  /** @format int32 */
  ContractIdValue?: number | string | null;
  ContractIdHasValue?: boolean;
  /** @format int32 */
  AddressId?: number;
  /** Тип сортировки наряд-заданий */
  OrderRule?: EProductionOrderOrderRule | null;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule | null;
};

export type GetContractsQueryParams = {
  ProductionOrderStatus?: EProductionOrderStatus;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export type GetExecutingContractsQueryParams = {
  ProductionOrderStatus?: EProductionOrderStatus;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export type AddressesOfTasksQueryParams = {
  Address?: string;
  ProductionOrderStatus?: EProductionOrderStatus;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export type GetNomenclaturesQueryParams = {
  NomenclatureName?: string;
  ProductionOrderStatus?: EProductionOrderStatus;
};
