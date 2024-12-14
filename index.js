const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");
const fs = require("fs");
const ROOT_DIR = process.cwd();

function createMainWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(ROOT_DIR, "main", "preload.js"),
            contextIsolation: true,
            enableBlinkFeatures: false,
            nodeIntegration: false,
            devTools: true,
        },
    });
    win.loadFile(path.join(ROOT_DIR, "renderer", "index.html"));
    return win;
}

app.whenReady().then(() => {
    const mainWindow = createMainWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
    });
    app.on("window-all-closed", function () {
        if (process.platform !== "darwin") app.quit();
    });

});
