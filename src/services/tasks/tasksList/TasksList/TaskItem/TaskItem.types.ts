import {
  EProductionOrderStatus,
  ProductionOrderListResponse,
} from "@/api/types";

export type Props = {
  task: ProductionOrderListResponse;
  status: EProductionOrderStatus;
};
