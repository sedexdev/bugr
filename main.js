const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain } = require("electron");

// python-shell linking functions
const {
    fetchProjectNames,
    loadProject,
    createProject,
    createGroup,
} = require("./public/assets/js/send");

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV === "development";

let mainWindow;

function createMainWindow() {
    // Create a new BrowserWindow instance
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 800,
        backgroundColor: "white",
        icon: path.join(__dirname, "public", "assets", "icons", "bug.png"),
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Set the loadURL based on whether we are in dev or prod (set in package.json)
    mainWindow.loadURL(
        process.env.ELECTRON_START_URL ||
            url.format({
                pathname: path.join(__dirname, "build", "/index.html"),
                protocol: "file",
                slashes: true,
            })
    );

    // Open dev tools if in dev environment
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    // Set mainWindow to null on close
    mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", () => {
    createMainWindow();

    // IPC Initial Data Load
    fetchProjectNames((data) => {
        // must wait for the mainWindow to finish loading before sending data
        mainWindow.webContents.on("did-finish-load", () => {
            // parse the data that was sent from the python script
            mainWindow.webContents.send("project:load_names", JSON.parse(data));
        });
    });
});

/* 
===================================================
               IPC Event Listeners
===================================================
*/

ipcMain.on("project:load", (e, projectId) => {
    loadProject(projectId, (data) => {
        // must wait for the mainWindow to finish loading before sending data
        mainWindow.webContents.on("did-finish-load", () => {
            // parse the data that was sent from the python script
            mainWindow.webContents.send("project:loaded", JSON.parse(data));
        });
    });
});

ipcMain.on("project:create", (e, values) => {
    createProject(values.projectName);
});

ipcMain.on("group:create", (e, values) => {
    createGroup(values.projectName, values.groupName, values.projectId);
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createMainWindow();
    }
});
