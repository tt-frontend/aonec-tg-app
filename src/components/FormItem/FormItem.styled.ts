import { styled } from "styled-components";
import FormItemAntd from "antd/es/form/FormItem";

export const FormItem = styled(FormItemAntd)<{ bold?: boolean }>`
  margin-bottom: 0;
  font-weight: ${({ bold }) => (bold ? 400 : 300)};

  .ant-form-item-row {
    display: flex;
    flex-direction: column;
  }

  .ant-form-item-label {
    padding-bottom: 4px;

    font-family: "Rubik";
    font-size: 15px;
    white-space: nowrap;
  }
`;
