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
            >
              {nomenclatures?.map((elem) => (
                <Select.Option key={elem.id} value={elem.id}>
                  {elem.name}
                </Select.Option>
              ))}
            </Select>
          </InputWrapper>
        </FormItem>

        <FormItem label="Заказчик" bold>
          <InputWrapper>
            <Select
              placeholder="Выберите из списка"
              style={{ width: "100%" }}
              size="large"
              allowClear
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
