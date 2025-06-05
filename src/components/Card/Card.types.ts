import React, { ReactNode } from "react";

export type Props = React.HTMLAttributes<HTMLDivElement> & {
  lable?: ReactNode;
  header?: ReactNode;
};
