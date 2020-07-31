import React, { useState, useEffect, useCallback } from "react";

import SidePanel from "./components/side_panel/SidePanel";
import Main from "./components/main/Main";

import "./App.css";

// const { fetchProjectNames } = require("../public/assets/js/send");
const electron = window.require("electron");

const App = () => {
    // Used to update the state of the application
    const [, updateState] = useState();

    // Side panel component state
    const [projectNames, setProjectNames] = useState([]);
    const [showDeleteProject, setDeleteProject] = useState("");
    const [projectLinkId, setProjectLinkId] = useState("");
    const [showAddProject, setAddProject] = useState("");
    const [projectName, setProjectName] = useState("");

    // Main component state
    const [currentData, setCurrentData] = useState(null);
    const [deleteGroupId, setDeleteGroupId] = useState("");
    const [addGroupId, setAddGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [prioritiesId, setPrioritiesId] = useState("");
    const [stagesId, setStagesId] = useState("");
    const [issueOptionsId, setIssueOptionsId] = useState("");
    const [dateOptionsId, setDateOptionsId] = useState("");

    const updateAppState = useCallback(() => {
        setTimeout(() => {
            setProjectNames(Object.keys(localStorage));
            const data = localStorage.getItem("currentData");
            if (data) {
                setCurrentData(JSON.parse(data));
            }
            updateState({});
        }, 1000);
    }, []);

    useEffect(() => {
        document.title = "Bugr";

        electron.ipcRenderer.on("project:load_names", (e, projectNames) => {
            processProjectNames(projectNames);
        });

        electron.ipcRenderer.on("project:loaded", (e, projectData) => {
            localStorage.setItem("currentData", JSON.parse(projectData));
        });

        electron.ipcRenderer.on("project:created", (e, projectData) => {
            const data = JSON.parse(projectData);
            localStorage.setItem(data.project_name, data.project_id);
            localStorage.setItem("currentData", projectData);
        });

        electron.ipcRenderer.on("group:created", (e, projectData) => {
            localStorage.setItem("currentData", projectData);
        });

        if (localStorage.getItem("currentData")) {
            setCurrentData(JSON.parse(localStorage.getItem("currentData")));
        }

        if (Object.keys(localStorage)) {
            setProjectNames(Object.keys(localStorage));
        }
    }, []);

    /* -------------------- UI Functions -------------------- */

    const processProjectNames = (projectNames) => {
        if (projectNames) {
            for (let key in projectNames) {
                localStorage.setItem(key, projectNames[key]);
            }
        }
    };

    const checkStorage = () => {
        const data = localStorage.getItem("currentData");
        if (!data) {
            let projectId;
            const keys = Object.keys(localStorage);
            for (let key of keys) {
                projectId = localStorage.getItem(key);
            }
            if (projectId) {
                loadProject(projectId);
            }
            return true;
        }
        return true;
    };

    /* -------------------- Project Level Functions -------------------- */

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

    // Need to handle what happens to currentData object if
    // it is deleted as part of a project deletion event
    const deleteProject = (projectId) => {
        if (projectId) {
            electron.ipcRenderer.send("project:delete", projectId);
        } else {
            console.log("Error, project ID must be supplied");
        }
    };

    /* -------------------- Group Level Functions -------------------- */

    const createGroup = (values) => {
        if (values.groupName) {
            electron.ipcRenderer.send("group:create", values);
        } else {
            console.log("Error, group name must be supplied");
        }
    };

    /* -------------------- Issue Level Functions -------------------- */

    return (
        <div className='App'>
            <SidePanel
                projectNames={projectNames}
                setProjectNames={setProjectNames}
                showDeleteProject={showDeleteProject}
                setDeleteProject={setDeleteProject}
                projectLinkId={projectLinkId}
                setProjectLinkId={setProjectLinkId}
                showAddProject={showAddProject}
                setAddProject={setAddProject}
                projectName={projectName}
                setProjectName={setProjectName}
                checkStorage={checkStorage}
                updateAppState={updateAppState}
                createProject={createProject}
                deleteProject={deleteProject}
                loadProject={loadProject}
            />
            <Main
                projectNames={projectNames}
                currentData={currentData}
                setCurrentData={setCurrentData}
                deleteGroupId={deleteGroupId}
                setDeleteGroupId={setDeleteGroupId}
                addGroupId={addGroupId}
                setAddGroupId={setAddGroupId}
                groupName={groupName}
                setGroupName={setGroupName}
                prioritiesId={prioritiesId}
                setPrioritiesId={setPrioritiesId}
                stagesId={stagesId}
                setStagesId={setStagesId}
                issueOptionsId={issueOptionsId}
                setIssueOptionsId={setIssueOptionsId}
                dateOptionsId={dateOptionsId}
                setDateOptionsId={setDateOptionsId}
                updateAppState={updateAppState}
                createGroup={createGroup}
                loadProject={loadProject}
            />
        </div>
    );
};

export default App;
