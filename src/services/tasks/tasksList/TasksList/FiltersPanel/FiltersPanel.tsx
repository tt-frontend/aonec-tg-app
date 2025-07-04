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

export const FiltersPanel: FC<Props> = ({
  handleApply,
  handleCancel,
  nomenclatures,
  customers,
  contracts,
  characteristics,
  filters,
  setTasksListFilters,
}) => {
  const { setGoBackHandler } = useUnit({
    setGoBackHandler: backButtonService.inputs.setGoBackHandler,
  });

  useEffect(() => {
    setGoBackHandler(handleCancel);

    return () => {
      setGoBackHandler(null);
    };
  }, [handleCancel, setGoBackHandler]);

  return (
    <Wrapper>
      <Content>
        <Title>Фильтры</Title>

        <FormItem label="Номенклатура работ" bold>
          <InputWrapper>
            <Select
              placeholder="Выберите из списка"
              style={{ width: "100%" }}
              size="large"
              allowClear
              value={filters.NomenclatureId}
              onChange={(value) =>
                setTasksListFilters({ NomenclatureId: value })
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

        <FormItem label="Заказчик" bold>
          <InputWrapper>
            <Select
              placeholder="Выберите из списка"
              style={{ width: "100%" }}
              size="large"
              allowClear
              value={filters.Customer}
              onChange={(value) => setTasksListFilters({ Customer: value })}
            >
              {customers?.items?.map((elem) => (
                <Select.Option key={elem} value={elem}>
                  {elem}
                </Select.Option>
              ))}
            </Select>
          </InputWrapper>
        </FormItem>

        <FormItem label="Договор" bold>
          <InputWrapper>
            <Select
              placeholder="Выберите из списка"
              style={{ width: "100%" }}
              size="large"
              allowClear
              value={filters.ContractId}
              onChange={(value) => setTasksListFilters({ ContractId: value })}
            >
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
