import { Card } from "@/components/Card";
import TextArea from "antd/es/input/TextArea";
import styled from "styled-components";

export const Wrapper = styled(Card)``;

export const TextAreaSC = styled(TextArea)`
  min-height: 86px !important;

  background-color: #f2f2f7 !important;

  &:active {
    background-color: #f2f2f7;
  }

  &:hover {
    background-color: #f2f2f7;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
