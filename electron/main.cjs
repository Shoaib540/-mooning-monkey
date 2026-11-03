const {
  app,
  BrowserWindow,
  ipcMain,
  shell,
  globalShortcut,
  clipboard,
  nativeTheme,
} = require("electron");
const os = require("os");
const path = require("path");
const { exec } = require("child_process");

const isDev = !app.isPackaged;
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1480,
    height: 920,
    minWidth: 1120,
    minHeight: 720,
    backgroundColor: "#07080a",
    title: "Shoaib",
    frame: false,
    titleBarStyle: "hidden",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL || "http://127.0.0.1:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.once("ready-to-show", () => mainWindow?.show());

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  nativeTheme.themeSource = "dark";
  createWindow();

  globalShortcut.register("CommandOrControl+Shift+S", () => {
    mainWindow?.webContents.send("shoaib:hotkey", "toggle-listen");
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => globalShortcut.unregisterAll());

ipcMain.handle("window:minimize", () => mainWindow?.minimize());
ipcMain.handle("window:maximize", () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.handle("window:close", () => mainWindow?.close());
ipcMain.handle("shell:openExternal", (_e, url) => shell.openExternal(url));
ipcMain.handle("app:getVersion", () => app.getVersion());

ipcMain.handle("system:info", () => {
  const cpus = os.cpus();
  const total = os.totalmem();
  const free = os.freemem();
  return {
    platform: os.platform(),
    release: os.release(),
    arch: os.arch(),
    hostname: os.hostname(),
    uptimeSec: Math.floor(os.uptime()),
    cpuModel: cpus[0]?.model || "unknown",
    cpuCores: cpus.length,
    totalMemGb: +(total / 1024 / 1024 / 1024).toFixed(2),
    freeMemGb: +(free / 1024 / 1024 / 1024).toFixed(2),
    usedMemGb: +((total - free) / 1024 / 1024 / 1024).toFixed(2),
    homeDir: os.homedir(),
    userInfo: (() => {
      try {
        return os.userInfo().username;
      } catch {
        return "user";
      }
    })(),
  };
});

ipcMain.handle("clipboard:write", (_e, text) => {
  clipboard.writeText(String(text || ""));
  return true;
});

ipcMain.handle("clipboard:read", () => clipboard.readText());

ipcMain.handle("net:fetchText", async (_e, url) => {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ShoaibDesktop/1.0",
      Accept: "*/*",
    },
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  return await res.text();
});

ipcMain.handle("net:fetchJson", async (_e, url) => {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ShoaibDesktop/1.0",
      Accept: "application/json",
    },
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
  return await res.json();
});

ipcMain.handle("shell:openPath", async (_e, target) => {
  const result = await shell.openPath(String(target));
  return { ok: !result, error: result || null };
});

ipcMain.handle("shell:runSafe", async (_e, commandKey) => {
  const map = {
    calculator:
      process.platform === "win32"
        ? "calc"
        : process.platform === "darwin"
          ? "open -a Calculator"
          : "gnome-calculator || kcalc || xcalc",
    terminal:
      process.platform === "win32"
        ? "start cmd"
        : process.platform === "darwin"
          ? "open -a Terminal"
          : "x-terminal-emulator || gnome-terminal || xterm",
    files:
      process.platform === "win32"
        ? "explorer ."
        : process.platform === "darwin"
          ? "open ."
          : "xdg-open .",
  };
  const cmd = map[commandKey];
  if (!cmd) return { ok: false, error: "Unknown command" };
  return await new Promise((resolve) => {
    exec(cmd, { shell: true }, (err) => {
      resolve({ ok: !err, error: err ? String(err.message) : null });
    });
  });
});
