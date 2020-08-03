import React from "react";

import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";
import Stats from "./Stats";

import PropTypes from "prop-types";

import "./side_panel.css";

export const SidePanel = ({
    projectNames,
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
    statusData,
}) => {
    const onChange = (e) => {
        setProjectName(e.target.value);
    };

    const sortProjectNames = (projectNames) => {
        projectNames.sort();
        return projectNames;
    };

    return (
        <aside className='side-panel-container'>
            <section className='side-panel-heading-container'>
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
            </section>
            <section className='project-list-container'>
                {projectNames &&
                    sortProjectNames(projectNames).map((key) => {
                        const value = localStorage.getItem(key);
                        return key !== "currentData" ? (
                            <div key={value} className='project-link'>
                                <p
                                    className='project-link-title'
                                    onClick={() => {
                                        loadProject(value);
                                        updateAppState();
                                    }}>
                                    {key}
                                </p>
                                <div></div>
                                <div className='delete-project-button'>
                                    <i
                                        className='delete-project fas fa-times-circle'
                                        id={value}
                                        title='Delete project'
                                        onClick={() => {
                                            setDeleteProject("display");
                                            setProjectLinkId(value);
                                        }}></i>
                                    {value === projectLinkId &&
                                        showDeleteProject && (
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
                                                        currentData.project_name ===
                                                        key
                                                    ) {
                                                        localStorage.removeItem(
                                                            "currentData"
                                                        );
                                                    }
                                                    localStorage.removeItem(
                                                        key
                                                    );
                                                    deleteProject(
                                                        projectLinkId
                                                    );
                                                    checkStorage();
                                                    updateAppState();
                                                }}
                                            />
                                        )}
                                </div>
                            </div>
                        ) : null;
                    })}
            </section>
            <section className='project-stats-container'>
                <Stats title='Stages' stats={statusData.stages} />
                <Stats title='Priorities' stats={statusData.priorities} />
            </section>
        </aside>
    );
};

SidePanel.propTypes = {
    projectNames: PropTypes.array,
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
    statusData: PropTypes.object,
};

export default SidePanel;
