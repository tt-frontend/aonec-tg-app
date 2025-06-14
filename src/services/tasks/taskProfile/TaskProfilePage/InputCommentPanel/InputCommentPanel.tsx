import { FC, useState } from "react";
import {
  ChevronWrapper,
  CommentInput,
  Wrapper,
} from "./InputCommentPanel.styled";
import { Props } from "./InputCommentPanel.types";
import { ChevronRight } from "react-bootstrap-icons";

export const InputCommentPanel: FC<Props> = ({
  isLoadingComment,
  handleAddComment,
}) => {
  const [text, setText] = useState<string>("");

  const onSubmit = () => {
    handleAddComment({ comment: text });
    setText("");
  };

  return (
    <Wrapper>
      <CommentInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Кратко опишите проделанную работу"
      />
      <ChevronWrapper
        disabled={isLoadingComment || !text}
        onClick={() => {
          if (isLoadingComment || !text) return;

          onSubmit();
        }}
      >
        <ChevronRight color="white" />
      </ChevronWrapper>
    </Wrapper>
  );
};
