import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import DeletePopUp from "../delete/Delete";

import "./side_panel.css";

const project = require("../../test_project_data/project_a.json");

export const SidePanel = () => {
    const [showDeleteProject, setDeleteProject] = useState(false);

    return (
        <aside className='side-panel-container'>
            <div className='side-panel-heading-container'>
                <h1 className='panel-heading'>Project Panel</h1>
                <i
                    className='add-project fas fa-plus-circle'
                    title='New project'></i>
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

export default SidePanel;
