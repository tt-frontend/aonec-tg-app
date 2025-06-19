import { FC, useEffect } from "react";
import {
  ButtonsWrapper,
  Content,
  InputWrapper,
  Wrapper,
} from "./FiltersPanel.styled";
import { Props } from "./FiltersPanel.types";
import { Title } from "@/components/Title";
import { Button, DatePicker, Select } from "antd";
import { FormItem } from "@/components/FormItem";
import { useUnit } from "effector-react";
import { backButtonService } from "@/services/backButton/backButtonService.model";

export const FiltersPanel: FC<Props> = ({ handleApply, handleCancel }) => {
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
        <FormItem label="Дата" bold>
          <InputWrapper
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
          >
            <FormItem label="Начать до">
              <DatePicker
                format="DD.MM.YYYY"
                size="large"
                style={{ width: "100%" }}
              />
            </FormItem>
            <FormItem label="Выполнить до">
              <DatePicker
                format="DD.MM.YYYY"
                size="large"
                style={{ width: "100%" }}
              />
            </FormItem>
          </InputWrapper>
        </FormItem>
        <FormItem label="Заказчик" bold>
          <InputWrapper>
            <Select
              placeholder="Выберите из списка"
              style={{ width: "100%" }}
              size="large"
            />
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
