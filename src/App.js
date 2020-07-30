import React, { useEffect } from "react";

import SidePanel from "./components/side_panel/SidePanel";
import Main from "./components/main/Main";

import "./App.css";

// const { fetchProjectNames } = require("../public/assets/js/send");
const electron = window.require("electron");

const processProjectNames = (projectNames) => {
    if (projectNames) {
        for (let key in projectNames) {
            localStorage.setItem(key, projectNames[key]);
        }
    }
};

const App = () => {
    useEffect(() => {
        document.title = "Bugr";

        electron.ipcRenderer.on("project:load_names", (e, projectNames) => {
            processProjectNames(projectNames);
        });

        electron.ipcRenderer.on("project:loaded", (e, projectData) => {
            localStorage.setItem("currentData", projectData);
        });

        electron.ipcRenderer.on("project:created", (e, projectData) => {
            const data = JSON.parse(projectData);
            localStorage.setItem(data.project_name, data.project_id);
            localStorage.setItem("currentData", projectData);
        });

        electron.ipcRenderer.on("group:created", (e, projectData) => {
            localStorage.setItem("currentData", projectData);
        });
    }, []);

    const loadProject = (projectId) => {
        if (projectId) {
            electron.ipcRenderer.send("project:load", projectId);
        } else {
            console.log("Error, project name must be supplied");
        }
    };

    const createProject = (projectName) => {
        if (projectName) {
            electron.ipcRenderer.send("project:create", projectName);
        } else {
            console.log("Error, project name must be supplied");
        }
    };

    const deleteProject = (projectId) => {
        if (projectId) {
            electron.ipcRenderer.send("project:delete", projectId);
        } else {
            console.log("Error, project ID must be supplied");
        }
    };

    const createGroup = (values) => {
        if (values.groupName) {
            electron.ipcRenderer.send("group:create", values);
        } else {
            console.log("Error, group name must be supplied");
        }
    };

    return (
        <div className='App'>
            <SidePanel
                createProject={createProject}
                deleteProject={deleteProject}
                loadProject={loadProject}
            />
            <Main createGroup={createGroup} loadProject={loadProject} />
        </div>
    );
};

export default App;
