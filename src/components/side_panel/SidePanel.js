import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";

import PropTypes from "prop-types";

import "./side_panel.css";

const project = require("../../test_project_data/project_a.json");

export const SidePanel = ({ createProject }) => {
    const [showDeleteProject, setDeleteProject] = useState(false);
    const [showAddProject, setAddProject] = useState(false);
    const [projectName, setProjectName] = useState("");

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
                        onClick={() => createProject(projectName)}
                    />
                )}
            </div>
            <div className='project-list-container'>
                <div className='project-link'>
                    <Router>
                        <Link to='#'>{project.title}</Link>
                    </Router>
                    <i
                        className='delete-project fas fa-times-circle'
                        id={project.title}
                        title='Delete project'
                        onClick={() => setDeleteProject(true)}></i>
                    {showDeleteProject && (
                        <DeletePopUp
                            title={project.title}
                            revealFunc={setDeleteProject}
                        />
                    )}
                </div>
            </div>
        </aside>
    );
};

SidePanel.propTypes = {
    createProject: PropTypes.func.isRequired,
};

export default SidePanel;
