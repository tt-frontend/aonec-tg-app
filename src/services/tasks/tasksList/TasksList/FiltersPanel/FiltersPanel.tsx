import { FC } from "react";
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

export const FiltersPanel: FC<Props> = ({ handleApply }) => {
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
        <Button size="large" type="primary" block onClick={handleApply}>
          Применить
        </Button>
        <Button size="large" type="default" block onClick={handleApply}>
          Сбросить фильтры
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};
