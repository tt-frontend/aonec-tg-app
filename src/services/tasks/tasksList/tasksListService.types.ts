import {
  EOrderByRule,
  EProductionOrderOrderRule,
  EProductionOrderStatus,
} from "@/api/types";

export type GetTasksListQueryParams = {
  /** @format int32 */
  NomenclatureId?: number;
  /** @format int32 */
  CharacteristicId?: number;
  Status?: EProductionOrderStatus;
  /** @format int32 */
  ContractIdValue?: number;
  ContractIdHasValue?: boolean;
  /** @format int32 */
  AddressId?: number;
  /** Тип сортировки наряд-заданий */
  OrderRule?: EProductionOrderOrderRule;
  /** @format date-time */
  From?: string;
  /** @format date-time */
  To?: string;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export type GetContractsQueryParams = {
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};

export type GetExecutingContractsQueryParams = {
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
