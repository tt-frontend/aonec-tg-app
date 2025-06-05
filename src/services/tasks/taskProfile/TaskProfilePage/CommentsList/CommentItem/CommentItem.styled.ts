import { Card } from "@/components/Card";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 30px;
  gap: 8px;
`;

export const Comment = styled(Card)`
  font-family: Rubik;
  font-weight: 400;
  font-size: 16px;
`;

export const CommentTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-family: Rubik;
  font-weight: 300;
  font-size: 13px;
  line-height: 20px;
`;

export const AuthorName = styled.div`
  color: #007aff;
`;

export const CommentCreationDate = styled.div`
  color: #00000080;
`;
