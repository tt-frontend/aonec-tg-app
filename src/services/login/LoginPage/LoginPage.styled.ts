import styled from "styled-components";

export const Wrapper = styled.div`
  height: calc(100vh - 32px);
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  align-items: center;
  justify-content: space-evenly;
`;

export const Card = styled.div`
  background: #f2f2f7;
  padding: 16px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Title = styled.div`
  font-family: "Jura";
  font-weight: 700;
  font-size: 20px;
`;
