import React from "react";

import Issue from "../issue/Issue";
import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";

import PropTypes from "prop-types";

import "./issue_group.css";

export const IssueGroup = ({
    issueGroupId,
    currentData,
    setAddGroupId,
    currentAddGroupId,
    setDeleteGroupId,
    currentDeleteGroupId,
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
    updateAppState,
    createGroup,
    deleteGroup,
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
                        title='Add Group'
                        onClick={() => {
                            setAddGroupId(issueGroupId);
                            setDeleteGroupId("");
                        }}></i>
                    <i
                        className='delete-group fas fa-times-circle'
                        title='Delete group'
                        onClick={() => {
                            setDeleteGroupId(issueGroupId);
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
            </div>
            <div className='issue-box'>
                {issues &&
                    issues.map((issue) => {
                        return (
                            <Issue
                                key={issue.issue_id}
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
    currentData: PropTypes.object,
    setAddGroupId: PropTypes.func,
    currentAddGroupId: PropTypes.string,
    setDeleteGroupId: PropTypes.func,
    currentDeleteGroupId: PropTypes.string,
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
    updateAppState: PropTypes.func,
    createGroup: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    createIssue: PropTypes.func.isRequired,
    deleteIssue: PropTypes.func.isRequired,
    editIssue: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
    setStage: PropTypes.func.isRequired,
    options: PropTypes.array,
};

export default IssueGroup;
