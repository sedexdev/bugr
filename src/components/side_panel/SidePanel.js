import React, { useState, useEffect, useRef, useCallback } from "react";

import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";

import PropTypes from "prop-types";

import "./side_panel.css";

export const SidePanel = ({ loadProject, createProject, deleteProject }) => {
    const [, updateState] = useState();
    const [projectNamesIds, setProjectNamesIds] = useState([]);
    const [showDeleteProject, setDeleteProject] = useState(false);
    const [projectLinkId, setProjectLinkId] = useState("");
    const [showAddProject, setAddProject] = useState(false);
    const [projectName, setProjectName] = useState("");

    const forceUpdatePanel = useCallback(() => {
        setTimeout(() => {
            setProjectNamesIds(Object.keys(localStorage));
            updateState({});
        }, 1000);
    }, []);

    useEffect(() => {
        if (Object.keys(localStorage)) {
            setProjectNamesIds(Object.keys(localStorage));
        }
    }, []);

    const onChange = (e) => {
        setProjectName(e.target.value);
    };

    return (
        <aside className='side-panel-container'>
            <div className='side-panel-heading-container'>
                <h1 className='panel-heading'>Project Panel</h1>
                <i
                    className='add-project fas fa-plus-circle'
                    title='New project'
                    onClick={() => setAddProject(true)}></i>
                {showAddProject && (
                    <AddPopUp
                        placeholder='Project name...'
                        name='projectName'
                        onChange={onChange}
                        revealFunc={setAddProject}
                        onClick={() => {
                            createProject(projectName);
                            forceUpdatePanel();
                        }}
                    />
                )}
            </div>
            <div className='project-list-container'>
                {projectNamesIds &&
                    projectNamesIds.map((key) => {
                        const value = localStorage.getItem(key);
                        return key !== "currentData" ? (
                            <div key={value} className='project-link'>
                                <p className='project-link-title'>{key}</p>
                                <i
                                    className='delete-project fas fa-times-circle'
                                    id={value}
                                    title='Delete project'
                                    onClick={() => {
                                        setDeleteProject(true);
                                        setProjectLinkId(value);
                                    }}></i>
                                {value === projectLinkId && showDeleteProject && (
                                    <DeletePopUp
                                        title={key}
                                        revealFunc={setDeleteProject}
                                        onClick={() => {
                                            const currentData = JSON.parse(
                                                localStorage.getItem(
                                                    "currentData"
                                                )
                                            );
                                            if (
                                                currentData.project_name === key
                                            ) {
                                                localStorage.removeItem(
                                                    "currentData"
                                                );
                                            }
                                            localStorage.removeItem(key);
                                            deleteProject(projectLinkId);
                                            forceUpdatePanel();
                                        }}
                                    />
                                )}
                            </div>
                        ) : null;
                    })}
            </div>
        </aside>
    );
};

SidePanel.propTypes = {
    loadProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
};

export default SidePanel;
