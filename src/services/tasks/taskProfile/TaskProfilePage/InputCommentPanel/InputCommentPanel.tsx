import { FC } from "react";
import { TextArea, Wrapper } from "./InputCommentPanel.styled";
import { Props } from "./InputCommentPanel.types";

export const InputCommentPanel: FC<Props> = () => {
  return (
    <Wrapper header="Комментарий">
      <TextArea placeholder="Кратко опишите проделанную работу" />
    </Wrapper>
  );
};
