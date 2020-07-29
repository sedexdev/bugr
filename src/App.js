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

        electron.ipcRenderer.send(
            "project:load",
            // Make this dynamic
            localStorage.getItem("CoScript")
        );

        electron.ipcRenderer.on("project:loaded", (e, projectData) => {
            if (projectData) {
                localStorage.setItem("currentData", projectData);
            }
        });
    }, []);

    const createProject = (projectName) => {
        if (projectName) {
            electron.ipcRenderer.send("project:create", { projectName });

            /*
                Think of a way to load on fresh data instantly when new projects are created
            */

            // fetchProjectNames((data) => processProjectNames(data));
        } else {
            console.log("Error, project name must be supplied");
        }
    };

    const createGroup = (groupName) => {
        if (groupName) {
            const projectName = localStorage.getItem("projectName");
            const projectId = localStorage.getItem("projectId");
            electron.ipcRenderer.send("group:create", {
                projectName,
                groupName,
                projectId,
            });
        } else {
            console.log("Error, group name must be supplied");
        }
    };

    return (
        <div className='App'>
            <SidePanel createProject={createProject} />
            <Main createGroup={createGroup} />
        </div>
    );
};

export default App;
