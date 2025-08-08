import {
  EOrderByRule,
  EProductionOrderOrderRule,
  EProductionOrderStatus,
} from "@/api/types";

export type GetTasksListQueryParams = {
  /**
   * Id номенклатуры
   * @format int32
   */
  NomenclatureId?: number;
  /**
   * Id характеристики
   * @format int32
   */
  CharacteristicId?: number | null;
  /** Статус наряда */
  Status?: EProductionOrderStatus;
  ContractIds?: (number | null)[];
  /** Ids адресов объекта */
  AddressIds?: number[];
  /** Тип сортировки наряд-заданий */
  OrderRule?: EProductionOrderOrderRule | null;
  /**
   * Дата начала
   * @format date-time
   */
  From?: string;
  /**
   * Нормативный срок завершения
   * @format date-time
   */
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
