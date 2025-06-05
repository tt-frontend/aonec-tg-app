import { FC } from "react";
import {
  AuthorName,
  Comment,
  CommentCreationDate,
  CommentTitle,
  Wrapper,
} from "./CommentItem.styled";
import { Props } from "./CommentItem.types";
import { Avatar } from "antd";
import stc from "string-to-color";
import dayjs from "dayjs";

export const CommentItem: FC<Props> = ({ comment }) => {
  return (
    <Wrapper>
      <Comment
        header={
          <CommentTitle>
            <AuthorName>{comment.author?.name}</AuthorName>
            <CommentCreationDate>{dayjs(comment.createdAt).format("DD.MM.YYYY HH:mm")}</CommentCreationDate>
          </CommentTitle>
        }
      >
        {comment.text}
      </Comment>
      <Avatar style={{ backgroundColor: stc(comment.author?.name) }}>
        {comment.author?.name?.[0]}
      </Avatar>
    </Wrapper>
  );
};
