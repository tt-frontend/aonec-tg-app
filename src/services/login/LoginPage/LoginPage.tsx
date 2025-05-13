import { FC } from "react";
import { Card, Title, Wrapper } from "./LoginPage.styled";
import { Props } from "./LoginPage.types";
import { Button, Input } from "antd";
import { FormItem } from "@/components/FormItem";
import { useFormik } from "formik";
import { LoginRequest } from "@/api/types";

export const LoginPage: FC<Props> = ({ handleLogin, isLoading }) => {
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: { phoneNumber: "", name: "" } as LoginRequest,
    onSubmit: (data) => {
      handleLogin(data);
    },
  });

  return (
    <Wrapper>
      <Card>
        <Title>Войдите в приложение</Title>
        <FormItem label="Номер телефона">
          <Input
            size="large"
            value={values.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
          />
        </FormItem>
        <FormItem label="Имя">
          <Input
            size="large"
            value={values.name}
            onChange={handleChange}
            name="name"
          />
        </FormItem>
        <Button
          size="large"
          type="primary"
          onClick={() => handleSubmit()}
          loading={isLoading}
          disabled={isLoading}
        >
          Войти
        </Button>
      </Card>
    </Wrapper>
  );
};
