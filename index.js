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
    ipcMain.on("request-page", (event, componentName) => {
        const responsePage = {};
        const pageDir = path.join(ROOT_DIR, "main", "pages");
        switch(componentName.toLowerCase()) {
            case "store":
                const storePageDir = path.join(pageDir, "store");
                responsePage.html = fs.readFileSync(path.join(storePageDir, "store.html"), "utf-8");
                responsePage.js = fs.readFileSync(path.join(storePageDir, "store.js"), "utf-8");
                responsePage.css = fs.readFileSync(path.join(storePageDir, "store.css"), "utf-8");
                break;
            case "robot":
                const robotPageDir = path.join(pageDir, "robot");
                responsePage.html = fs.readFileSync(path.join(robotPageDir, "robot.html"), "utf-8");
                responsePage.js = fs.readFileSync(path.join(robotPageDir, "robot.js"), "utf-8");
                responsePage.css = fs.readFileSync(path.join(robotPageDir, "robot.css"), "utf-8");
                break;

            default: throw new Error("Invalid component name");
        }
        event.sender.send("response-page", responsePage);
    })
});
