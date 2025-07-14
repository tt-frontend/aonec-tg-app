import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  padding-bottom: 64px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const NomenclatureName = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export const RequestNumber = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

export const CharacterisicWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;

  font-size: 15px;
  font-weight: 300;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid lightgray;
  position: fixed;
  z-index: 5;
  bottom: 0;
  width: calc(100%);
  transform: translateX(-16px);
  background-color: white;
`;

export const AddessWrapper = styled.div`
  font-family: Rubik;
  font-weight: 300;
  font-style: Light;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.41px;
  vertical-align: middle;
  opacity: 0.5;
`;
