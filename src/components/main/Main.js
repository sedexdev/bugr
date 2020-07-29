import React, { useState, useEffect } from "react";

import IssueGroup from "../issue_group/IssueGroup";

import PropTypes from "prop-types";

import "./main.css";

const projectIssues = require("../../test_project_data/project_a.json");

const Main = ({ createGroup }) => {
    const [issueGroups, setIssueGroups] = useState([]);
    const [deleteGroupId, setDeleteGroupId] = useState("");
    const [addGroupId, setAddGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [prioritiesId, setPrioritiesId] = useState("");
    const [stagesId, setStagesId] = useState("");
    const [issueOptionsId, setIssueOptionsId] = useState("");
    const [dateOptionsId, setDateOptionsId] = useState("");

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
                            issueGroupId={issueGroup.id}
                            setAddGroupId={setAddGroupId}
                            currentAddGroupId={addGroupId}
                            setDeleteGroupId={setDeleteGroupId}
                            currentDeleteGroupId={deleteGroupId}
                            onChange={onChangeGroupName}
                            title={issueGroup.title}
                            issues={issueGroup.issues}
                            prioritiesId={prioritiesId}
                            setPrioritiesId={setPrioritiesId}
                            stagesId={stagesId}
                            setStagesId={setStagesId}
                            issueOptionsId={issueOptionsId}
                            setIssueOptionsId={setIssueOptionsId}
                            dateOptionsId={dateOptionsId}
                            setDateOptionsId={setDateOptionsId}
                            onClick={() => createGroup(groupName)}
                        />
                    );
                })}
        </main>
    );
};

Main.propTypes = {
    createGroup: PropTypes.func.isRequired,
};

export default Main;
