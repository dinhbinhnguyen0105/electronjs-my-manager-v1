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
    ipcMain.on("navigate-to", (event, { page }) => {
        if(page.toLowerCase() === "robot-page") {
            mainWindow.loadFile(path.join(ROOT_DIR, "renderer", "src", "pages", "robot", "robot.html"));
        }
        else if(page.toLowerCase() === "store-page") {
            mainWindow.loadFile(path.join(ROOT_DIR, "renderer", "src", "pages", "store", "store.html"));
        }
    });

    mainWindow.webContents.once("did-finish-load", () => {
        mainWindow.webContents.send("message", { message : "Hello from main process" });
    });

    ipcMain.on("request-data", (event, args) => {
        if(args.page.toLowerCase() === "robot-page") {
            switch(args.content.toLowerCase()) {
                case "main-content":
                    event.sender.send("response-data", "response-data main-content from main process");
                    break;
                default: throw new Error("Invalid content");
            }
        }
        else if(args.page.toLowerCase() === "store-page") {}
    })
});

function initComponent(componentName) {
    sidebar store page ...
}