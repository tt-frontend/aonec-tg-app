import React, { ReactNode } from "react";

export type Props = {
  title?: ReactNode;
  header?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
