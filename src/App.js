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
    const [editGroupId, setEditGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [issueDescription, setIssueDescription] = useState("");
    const [issueCompletion, setIssueCompletion] = useState("");
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
        }, 500);
    }, []);

    useEffect(() => {
        document.title = "Bugr";

        electron.ipcRenderer.on("project:load_names", (e, projectNames) => {
            if (projectNames) {
                let firstProjectId;
                for (let key in projectNames) {
                    localStorage.setItem(key, projectNames[key]);
                    if (!firstProjectId) {
                        firstProjectId = projectNames[key];
                    }
                }
                if (!localStorage.getItem("currentData")) {
                    loadProject(firstProjectId);
                    updateAppState();
                }
            }
        });

        electron.ipcRenderer.on("project:loaded", (e, projectData) => {
            localStorage.setItem("currentData", JSON.parse(projectData));
            updateAppState();
        });

        electron.ipcRenderer.on("project:created", (e, projectData) => {
            const data = JSON.parse(projectData);
            localStorage.setItem(data.project_name, data.project_id);
            localStorage.setItem("currentData", projectData);
        });

        electron.ipcRenderer.on("project:edited", (e, projectData) => {
            localStorage.setItem("currentData", projectData);
        });

        if (localStorage.getItem("currentData")) {
            const data = localStorage.getItem("currentData");
            setCurrentData(JSON.parse(data));
        }

        if (Object.keys(localStorage)) {
            setProjectNames(Object.keys(localStorage));
        }
    }, [updateAppState]);

    /* -------------------- UI Functions -------------------- */

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
            console.log("Error, project ID must be supplied");
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

    /* -------------------- Group Level Functions -------------------- */

    const createGroup = (values) => {
        if (values.groupName) {
            electron.ipcRenderer.send("group:create", values);
        } else {
            console.log("Error, group name must be supplied");
        }
    };

    const deleteGroup = (values) => {
        if (values) {
            electron.ipcRenderer.send("group:delete", values);
        } else {
            console.log("Error, project and group IDs must be supplied");
        }
    };

    const editGroupName = (values) => {
        if (values) {
            electron.ipcRenderer.send("group:edit", values);
        } else {
            console.log(
                "Error, project and group IDs and a group name must be supplied"
            );
        }
    };

    /* -------------------- Issue Level Functions -------------------- */

    const createIssue = (values) => {
        if (values) {
            electron.ipcRenderer.send("issue:create", values);
        } else {
            console.log(
                "Error, project name and project and group IDs must be supplied"
            );
        }
    };

    const deleteIssue = (values) => {
        if (values) {
            electron.ipcRenderer.send("issue:delete", values);
        } else {
            console.log(
                "Error, project name and project, group and issue IDs must be supplied"
            );
        }
    };

    const editIssue = (values) => {
        if (values.description) {
            electron.ipcRenderer.send("issue:edit", values);
        } else {
            console.log(
                "Error, project name and project, group and issue IDs and an issue description must be supplied"
            );
        }
    };

    const setDate = (values) => {
        if (values.date) {
            electron.ipcRenderer.send("issue:set_date", values);
        } else {
            console.log(
                "Error, project name and project, group and issue IDs and an issue date must be supplied"
            );
        }
    };

    const setPriority = (values) => {
        if (values) {
            electron.ipcRenderer.send("issue:set_priority", values);
        } else {
            console.log(
                "Error, project name and project, group and issue IDs and an issue priority must be supplied"
            );
        }
    };

    const setStage = (values) => {
        if (values) {
            electron.ipcRenderer.send("issue:set_stage", values);
        } else {
            console.log(
                "Error, project name and project, group and issue IDs and an issue stage must be supplied"
            );
        }
    };

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
                deleteGroupId={deleteGroupId}
                setDeleteGroupId={setDeleteGroupId}
                addGroupId={addGroupId}
                setAddGroupId={setAddGroupId}
                editGroupId={editGroupId}
                setEditGroupId={setEditGroupId}
                groupName={groupName}
                setGroupName={setGroupName}
                issueDescription={issueDescription}
                setIssueDescription={setIssueDescription}
                issueCompletion={issueCompletion}
                setIssueCompletion={setIssueCompletion}
                prioritiesId={prioritiesId}
                setPrioritiesId={setPrioritiesId}
                stagesId={stagesId}
                setStagesId={setStagesId}
                issueOptionsId={issueOptionsId}
                setIssueOptionsId={setIssueOptionsId}
                dateOptionsId={dateOptionsId}
                setDateOptionsId={setDateOptionsId}
                updateAppState={updateAppState}
                loadProject={loadProject}
                createGroup={createGroup}
                deleteGroup={deleteGroup}
                editGroupName={editGroupName}
                createIssue={createIssue}
                deleteIssue={deleteIssue}
                editIssue={editIssue}
                setDate={setDate}
                setPriority={setPriority}
                setStage={setStage}
            />
        </div>
    );
};

export default App;
