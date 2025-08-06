import { FC, useEffect, useState } from "react";
import { Header, TextAreaSC, Wrapper } from "./ReportPanel.styled";
import { Props } from "./ReportPanel.types";
import { Button } from "antd";

export const ReportPanel: FC<Props> = ({ task, updateReport, isActive }) => {
  const [text, setText] = useState<string | null | void>("");

  const isChanged = task?.report !== text;

  useEffect(() => {
    setText(task?.report);

    return () => setText("");
  }, [task?.report]);

  return (
    <Wrapper
      header={
        <Header>
          Комментарий{" "}
          {isChanged && (
            <Button size="small" onClick={() => setText(task?.report)}>
              Отмена
            </Button>
          )}
        </Header>
      }
    >
      <TextAreaSC
        disabled={!isActive}
        placeholder="Кратко опишите проделанную работу"
        value={text || ""}
        onChange={(e) => setText(e.target.value)}
      />
      {isChanged && (
        <Button
          type="primary"
          onClick={() => typeof text === "string" && updateReport(text)}
        >
          Сохранить
        </Button>
      )}
    </Wrapper>
  );
};
