import styled from "styled-components";

export const Wrapper = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  padding-bottom: ${({ isActive }) => isActive && "96px"};
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NomenclatureName = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

export const RequestNumber = styled.div`
  font-size: 14px;
  font-weight: 400;
`;

export const CharacterisicWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 300;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid #d3d3d373;
  position: fixed;
  z-index: 5;
  bottom: 0;
  width: calc(100% - 32px);
  transform: translateX(-16px);
  background-color: #ffffff3d;
  backdrop-filter: blur(6px);
  padding: 16px;
`;

export const AddessWrapper = styled.div`
  font-family: Rubik;
  font-weight: 300;
  font-style: Light;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.41px;
  vertical-align: middle;
  opacity: 0.7;
`;

export const OutputMaterial = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TaskUnitInfoWrapper = styled.div`
  height: 28px;
  display: flex;
  font-weight: 300 !important;
  font-size: 14px;
`;

export const TaskUnitAmountWrapper = styled.div`
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  color: #ffffff;
  background: #2d2d2d;
`;

export const TaskUnitWrapper = styled.div`
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  color: #000000;
  background: #dbdbdb;
`;

export const TaskStage = styled.div`
  display: flex;
  font-weight: 400 !important;
  font-size: 14px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  color: #ffffff;
  background: #0088ff;
  width: fit-content;
  gap: 4px;
`;
