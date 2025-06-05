import { FC } from "react";
import { ExWrapper, Header, Title, Wrapper } from "./Card.styled";
import { Props } from "./Card.types";

export const Card: FC<Props> = ({ lable, header, ...props }) => {
  const content = (
    <Wrapper {...props}>
      {header && <Header>{header}</Header>}
      {props.children}
    </Wrapper>
  );

  if (lable) {
    return (
      <ExWrapper>
        <Title>{lable}</Title>
        {content}
      </ExWrapper>
    );
  }

  return content;
};
