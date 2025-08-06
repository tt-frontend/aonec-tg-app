import { FC } from "react";
import { Content, Header, HeaderWrapper, Wrapper } from "./MainPage.styled";
import { Props } from "./MainPage.types";
import { Avatar, FloatButton, Skeleton } from "antd";
import { Title } from "@/components/Title";
import { SpaceLine } from "@/components/SpaceLine";
import { ActionLink } from "@/components/ActionLink";
import { Space } from "antd/lib";
import stc from "string-to-color";
import { ChevronRight } from "@/components/icons/ChevronRight";
import { ExitIcon } from "@/components/icons/ExitIcon";
import { APP_VERSION } from "@/constants/version";
import dayjs from "dayjs";

export const MainPage: FC<Props> = ({
  logoutUser,
  currentUser,
  tasksCount,
  isLoading,
  archivedTasksCount,
}) => {
  return (
    <Wrapper>
      <FloatButton
        onClick={() =>
          alert(
            `aonec-tg-app \n\n ${APP_VERSION} \n\n TT frontend team ${dayjs().format(
              "YYYY"
            )} \n\n 🧑🏻‍💻👨🏻‍💻👩🏻‍💻👩🏼‍💻👩🏻‍🎨`
          )
        }
        icon={
          <i>
            <b>i</b>
          </i>
        }
        
        style={{ insetInlineEnd: 24, backgroundColor: "white" }}
        shape="square"
      />
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
        <ActionLink
          path="/archiveTasks"
          title="В архиве"
          statusColor="#999999"
          description={archivedTasksCount}
        />
        <SpaceLine />
        {/* <Title>Объекты</Title>
        <ActionLink path="/" title="Посмотреть все объекты" />
        <SpaceLine /> */}
        <div onClick={logoutUser}>
          <ActionLink path="/" title="Выйти из профиля" icon={<ExitIcon />} />
        </div>
      </Content>
    </Wrapper>
  );
};
