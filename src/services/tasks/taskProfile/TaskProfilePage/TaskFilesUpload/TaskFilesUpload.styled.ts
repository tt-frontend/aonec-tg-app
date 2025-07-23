import styled from "styled-components";

export const Wrapper = styled.div``;

export const DocumentItem = styled.div`
  height: 48px;
  display: grid;
  grid-template-columns: 20px 1fr 16px;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border: 1px solid #7676801f;
  background: #fff;

  font-family: Rubik;
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #333;
`;

export const FilesAttachCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DocumentName = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 2px 0;
`;

export const ImagesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
`;

export const ImageItem = styled.div<{ url: string }>`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50%;
  padding: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
`;
