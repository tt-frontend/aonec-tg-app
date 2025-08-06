import { FC } from "react";
import { ActionLinkProps } from "./ActionLink.types";
import {
  ChevronWrapper,
  Description,
  Status,
  Title,
  TitleWrapper,
  Wrapper,
} from "./ActionLink.styled";
import { ChevronRight } from "../icons/ChevronRight";

export const ActionLink: FC<ActionLinkProps> = ({
  title,
  description,
  path,
  statusColor,
  icon,
}) => {
  return (
    <Wrapper to={path}>
      <TitleWrapper>
        <Title>
          {statusColor && <Status color={statusColor} />}
          {title}
        </Title>
        {description && <Description>{description}</Description>}
      </TitleWrapper>
      <ChevronWrapper>
        {!icon && <ChevronRight />}
        {icon}
      </ChevronWrapper>
    </Wrapper>
  );
};
