const { ipcRenderer, contextBridge} = require("electron");

contextBridge.exposeInMainWorld("electronAPIs", {
    send: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    receive: (channel, func) => {
        ipcRenderer.on(channel, (event, ...args) => {
            console.log(event, args);
            return func(event, ...args);
        });
    },
    requestComponent: componentName => {
        return ipcRenderer.send("request-component", componentName);
    },
    receiveComponent: func => {
        ipcRenderer.on("response-component", (event, ...args) => {
            // console.log("preload: ", ...args);
            const sidebarElm = document.createElement("div");
            sidebarElm.innerHTML = args[0];
            document.body.appendChild(sidebarElm);
            return func(...args);
        });
    }
});

