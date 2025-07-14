import { ProductionOrderResponse } from "@/api/types";

export type Props = {
  task: ProductionOrderResponse | null;
  updateReport: (report: string) => void;
};
