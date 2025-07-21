import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .length(15, "Некорректный номер телефона")
    .required("Введите номер телефона"),
  name: Yup.string().required("Введите имя"),
});
