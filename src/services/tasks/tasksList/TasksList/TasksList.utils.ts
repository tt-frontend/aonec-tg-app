import { GetTasksListQueryParams } from "../tasksListService.types";

export function isFilterselected(filters: GetTasksListQueryParams) {
  const { NomenclatureId, CharacteristicId, ContractIds, AddressIds } = filters;

  return [NomenclatureId, CharacteristicId, ContractIds, AddressIds].some(
    Boolean
  );
}
