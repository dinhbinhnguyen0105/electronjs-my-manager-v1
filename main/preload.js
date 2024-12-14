const { ipcRenderer, contextBridge} = require("electron");

contextBridge.exposeInMainWorld("electronAPIs", {
    send: (channel, data) => ipcRenderer.send(channel, data),
    receive: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(event, ...args)),
});

