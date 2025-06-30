import { FC } from "react";
import { Content, Header, HeaderWrapper, Wrapper } from "./MainPage.styled";
import { Props } from "./MainPage.types";
import { Avatar, Skeleton } from "antd";
import { Title } from "@/components/Title";
import { SpaceLine } from "@/components/SpaceLine";
import { ActionLink } from "@/components/ActionLink";
import { Space } from "antd/lib";
import stc from "string-to-color";
import { ChevronRight } from "@/components/icons/ChevronRight";

export const MainPage: FC<Props> = ({
  logoutUser,
  currentUser,
  tasksCount,
  isLoading,
}) => {
  return (
    <Wrapper>
      {currentUser && (
        <HeaderWrapper>
          <Header>
            <Avatar
              style={{
                backgroundColor: stc(currentUser.name),
                verticalAlign: "middle",
              }}
              size="large"
            >
              {currentUser.name?.[0].toUpperCase()}
            </Avatar>
            <HeaderWrapper>{currentUser.name}</HeaderWrapper>
          </Header>
          <ChevronRight />
        </HeaderWrapper>
      )}
      {!currentUser && isLoading && (
        <Space>
          <Skeleton.Avatar active shape="circle" />
          <Skeleton.Input active />
        </Space>
      )}
      <Content>
        <Title>Задачи</Title>
        <ActionLink
          path="/tasks"
          title="Активные"
          description={tasksCount}
          statusColor="#34C759"
        />
        {/* <ActionLink path="/" title="В архиве" statusColor="#999999" />
        <SpaceLine />
        <Title>Объекты</Title>
        <ActionLink path="/" title="Посмотреть все объекты" /> */}
        <SpaceLine />
        <div onClick={logoutUser}>
          <ActionLink path="/" title="Выйти" />
        </div>
      </Content>
    </Wrapper>
  );
};
