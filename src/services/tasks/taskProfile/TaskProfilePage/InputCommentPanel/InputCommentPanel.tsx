import { FC, useState } from "react";
import { TextArea, Wrapper } from "./InputCommentPanel.styled";
import { Props } from "./InputCommentPanel.types";
import { Button } from "antd";

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
    <Wrapper header="Комментарий">
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Кратко опишите проделанную работу"
      />
      {text && (
        <Button
          onClick={onSubmit}
          block
          loading={isLoadingComment}
          disabled={isLoadingComment}
        >
          Отправить
        </Button>
      )}
    </Wrapper>
  );
};
