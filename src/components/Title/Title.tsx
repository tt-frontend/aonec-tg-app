import { FC } from "react";
import { Wrapper } from "./Title.styled";
import { Props } from "./Title.types";

export const Title: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
