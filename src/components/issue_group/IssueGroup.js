import React, { useState } from "react";

import Issue from "../issue/Issue";
import DeletePopUp from "../delete/Delete";
import AddPopUp from "../add/Add";

import PropTypes from "prop-types";

import "./issue_group.css";

export const IssueGroup = ({
    onChange,
    title,
    issues,
    showDeleteGroup,
    setDeleteGroup,
    showAddGroup,
    setAddGroup,
    showPriorities,
    setPriorities,
    showStages,
    setStages,
    showIssueOptions,
    setIssueOptions,
    showDateOptions,
    setDateOptions,
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
                            setAddGroup(true);
                            setDeleteGroup(false);
                        }}></i>
                    <i
                        className='delete-group fas fa-times-circle'
                        title='Delete group'
                        onClick={() => {
                            setDeleteGroup(true);
                            setAddGroup(false);
                        }}></i>
                </div>
                {showAddGroup && (
                    <AddPopUp
                        extraClasses='group-add-position'
                        placeholder='Group name...'
                        onChange={onChange}
                        revealFunc={setAddGroup}
                    />
                )}
                {showDeleteGroup && (
                    <DeletePopUp
                        title={title}
                        extraClasses='group-delete-position'
                        revealFunc={setDeleteGroup}
                    />
                )}
            </div>
            <div className='issue-box'>
                {issues &&
                    issues.map((issue) => {
                        return (
                            <Issue
                                key={issue.id}
                                id={issue.id}
                                description={issue.description}
                                completion={issue.finish_by}
                                priority={issue.priority}
                                stage={issue.stage}
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
            </div>
        </section>
    );
};

IssueGroup.propTypes = {
    onChange: PropTypes.func,
    title: PropTypes.string,
    issues: PropTypes.array,
    showDeleteGroup: PropTypes.bool,
    setDeleteGroup: PropTypes.func,
    showAddGroup: PropTypes.bool,
    setAddGroup: PropTypes.func,
    groupName: PropTypes.string,
    showPriorities: PropTypes.bool,
    setPriorities: PropTypes.func,
    showStages: PropTypes.bool,
    setStages: PropTypes.func,
    showIssueOptions: PropTypes.bool,
    setIssueOptions: PropTypes.func,
    showDateOptions: PropTypes.bool,
    setDateOptions: PropTypes.func,
};

export default IssueGroup;
