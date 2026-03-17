import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@ant-design/v5-patch-for-react-19";
import { registerServiceWorker } from "./pwa/registerServiceWorker";

createRoot(document.getElementById("root")!).render(<App />);

const startupSplash = document.getElementById("app-startup-splash");

if (startupSplash) {
  requestAnimationFrame(() => {
    startupSplash.classList.add("is-hidden");

    window.setTimeout(() => {
      startupSplash.remove();
    }, 200);
  });
}

registerServiceWorker();
