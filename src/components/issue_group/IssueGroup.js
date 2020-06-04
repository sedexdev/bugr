import React from "react";

import PropTypes from "prop-types";

import Issue from "../issue/Issue";
import "./issue_group.css";

export const IssueGroup = ({ title, issues }) => {
    return (
        <section className='issue-group-container'>
            <div className='issue-group-title-container'>
                <h1 className='issue-group-title'>{title}</h1>
                <i className='add-group fas fa-plus-circle'></i>
            </div>
            <div className='issue-box'>
                {issues &&
                    issues.map((issue) => {
                        return (
                            <Issue
                                key={issue.id}
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
