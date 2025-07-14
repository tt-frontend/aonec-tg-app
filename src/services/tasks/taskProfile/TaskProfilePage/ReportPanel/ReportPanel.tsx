import { FC, useState } from "react";
import { Header, TextAreaSC, Wrapper } from "./ReportPanel.styled";
import { Props } from "./ReportPanel.types";
import { Button } from "antd";

export const ReportPanel: FC<Props> = ({ task, updateReport }) => {
  const [text, setText] = useState(task?.report || "");

  const isChanged = task?.report !== text;

  return (
    <Wrapper
      header={
        <Header>
          Комментарий{" "}
          {isChanged && (
            <Button size="small" onClick={() => setText(task?.report || "")}>
              Отмена
            </Button>
          )}
        </Header>
      }
    >
      <TextAreaSC
        placeholder="Кратко опишите проделанную работу"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {isChanged && (
        <Button type="primary" onClick={() => updateReport(text)}>
          Сохранить
        </Button>
      )}
    </Wrapper>
  );
};
