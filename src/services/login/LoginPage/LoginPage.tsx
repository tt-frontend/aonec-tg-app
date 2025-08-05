import { FC, useEffect, useRef } from "react";
import { Card, Title, Wrapper } from "./LoginPage.styled";
import { Props } from "./LoginPage.types";
import { Button, Input, InputRef } from "antd";
import { FormItem } from "@/components/FormItem";
import { useFormik } from "formik";
import { LoginRequest } from "@/api/types";
import { IMask } from "react-imask";
import { validationSchema } from "./LoginPage.constants";
import { ErrorMessage } from "@/components/ErrorMessage";
import { AppIcon } from "@/components/icons/AppIcon";
import { AppVersion } from "@/components/AppVersion";
import { IS_DEV_MODE } from "@/constants/devMode";

export const LoginPage: FC<Props> = ({ handleLogin, isLoading }) => {
  const { values, handleChange, handleSubmit, setFieldValue, errors } =
    useFormik({
      initialValues: { phoneNumber: "", name: "" } as LoginRequest,
      onSubmit: (data) => {
        const phoneNumber = "8" + data.phoneNumber.replace(/[\s\-()]/g, "");

        handleLogin({ ...data, phoneNumber });
      },
      validationSchema,
      validateOnChange: false,
    });

  return (
    <Wrapper>
      <AppIcon />
      <Card>
        <Title>Войти в приложение</Title>
        <FormItem label="Номер телефона">
          <PhoneNumberInput
            value={values.phoneNumber}
            onChange={(value) => setFieldValue("phoneNumber", value)}
            isError={Boolean(errors.phoneNumber)}
          />
          <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
        </FormItem>
        <FormItem label="ФИО">
          <Input
            size="large"
            value={values.name}
            onChange={handleChange}
            name="name"
            placeholder="Введите фамилию, имя и отчество"
            status={errors.name && "error"}
          />
          <ErrorMessage>{errors.name}</ErrorMessage>
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
        {IS_DEV_MODE && (
          <Button
            size="large"
            type="link"
            onClick={() =>
              handleLogin({
                phoneNumber: "89612514987",
                name: "Белослудцев Евгений Викторович",
              })
            }
            loading={isLoading}
            disabled={isLoading}
          >
            Быстрый вход
          </Button>
        )}
      </Card>
      <div>
        <AppVersion />
      </div>
    </Wrapper>
  );
};

const PhoneNumberInput: FC<{
  value: string;
  onChange(value: string): void;
  isError?: boolean;
}> = ({ value, onChange, isError }) => {
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
      onBlur={(e) => onChange(e.target.value)}
      ref={inputRef}
      status={isError ? "error" : void 0}
      placeholder="(___) ___-__-__"
    />
  );
};
