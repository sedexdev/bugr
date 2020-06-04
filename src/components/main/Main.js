import React, { useState, useEffect } from "react";

import IssueGroup from "../issue_group/IssueGroup";

import "./main.css";

const projectIssues = require("../../test_project_data/project_a.json");

const Main = () => {
    const [issueGroups, setIssueGroups] = useState([]);

    useEffect(() => {
        setIssueGroups(projectIssues["Project A"]);
    }, []);

    return (
        <main className='main-application-container'>
            {issueGroups &&
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
