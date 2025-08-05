import { FC } from "react";
import { Wrapper } from "./AppVersion.styled";
import { Props } from "./AppVersion.types";
import { APP_VERSION } from "@/constants/version";

export const AppVersion: FC<Props> = () => {
  return <Wrapper>[ ver: {APP_VERSION} ]</Wrapper>;
};
