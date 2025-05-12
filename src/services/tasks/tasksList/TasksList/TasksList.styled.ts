import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const SearchButtonWrapper = styled.div`
  height: 36px;
  width: 36px;
  background: #f2f2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
`;

export const TasksListWrapper = styled.div`
  margin-top: 14px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
