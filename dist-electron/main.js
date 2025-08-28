import { app, BrowserWindow, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "os";
const getPlatform = () => {
  const platform = os.platform();
  switch (platform) {
    case "win32":
      return "Windows";
    case "darwin":
      return "macOS";
    case "linux":
      return "Linux";
    default:
      return "Unknown";
  }
};
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = !app.isPackaged;
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.ico"),
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    },
    show: false
  });
  if (!isDev) {
    win.setMenu(null);
  }
  win.webContents.on("did-finish-load", () => {
    win.show();
    win.webContents.send("hasMaximize", win.isMaximized());
    win.webContents.send("platform", getPlatform());
  });
  ipcMain.handle("child-process-message", (_e, appName) => {
    console.log(appName);
  });
  ipcMain.handle("minimize-window", () => {
    win.minimize();
  });
  ipcMain.handle("maximize-window", () => {
    let hasMaximize = null;
    if (win.isMaximized()) {
      win.unmaximize();
      hasMaximize = false;
    } else {
      win.maximize();
      hasMaximize = true;
    }
    win.webContents.send("hasMaximize", hasMaximize);
  });
  ipcMain.handle("close-window", () => {
    win.close();
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
process.on("uncaughtException", (error) => {
  console.log(error);
  win.webContents.send("message", {
    value: "发生未知错误",
    success: false
  });
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
