import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background: #f9f9f9;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: calc(16px + env(safe-area-inset-top)) 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: calc(100% - 32px);
  max-width: 480px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid lightgray;
  width: 100%;
  padding: 16px 16px calc(16px + env(safe-area-inset-bottom));
  box-sizing: border-box;
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
