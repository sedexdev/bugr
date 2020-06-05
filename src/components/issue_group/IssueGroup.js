import React, { useState } from "react";

import Issue from "../issue/Issue";
import DeletePopUp from "../delete/Delete";

import PropTypes from "prop-types";

import "./issue_group.css";

export const IssueGroup = ({ title, issues }) => {
    const [showDeleteGroup, setDeleteGroup] = useState(false);

    return (
        <section className='issue-group-container'>
            <div className='issue-group-title-container'>
                <h2 className='issue-group-title'>{title}</h2>
                <div className='group-options-container'>
                    <i className='add-group fas fa-plus-circle' title='Add'></i>
                    <i
                        className='delete-group fas fa-times-circle'
                        title='Delete group'
                        onClick={() => setDeleteGroup(true)}></i>
                </div>
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
                            />
                        );
                    })}
            </div>
        </section>
    );
};

IssueGroup.propTypes = {
    title: PropTypes.string,
    issues: PropTypes.array,
};

export default IssueGroup;
