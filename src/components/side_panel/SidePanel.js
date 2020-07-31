import React from "react";

import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";

import PropTypes from "prop-types";

import "./side_panel.css";

export const SidePanel = ({
    projectNamesIds,
    showDeleteProject,
    setDeleteProject,
    projectLinkId,
    setProjectLinkId,
    showAddProject,
    setAddProject,
    projectName,
    setProjectName,
    updateAppState,
    checkStorage,
    loadProject,
    createProject,
    deleteProject,
}) => {
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
                    onClick={() => setAddProject("display")}></i>
                {showAddProject && (
                    <AddPopUp
                        placeholder='Project name...'
                        name='projectName'
                        onChange={onChange}
                        revealFunc={setAddProject}
                        onClick={() => {
                            createProject(projectName);
                            updateAppState();
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
                                        setDeleteProject("display");
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
                                            const checked = checkStorage();
                                            if (checked) {
                                                updateAppState();
                                            }
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
    projectNamesIds: PropTypes.array,
    showDeleteProject: PropTypes.string,
    setDeleteProject: PropTypes.func,
    projectLinkId: PropTypes.string,
    setProjectLinkId: PropTypes.func,
    showAddProject: PropTypes.string,
    setAddProject: PropTypes.func,
    projectName: PropTypes.string,
    setProjectName: PropTypes.func,
    checkStorage: PropTypes.func,
    loadProject: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
};

export default SidePanel;
