import { FC, useEffect, useRef } from "react";
import { Card, Title, Wrapper } from "./LoginPage.styled";
import { Props } from "./LoginPage.types";
import { Button, Input, InputRef, message } from "antd";
import { FormItem } from "@/components/FormItem";
import { useFormik } from "formik";
import { LoginRequest } from "@/api/types";
import { IMask } from "react-imask";

export const LoginPage: FC<Props> = ({ handleLogin, isLoading }) => {
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: { phoneNumber: "", name: "" } as LoginRequest,
    onSubmit: (data) => {
      const phoneNumber = data.phoneNumber.replace(/[\s\-()]/g, "");

      message.info(phoneNumber);

      handleLogin({ ...data, phoneNumber });
    },
  });

  return (
    <Wrapper>
      <Card>
        <Title>Войдите в приложение</Title>
        <FormItem label="Номер телефона">
          <PhoneNumberInput
            value={values.phoneNumber}
            onChange={(value) => setFieldValue("phoneNumber", value)}
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
        {/* <Button
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
        </Button> */}
      </Card>
    </Wrapper>
  );
};

const PhoneNumberInput: FC<{
  value: string;
  onChange(value: string): void;
}> = ({ value, onChange }) => {
  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputRef.current && inputRef.current.input) {
      const mask = IMask(inputRef.current.input, {
        mask: "(000) 000-00-00",
      });

      return () => mask.destroy();
    }
  }, []);

  return (
    <Input
      value={value}
      type="tel"
      size="large"
      prefix="+7"
      onChange={(e) => onChange(e.target.value)}
      ref={inputRef}
      placeholder="(___)___-__-__"
    />
  );
};
