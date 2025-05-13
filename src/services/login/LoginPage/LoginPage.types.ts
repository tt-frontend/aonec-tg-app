import { LoginRequest } from "@/api/types";

export type Props = {
  handleLogin: (payload: LoginRequest) => void;
  isLoading: boolean;
};
