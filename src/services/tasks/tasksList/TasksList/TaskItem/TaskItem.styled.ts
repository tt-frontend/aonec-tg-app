import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled(Link)`
  background-color: white;
  padding: 16px;
  box-shadow: 0px 0px 8px 0px #0000000d;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-decoration: none;
  color: black;
`;

export const NomenclatureName = styled.div`
  font-size: 17px;
  font-weight: 500;
`;

export const RequestNumber = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CharacterisicWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 14px;
  font-weight: 300;
`;

export const FilesInfo = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const FilesInfoItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
`;

export const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 300;
  align-items: center;
`;

export const DateString = styled.div`
  font-weight: 400;
`;

export const DateName = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconWrapper = styled.div`
  background-color: #f2f2f7;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

export const Address = styled.div`
  font-family: Rubik;
  font-weight: 300;
  font-style: Light;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.41px;
  vertical-align: middle;
  opacity: 0.5;
`;
