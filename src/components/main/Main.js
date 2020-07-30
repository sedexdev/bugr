import React, { Fragment, useState, useEffect } from "react";

import IssueGroup from "../issue_group/IssueGroup";

import PropTypes from "prop-types";

import "./main.css";

const Main = ({ createGroup }) => {
    const [currentData, setCurrentData] = useState(null);
    const [deleteGroupId, setDeleteGroupId] = useState("");
    const [addGroupId, setAddGroupId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [prioritiesId, setPrioritiesId] = useState("");
    const [stagesId, setStagesId] = useState("");
    const [issueOptionsId, setIssueOptionsId] = useState("");
    const [dateOptionsId, setDateOptionsId] = useState("");

    useEffect(() => {
        if (localStorage.getItem("currentData")) {
            setCurrentData(JSON.parse(localStorage.getItem("currentData")));
        }
    }, []);

    const onChangeGroupName = (e) => {
        setGroupName(e.target.value);
    };

    const bugrIcon = require("../../images/bug.png");

    return (
        <main className='main-application-container'>
            {currentData ? (
                <Fragment>
                    <h1 className='main-project-title'>
                        {currentData.project_name}
                    </h1>
                    {currentData.groups.map((issueGroup) => {
                        return (
                            <IssueGroup
                                key={issueGroup.group_id}
                                issueGroupId={issueGroup.group_id}
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
                                onClick={() =>
                                    createGroup({
                                        projectName: currentData.project_name,
                                        projectId: currentData.project_id,
                                        groupName,
                                    })
                                }
                            />
                        );
                    })}
                </Fragment>
            ) : (
                <div className='welcome-message'>
                    <img
                        className='bugr-icon-main'
                        src={bugrIcon}
                        alt='Loading'
                    />
                    <p>
                        Welcome to Bugr! This app has been designed to make
                        tracking issues in your application development cycle
                        clean and simple.
                    </p>
                    <p>Use the Project Panel on the left to get started!</p>
                </div>
            )}
        </main>
    );
};

Main.propTypes = {
    createGroup: PropTypes.func.isRequired,
};

export default Main;
