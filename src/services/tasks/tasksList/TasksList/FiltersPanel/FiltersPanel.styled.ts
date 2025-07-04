import styled from "styled-components";

export const Wrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: #f9f9f9;
  z-index: 10;

  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgray;
  width: 100%;
  padding: 0;
  background: white;
`;

export const InputWrapper = styled.div`
  background: white;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0px 0px 8px 0px #0000000d;
`;
