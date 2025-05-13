import { authService } from "@/services/authService";
import axios from "axios";

axios.defaults.baseURL = "https://stage-ecbot.ru/api";

axios.interceptors.request.use((req) => {
  req.headers.Authorization = `Bearer ${
    authService.outputs.$authToken.getState() ||
    authService.outputs.$initToken.getState()
  }`;
  req.headers["x-user-path"] = window.location.pathname || "none";
  req.params = {
    ...(req.params || {}),
  };
  return req;
});

axios.interceptors.response.use(({ data }) => {
  return data;
});

export const api = axios;
