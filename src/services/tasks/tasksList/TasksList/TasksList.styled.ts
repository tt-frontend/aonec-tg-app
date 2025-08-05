import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  padding-top: 70px;
  padding-bottom: 16px;
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
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleWrapper = styled.div`
  top: 0px;
  left: 0;
  padding: 14px 16px;
  position: fixed;
  width: calc(100% - 32px);
  backdrop-filter: blur(6px);
  background: #ffffffad;
  z-index: 2;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const TaskAmount = styled.div`
  margin-top: 4px;
  font-size: 12px;
  font-weight: 400;
`;
