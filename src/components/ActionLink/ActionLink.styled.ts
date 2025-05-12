import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
  background: #fff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  padding-left: 16px;
  gap: 12px;
  cursor: pointer;
  text-decoration: none;
  min-height: 60px;
`;

export const TitleWrapper = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.div`
  width: 100%;
  color: #000;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.4px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Description = styled.div`
  margin-top: 4px;
  color: #000000;
  opacity: 0.5;
  font-size: 15px;
  font-style: normal;
  font-weight: 300;
  line-height: 17px; /* 130.769% */
  letter-spacing: -0.408px;
`;

export const ChevronWrapper = styled.div`
  height: 60px;
  min-width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
`;

export const Status = styled.div<{ color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;
