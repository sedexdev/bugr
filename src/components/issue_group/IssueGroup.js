import React from "react";

import Issue from "../issue/Issue";
import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";

import PropTypes from "prop-types";

import "./issue_group.css";

export const IssueGroup = ({
    issueGroupId,
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
}) => {
    return (
        <section className='issue-group-container'>
            <div className='issue-group-title-container'>
                <h2 className='issue-group-title'>{title}</h2>
                <div className='group-options-container'>
                    <i
                        className='add-group fas fa-plus-circle'
                        title='Add'
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
                        onChange={onChange}
                        revealFunc={setAddGroupId}
                    />
                )}
                {currentDeleteGroupId === issueGroupId && (
                    <DeletePopUp
                        title={title}
                        extraClasses='group-delete-position'
                        revealFunc={setDeleteGroupId}
                    />
                )}
            </div>
            <div className='issue-box'>
                {issues &&
                    issues.map((issue) => {
                        return (
                            <Issue
                                key={issue.id}
                                issueId={issue.id}
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
                            />
                        );
                    })}
            </div>
        </section>
    );
};

IssueGroup.propTypes = {
    issueGroupId: PropTypes.string,
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
};

export default IssueGroup;
