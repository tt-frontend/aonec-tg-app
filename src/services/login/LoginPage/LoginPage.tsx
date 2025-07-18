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
            placeholder="Введите номер телефона"
          />
        </FormItem>
        <FormItem label="Имя">
          <Input
            size="large"
            value={values.name}
            onChange={handleChange}
            name="name"
            placeholder="Введите имя и фамилию"
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
        <Button
          size="large"
          type="link"
          onClick={() =>
            handleLogin({
              phoneNumber: "8 961 251 49 86",
              name: "Белослудцев Евгений Викторович",
            })
          }
          loading={isLoading}
          disabled={isLoading}
        >
          Быстрый вход
        </Button>
      </Card>
    </Wrapper>
  );
};
