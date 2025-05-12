import { FC } from "react";
import { Content, Header, HeaderWrapper, Wrapper } from "./MainPage.styled";
import { Props } from "./MainPage.types";
import { Avatar } from "antd";
import { ChevronRight } from "react-bootstrap-icons";
import { Title } from "@/components/Title";
import { SpaceLine } from "@/components/SpaceLine";
import { ActionLink } from "@/components/ActionLink";

export const MainPage: FC<Props> = () => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Header>
          <Avatar
            style={{ backgroundColor: "orange", verticalAlign: "middle" }}
            size="large"
          >
            Ю
          </Avatar>
          <HeaderWrapper>Юлия Филимонова</HeaderWrapper>
        </Header>
        <ChevronRight />
      </HeaderWrapper>
      <Content>
        <Title>Задачи</Title>
        <ActionLink
          path="/tasks"
          title="Активные"
          description={56}
          statusColor="#34C759"
        />
        <ActionLink
          path="/"
          title="В архиве"
          description={10}
          statusColor="#999999"
        />
        <SpaceLine />
        <Title>Объекты</Title>
        <ActionLink path="/" title="Посмотреть все объекты" />
      </Content>
    </Wrapper>
  );
};
