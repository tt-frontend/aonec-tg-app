import { ReactNode } from "react";

export interface ICommonInfoItem {
  key: string;
  value: ReactNode;
}

export type Props = {
  items: ICommonInfoItem[];
};
