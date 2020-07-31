import React, { Fragment } from "react";

import IssueGroup from "../issue_group/IssueGroup";

import PropTypes from "prop-types";

import "./main.css";

const Main = ({
    projectNames,
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
    deleteGroup,
    createIssue,
    deleteIssue,
    editIssue,
    setDate,
    setPriority,
    setStage,
}) => {
    const onChangeGroupName = (e) => {
        setGroupName(e.target.value);
    };

    const getOptions = (data, id) => {
        for (let group of data.groups) {
            if (group.group_id === id) {
                return group.issues.length === 1
                    ? ["New Issue", "Edit", "Notes"]
                    : ["New Issue", "Edit", "Delete", "Notes"];
            }
        }
    };

    const bugrIcon = require("../../images/bug.png");

    return (
        <main className='main-application-container'>
            {currentData && projectNames.length ? (
                <Fragment>
                    <h1 className='main-project-title'>
                        {currentData.project_name}
                    </h1>
                    {currentData.groups.map((issueGroup) => {
                        return (
                            <IssueGroup
                                key={issueGroup.group_id}
                                currentData={currentData}
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
                                updateAppState={updateAppState}
                                createGroup={() => {
                                    createGroup({
                                        projectName: currentData.project_name,
                                        projectId: currentData.project_id,
                                        groupName,
                                    });
                                    updateAppState();
                                }}
                                deleteGroup={deleteGroup}
                                createIssue={createIssue}
                                deleteIssue={deleteIssue}
                                editIssue={editIssue}
                                setDate={setDate}
                                setPriority={setPriority}
                                setStage={setStage}
                                options={getOptions(
                                    currentData,
                                    issueGroup.group_id
                                )}
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
    projectNames: PropTypes.array,
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
    updateAppState: PropTypes.func,
    createGroup: PropTypes.func,
    deleteGroup: PropTypes.func,
    createIssue: PropTypes.func,
    deleteIssue: PropTypes.func,
    editIssue: PropTypes.func,
    setDate: PropTypes.func,
    setPriority: PropTypes.func,
    setStage: PropTypes.func,
};

export default Main;
