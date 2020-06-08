import React, { useState, useEffect } from "react";

import IssueGroup from "../issue_group/IssueGroup";

import "./main.css";

const projectIssues = require("../../test_project_data/project_a.json");

const Main = () => {
    const [issueGroups, setIssueGroups] = useState([]);
    const [showDeleteGroup, setDeleteGroup] = useState(false);
    const [showAddGroup, setAddGroup] = useState(false);
    const [groupName, setGroupName] = useState(false);
    const [showPriorities, setPriorities] = useState(false);
    const [showStages, setStages] = useState(false);
    const [showIssueOptions, setIssueOptions] = useState(false);
    const [showDateOptions, setDateOptions] = useState(false);

    useEffect(() => {
        setIssueGroups(projectIssues["groups"]);
    }, []);

    const onChangeGroupName = (e) => {
        setGroupName(e.target.value);
    };

    return (
        <main className='main-application-container'>
            <h1 className='main-project-title'>{projectIssues.title}</h1>
            {issueGroups.length &&
                issueGroups.map((issueGroup) => {
                    return (
                        <IssueGroup
                            key={issueGroup.id}
                            onChange={onChangeGroupName}
                            title={issueGroup.title}
                            issues={issueGroup.issues}
                            showDeleteGroup={showDeleteGroup}
                            setDeleteGroup={setDeleteGroup}
                            showAddGroup={showAddGroup}
                            setAddGroup={setAddGroup}
                            showPriorities={showPriorities}
                            setPriorities={setPriorities}
                            showStages={showStages}
                            setStages={setStages}
                            showIssueOptions={showIssueOptions}
                            setIssueOptions={setIssueOptions}
                            showDateOptions={showDateOptions}
                            setDateOptions={setDateOptions}
                        />
                    );
                })}
        </main>
    );
};

export default Main;
