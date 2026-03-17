import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  bottom: calc(16px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: min(calc(100% - 32px), 480px);
  z-index: 20;
  pointer-events: none;
`;

export const Card = styled.div`
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(0, 0, 0, 0.92);
  color: #ffffff;
  padding: 16px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.22);
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const Description = styled.div`
  font-size: 14px;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.84);
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;
