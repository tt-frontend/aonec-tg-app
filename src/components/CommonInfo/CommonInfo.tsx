import { FC } from "react";
import { InfoItem, InfoTitle, Wrapper } from "./CommonInfo.styled";
import { Props } from "./CommonInfo.types";

export const CommonInfo: FC<Props> = ({ items }) => {
  return (
    <Wrapper>
      {items.map(({ key, value }) => (
        <InfoItem key={key}>
          <InfoTitle>{key}</InfoTitle>
          {value}
        </InfoItem>
      ))}
    </Wrapper>
  );
};
