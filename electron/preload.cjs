const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("shoaibDesktop", {
  minimize: () => ipcRenderer.invoke("window:minimize"),
  maximize: () => ipcRenderer.invoke("window:maximize"),
  close: () => ipcRenderer.invoke("window:close"),
  openExternal: (url) => ipcRenderer.invoke("shell:openExternal", url),
  openPath: (target) => ipcRenderer.invoke("shell:openPath", target),
  runSafe: (commandKey) => ipcRenderer.invoke("shell:runSafe", commandKey),
  getVersion: () => ipcRenderer.invoke("app:getVersion"),
  getSystemInfo: () => ipcRenderer.invoke("system:info"),
  writeClipboard: (text) => ipcRenderer.invoke("clipboard:write", text),
  readClipboard: () => ipcRenderer.invoke("clipboard:read"),
  fetchText: (url) => ipcRenderer.invoke("net:fetchText", url),
  fetchJson: (url) => ipcRenderer.invoke("net:fetchJson", url),
  onHotkey: (cb) => {
    const handler = (_event, action) => cb(action);
    ipcRenderer.on("shoaib:hotkey", handler);
    return () => ipcRenderer.removeListener("shoaib:hotkey", handler);
  },
  isDesktop: true,
});
