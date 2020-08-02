import React from "react";

import Issue from "../issue/Issue";
import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";

import PropTypes from "prop-types";

import "./issue_group.css";

export const IssueGroup = ({
    issueGroupId,
    onChangeGroupName,
    currentData,
    setAddGroupId,
    currentAddGroupId,
    setDeleteGroupId,
    currentDeleteGroupId,
    setEditGroupId,
    currentEditGroupId,
    onChange,
    title,
    issues,
    prioritiesId,
    setPrioritiesId,
    stagesId,
    setStagesId,
    issueOptionsId,
    setIssueOptionsId,
    dateOptionsId,
    setDateOptionsId,
    issueDescription,
    setIssueDescription,
    issueCompletion,
    setIssueCompletion,
    updateAppState,
    createGroup,
    deleteGroup,
    editGroupName,
    createIssue,
    deleteIssue,
    editIssue,
    setDate,
    setPriority,
    setStage,
    options,
}) => {
    return (
        <section className='issue-group-container'>
            <div className='issue-group-title-container'>
                <h2 className='issue-group-title'>{title}</h2>
                <div className='group-options-container'>
                    <i
                        className='add-group fas fa-plus-circle'
                        title='Add group'
                        onClick={() => {
                            setAddGroupId(issueGroupId);
                            setDeleteGroupId("");
                            setEditGroupId("");
                        }}></i>
                    <i
                        className='delete-group fas fa-times-circle'
                        title='Delete group'
                        onClick={() => {
                            setDeleteGroupId(issueGroupId);
                            setAddGroupId("");
                            setEditGroupId("");
                        }}></i>
                    <i
                        className='edit-group fas fa-pencil-alt'
                        title='Edit group name'
                        onClick={() => {
                            setEditGroupId(issueGroupId);
                            setDeleteGroupId("");
                            setAddGroupId("");
                        }}></i>
                </div>
                {currentAddGroupId === issueGroupId && (
                    <AddPopUp
                        extraClasses='group-add-position'
                        placeholder='Group name...'
                        name='groupName'
                        onChange={onChange}
                        revealFunc={setAddGroupId}
                        onClick={createGroup}
                        updateAppState={updateAppState}
                    />
                )}
                {currentDeleteGroupId === issueGroupId && (
                    <DeletePopUp
                        title={title}
                        extraClasses='group-delete-position'
                        revealFunc={setDeleteGroupId}
                        onClick={() => {
                            deleteGroup({
                                projectId: currentData.project_id,
                                groupId: currentDeleteGroupId,
                            });
                            updateAppState();
                        }}
                    />
                )}
                {currentEditGroupId === issueGroupId && (
                    <AddPopUp
                        extraClasses='group-add-position'
                        placeholder='New group name...'
                        name='groupName'
                        onChange={onChangeGroupName}
                        revealFunc={setEditGroupId}
                        onClick={editGroupName}
                        updateAppState={updateAppState}
                    />
                )}
            </div>
            <div className='issue-box'>
                {issues &&
                    issues.map((issue) => {
                        return (
                            <Issue
                                key={issue.issue_id}
                                currentData={currentData}
                                issueId={issue.issue_id}
                                description={issue.description}
                                completion={issue.finish_by}
                                priority={issue.priority}
                                stage={issue.stage}
                                prioritiesId={prioritiesId}
                                setPrioritiesId={setPrioritiesId}
                                stagesId={stagesId}
                                setStagesId={setStagesId}
                                issueOptionsId={issueOptionsId}
                                setIssueOptionsId={setIssueOptionsId}
                                dateOptionsId={dateOptionsId}
                                setDateOptionsId={setDateOptionsId}
                                issueDescription={issueDescription}
                                setIssueDescription={setIssueDescription}
                                issueCompletion={issueCompletion}
                                setIssueCompletion={setIssueCompletion}
                                createIssue={createIssue}
                                deleteIssue={deleteIssue}
                                editIssue={editIssue}
                                setDate={setDate}
                                setPriority={setPriority}
                                setStage={setStage}
                                issueGroupId={issueGroupId}
                                updateAppState={updateAppState}
                                options={options}
                            />
                        );
                    })}
            </div>
        </section>
    );
};

IssueGroup.propTypes = {
    issueGroupId: PropTypes.string,
    onChangeGroupName: PropTypes.func,
    currentData: PropTypes.object,
    setAddGroupId: PropTypes.func,
    currentAddGroupId: PropTypes.string,
    setDeleteGroupId: PropTypes.func,
    currentDeleteGroupId: PropTypes.string,
    setEditGroupId: PropTypes.func,
    currentEditGroupId: PropTypes.string,
    onChange: PropTypes.func,
    title: PropTypes.string,
    issues: PropTypes.array,
    groupName: PropTypes.string,
    prioritiesId: PropTypes.string,
    setPrioritiesId: PropTypes.func,
    stagesId: PropTypes.string,
    setStagesId: PropTypes.func,
    issueOptionsId: PropTypes.string,
    setIssueOptionsId: PropTypes.func,
    dateOptionsId: PropTypes.string,
    setDateOptionsId: PropTypes.func,
    issueDescription: PropTypes.string,
    setIssueDescription: PropTypes.func,
    issueCompletion: PropTypes.string,
    setIssueCompletion: PropTypes.func,
    updateAppState: PropTypes.func,
    createGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    editGroupName: PropTypes.func.isRequired,
    createIssue: PropTypes.func.isRequired,
    deleteIssue: PropTypes.func.isRequired,
    editIssue: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
    setStage: PropTypes.func.isRequired,
    options: PropTypes.array,
};

export default IssueGroup;
