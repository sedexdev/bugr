const path = require("path");
const url = require("url");
const { app, BrowserWindow, ipcMain } = require("electron");

// python-shell linking functions
const {
    fetchProjectNames,
    loadProject,
    createProject,
    deleteProject,
    createGroup,
    deleteGroup,
    editGroupName,
    createIssue,
    deleteIssue,
    editIssue,
    setDate,
    setPriority,
    setStage,
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

/* ----------------- Project Level -----------------  */

ipcMain.on("project:load", (e, projectId) => {
    loadProject(projectId, (data) => {
        mainWindow.webContents.send("project:loaded", data);
    });
});

ipcMain.on("project:create", (e, projectName) => {
    createProject(projectName, (data) => {
        mainWindow.webContents.send("project:created", data);
    });
});

ipcMain.on("project:delete", (e, projectId) => {
    deleteProject(projectId);
});

/* ----------------- Group Level -----------------  */

ipcMain.on("group:create", (e, values) => {
    createGroup(
        values.projectName,
        values.projectId,
        values.groupName,
        (data) => {
            mainWindow.webContents.send("project:edited", data);
        }
    );
});

ipcMain.on("group:delete", (e, values) => {
    deleteGroup(values.projectId, values.groupId, (data) => {
        mainWindow.webContents.send("project:edited", data);
    });
});

ipcMain.on("group:edit", (e, values) => {
    editGroupName(
        values.projectId,
        values.groupId,
        values.groupName,
        (data) => {
            mainWindow.webContents.send("project:edited", data);
        }
    );
});

/* ----------------- Issue Level -----------------  */

ipcMain.on("issue:create", (e, values) => {
    console.log(values);
    createIssue(
        values.projectName,
        values.projectId,
        values.groupId,
        (data) => {
            mainWindow.webContents.send("project:edited", data);
        }
    );
});

ipcMain.on("issue:delete", (e, values) => {
    deleteIssue(values.projectId, values.groupId, values.issueId, (data) => {
        mainWindow.webContents.send("project:edited", data);
    });
});

ipcMain.on("issue:edit", (e, values) => {
    editIssue(
        values.projectId,
        values.groupId,
        values.issueId,
        values.description,
        (data) => {
            mainWindow.webContents.send("project:edited", data);
        }
    );
});

ipcMain.on("issue:set_date", (e, values) => {
    setDate(
        values.projectId,
        values.groupId,
        values.issueId,
        values.date,
        (data) => {
            mainWindow.webContents.send("project:edited", data);
        }
    );
});

ipcMain.on("issue:set_priority", (e, values) => {
    setPriority(
        values.projectId,
        values.groupId,
        values.issueId,
        values.priority,
        (data) => {
            mainWindow.webContents.send("project:edited", data);
        }
    );
});

ipcMain.on("issue:set_stage", (e, values) => {
    setStage(
        values.projectId,
        values.groupId,
        values.issueId,
        values.stage,
        (data) => {
            mainWindow.webContents.send("project:edited", data);
        }
    );
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
