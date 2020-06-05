import React, { useState, useEffect } from "react";

import IssueGroup from "../issue_group/IssueGroup";

import "./main.css";

const projectIssues = require("../../test_project_data/project_a.json");

const Main = () => {
    const [issueGroups, setIssueGroups] = useState([]);

    useEffect(() => {
        setIssueGroups(projectIssues["groups"]);
    }, []);

    return (
        <main className='main-application-container'>
            <h1 className='main-project-title'>{projectIssues.title}</h1>
            {issueGroups.length &&
                issueGroups.map((issueGroup) => {
                    return (
                        <IssueGroup
                            key={issueGroup.id}
                            title={issueGroup.title}
                            issues={issueGroup.issues}
                        />
                    );
                })}
        </main>
    );
};

export default Main;
