import {
  EOrderByRule,
  EProductionOrderOrderRule,
  ProductionOrderGroupingFilter,
} from "@/api/types";

export type GetTasksListQueryParams = {
  /** @format int32 */
  NomenclatureId?: number;
  /** @format int32 */
  CharacteristicId?: number;
  GroupType?: ProductionOrderGroupingFilter;
  /** @format int32 */
  ContractId?: number;
  /** @format int32 */
  ExecutionContractId?: number;
  Customer?: string;
  /** Тип сортировки наряд-заданий */
  OrderRule?: EProductionOrderOrderRule;
  /** @format int32 */
  PageNumber?: number;
  /** @format int32 */
  PageSize?: number;
  OrderBy?: EOrderByRule;
};
