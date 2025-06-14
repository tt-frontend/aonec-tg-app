import { Card } from "@/components/Card";
import { Input } from "antd";
import styled from "styled-components";

export const Wrapper = styled(Card)`
  width: calc(100%);
  transform: translateX(-16px);
  flex-direction: row;
  gap: 0px;
`;

export const TextArea = styled(Input.TextArea)`
  background: #f2f2f7 !important;
  min-height: 128px !important;
`;

export const ChevronWrapper = styled.div<{ disabled: boolean }>`
  min-width: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ disabled }) => (disabled ? "gray" : "black")};
  height: auto;
  transition: 0.2s;
`;

export const CommentInput = styled(Input)`
  background-color: #f2f2f7 !important;
  height: 60px;
`;
