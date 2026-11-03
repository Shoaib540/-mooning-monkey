const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("stonicDesktop", {
  minimize: () => ipcRenderer.invoke("window:minimize"),
  maximize: () => ipcRenderer.invoke("window:maximize"),
  close: () => ipcRenderer.invoke("window:close"),
  openExternal: (url) => ipcRenderer.invoke("shell:openExternal", url),
  getVersion: () => ipcRenderer.invoke("app:getVersion"),
  onHotkey: (cb) => {
    const handler = (_event, action) => cb(action);
    ipcRenderer.on("stonic:hotkey", handler);
    return () => ipcRenderer.removeListener("stonic:hotkey", handler);
  },
  isDesktop: true,
});
