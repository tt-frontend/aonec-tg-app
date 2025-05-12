import { ReactNode } from "react";

export type ActionLinkProps = {
  title: string | ReactNode;
  description?: string | null | ReactNode;
  path: string;
  statusColor?: string;
};
