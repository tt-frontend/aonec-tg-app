import { FC, useEffect } from "react";
import {
  ButtonsWrapper,
  Content,
  InputWrapper,
  Wrapper,
} from "./FiltersPanel.styled";
import { Props } from "./FiltersPanel.types";
import { Title } from "@/components/Title";
import { Button, Select } from "antd";
import { FormItem } from "@/components/FormItem";
import { useUnit } from "effector-react";
import { backButtonService } from "@/services/backButton/backButtonService.model";
import { NO_CONTRACT_FLAG } from "../../tasksListService.models";
import {
  ETasksSortType,
  filterToTaskSortType,
  TaskSortTypeToFilter,
  TasksSortTypeToLable,
} from "./FiltersPanel.constatns";
import { XIcon } from "@/components/icons/XIcon";

export const FiltersPanel: FC<Props> = ({
  handleApply,
  handleCancel,
  nomenclatures,
  contracts,
  characteristics,
  filters,
  setTasksListFilters,
  handleClose,
  addressesList,
}) => {
  const { setGoBackHandler } = useUnit({
    setGoBackHandler: backButtonService.inputs.setGoBackHandler,
  });

  useEffect(() => {
    setGoBackHandler(handleClose);

    return () => {
      setGoBackHandler(null);
    };
  }, [handleCancel, handleClose, setGoBackHandler]);

  return (
    <Wrapper>
      <Content>
        <Title>Фильтры</Title>

        <FormItem label="Сортировка" bold>
          <InputWrapper>
            <Select
              size="large"
              placeholder="Без сортировки"
              onChange={(value: ETasksSortType | null) => {
                if (!value) {
                  setTasksListFilters({ OrderBy: null, OrderRule: null });
                  return;
                }

                setTasksListFilters({ ...TaskSortTypeToFilter[value] });
              }}
              value={filterToTaskSortType(filters.OrderBy, filters.OrderRule)}
              allowClear
            >
              {Object.values(ETasksSortType).map((type) => (
                <Select.Option key={type} value={type}>
                  {TasksSortTypeToLable[type]}
                </Select.Option>
              ))}
            </Select>
          </InputWrapper>
        </FormItem>

        <FormItem label="Адрес" bold>
          <InputWrapper>
            <Select
              size="large"
              placeholder="Выберите из списка"
              value={filters.AddressIds}
              onChange={(value) => setTasksListFilters({ AddressIds: value })}
              allowClear
              mode="multiple"
              showSearch={false}
              removeIcon={() => <XIcon />}
            >
              {addressesList?.items?.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  {elem.address}
                </Select.Option>
              ))}
            </Select>
          </InputWrapper>
        </FormItem>

        <FormItem label="Номенклатура работ" bold>
          <InputWrapper>
            <Select
              placeholder="Выберите из списка"
              style={{ width: "100%" }}
              size="large"
              allowClear
              value={filters.NomenclatureId}
              onChange={(value) =>
                setTasksListFilters({
                  NomenclatureId: value,
                  CharacteristicId: null,
                })
              }
            >
              {nomenclatures?.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  {elem.name}
                </Select.Option>
              ))}
            </Select>
          </InputWrapper>
        </FormItem>

        {Boolean(characteristics?.length) && (
          <FormItem label="Характеристика работ" bold>
            <InputWrapper>
              <Select
                value={filters.CharacteristicId}
                onChange={(value) =>
                  setTasksListFilters({ CharacteristicId: value })
                }
                placeholder="Выберите из списка"
                style={{ width: "100%" }}
                size="large"
                allowClear
              >
                {characteristics?.map((elem) => (
                  <Select.Option key={elem.id} value={elem.id}>
                    {elem.name}
                  </Select.Option>
                ))}
              </Select>
            </InputWrapper>
          </FormItem>
        )}

        <FormItem label="Договор" bold>
          <InputWrapper>
            <Select
              placeholder="Выберите из списка"
              style={{ width: "100%" }}
              size="large"
              allowClear
              value={filters.ContractIds}
              onChange={(value) => setTasksListFilters({ ContractIds: value })}
              mode="multiple"
              showSearch={false}
              placement="topLeft"
            >
              <Select.Option key={NO_CONTRACT_FLAG} value={NO_CONTRACT_FLAG}>
                Без договора
              </Select.Option>
              {contracts?.items?.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  {elem.name} {elem.type}
                </Select.Option>
              ))}
            </Select>
          </InputWrapper>
        </FormItem>
      </Content>
      <ButtonsWrapper>
        <Button
          style={{ height: 64 }}
          size="large"
          type="primary"
          block
          onClick={handleApply}
        >
          Применить
        </Button>
        <Button
          style={{ height: 64 }}
          size="large"
          type="default"
          block
          onClick={handleCancel}
        >
          Сбросить фильтры
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};
