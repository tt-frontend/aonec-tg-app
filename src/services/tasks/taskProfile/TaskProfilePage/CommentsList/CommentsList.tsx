import { FC } from "react";
import { Wrapper } from "./CommentsList.styled";
import { Props } from "./CommentsList.types";
import { CommentItem } from "./CommentItem";
import { Empty } from "antd";

export const CommentsList: FC<Props> = ({ comments, handleDeleteComment }) => {
  return (
    <Wrapper lable="Комментарии к задаче">
      {comments?.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          handleDeleteComment={handleDeleteComment}
        />
      ))}
      {!comments?.length && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет данных" />
      )}
    </Wrapper>
  );
};
