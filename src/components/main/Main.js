import React, { Fragment } from "react";

import IssueGroup from "../issue_group/IssueGroup";

import PropTypes from "prop-types";

import "./main.css";

const Main = ({
    currentData,
    deleteGroupId,
    setDeleteGroupId,
    addGroupId,
    setAddGroupId,
    groupName,
    setGroupName,
    prioritiesId,
    setPrioritiesId,
    stagesId,
    setStagesId,
    issueOptionsId,
    setIssueOptionsId,
    dateOptionsId,
    setDateOptionsId,
    updateAppState,
    createGroup,
}) => {
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
                                onClick={() => {
                                    createGroup({
                                        projectName: currentData.project_name,
                                        projectId: currentData.project_id,
                                        groupName,
                                    });
                                    updateAppState();
                                }}
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
    currentData: PropTypes.object,
    deleteGroupId: PropTypes.string,
    setDeleteGroupId: PropTypes.func,
    addGroupId: PropTypes.string,
    setAddGroupId: PropTypes.func,
    groupName: PropTypes.string,
    setGroupName: PropTypes.func,
    prioritiesId: PropTypes.string,
    setPrioritiesId: PropTypes.func,
    stagesId: PropTypes.string,
    setStagesId: PropTypes.func,
    issueOptionsId: PropTypes.string,
    setIssueOptionsId: PropTypes.func,
    dateOptionsId: PropTypes.string,
    setDateOptionsId: PropTypes.func,
    updateAppState: PropTypes.func.isRequired,
    createGroup: PropTypes.func.isRequired,
};

export default Main;
