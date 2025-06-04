import styled from "styled-components";

export const Wrapper = styled.div``;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  font-family: Rubik;
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;

  border-bottom: 1px solid #e3e8ea;
  padding: 12px 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

export const InfoTitle = styled.div`
  font-weight: 300;
  font-size: 13px;
  line-height: 18px;
`;
