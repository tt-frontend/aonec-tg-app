import fs from "fs";
import { createRequire } from "node:module";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, type Plugin } from "vite";

const require = createRequire(import.meta.url);
const { QrCode, Ecc } = require("@rc-component/qrcode/lib/libs/qrcodegen.js") as {
  Ecc: { MEDIUM: unknown };
  QrCode: {
    encodeText: (
      text: string,
      errorCorrectionLevel: unknown,
    ) => TerminalQrCode;
  };
};

type TerminalQrCode = {
  size: number;
  getModule: (x: number, y: number) => boolean;
};

const packageJson = JSON.parse(
  fs.readFileSync(new URL("./package.json", import.meta.url), "utf-8"),
) as { version: string };

const QR_MARGIN = 2;
const QR_HEADING = "  Scan from phone:";

const renderQrCode = (value: string) => {
  const qrCode = QrCode.encodeText(value, Ecc.MEDIUM);
  const rows: string[] = [];

  for (let y = -QR_MARGIN; y < qrCode.size + QR_MARGIN; y += 2) {
    let row = "";

    for (let x = -QR_MARGIN; x < qrCode.size + QR_MARGIN; x += 1) {
      const top = qrCode.getModule(x, y);
      const bottom = qrCode.getModule(x, y + 1);

      if (top && bottom) {
        row += "█";
      } else if (top) {
        row += "▀";
      } else if (bottom) {
        row += "▄";
      } else {
        row += " ";
      }
    }

    rows.push(`  ${row}`);
  }

  return rows.join("\n");
};

const devServerQrPlugin = (): Plugin => ({
  name: "dev-server-qr",
  configureServer(server) {
    const originalPrintUrls = server.printUrls.bind(server);

    server.printUrls = () => {
      originalPrintUrls();

      const networkUrl = server.resolvedUrls?.network[0];

      if (!networkUrl) {
        return;
      }

      server.config.logger.info(`\n${QR_HEADING}`, { clear: false });
      server.config.logger.info(renderQrCode(networkUrl), { clear: false });
      server.config.logger.info(`  ${networkUrl}\n`, { clear: false });
    };
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devServerQrPlugin()],
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: true,
  },
  build: {
    outDir: "build",
  },
});
