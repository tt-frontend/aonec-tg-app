import { FC } from "react";
import { Card, Title, Wrapper } from "./LoginPage.styled";
import { Props } from "./LoginPage.types";
import { Button, Input } from "antd";
import { FormItem } from "@/components/FormItem";
import { useNavigate } from "react-router-dom";

export const LoginPage: FC<Props> = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Card>
        <Title>Войдите в приложение</Title>
        <FormItem label="email">
          <Input size="large" />
        </FormItem>
        <FormItem label="Пароль">
          <Input size="large" type="password" />
        </FormItem>
        <Button size="large" type="primary" onClick={() => navigate("/")}>
          Войти
        </Button>
      </Card>
    </Wrapper>
  );
};
