import { FC, useEffect, useState } from "react";
import { Header, TextAreaSC, Wrapper } from "./ReportPanel.styled";
import { Props } from "./ReportPanel.types";
import { Spin } from "antd";
import { useUnit } from "effector-react";
import { updateReportMutation } from "../../taskProfileService.api";
import { useDebounce } from "@/utils/useDebounce";
import { CompleteIcon } from "@/components/icons/Complete";

export const ReportPanel: FC<Props> = ({ task, updateReport, isActive }) => {
  const [text, setText] = useState<string | null | void>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { isLoading } = useUnit({
    isLoading: updateReportMutation.$pending,
  });

  const debouncedText = useDebounce(text, 1000);

  const isChanged = task?.report !== debouncedText;

  useEffect(() => {
    if (!debouncedText || typeof debouncedText !== "string" || !isChanged) {
      return;
    }

    updateReport(debouncedText);
  }, [debouncedText, updateReport, isChanged]);

  useEffect(() => {
    const unsubscribeSuccess = updateReportMutation.finished.success.watch(
      () => {
        setIsComplete(true);
      }
    ).unsubscribe;

    const unsubscribeFailure = updateReportMutation.finished.failure.watch(
      () => {
        setIsComplete(false);
      }
    ).unsubscribe;

    return () => {
      unsubscribeSuccess();
      unsubscribeFailure();
      setIsComplete(false);
    };
  }, []);

  useEffect(() => {
    setText(task?.report);

    return () => setText("");
  }, [task?.report]);

  return (
    <Wrapper
      header={
        <Header>
          Комментарий {isLoading && <Spin />}
          {!isLoading && isComplete && <CompleteIcon />}
        </Header>
      }
    >
      <TextAreaSC
        disabled={!isActive}
        placeholder="Кратко опишите проделанную работу"
        value={text || ""}
        onChange={(e) => setText(e.target.value)}
      />
    </Wrapper>
  );
};
