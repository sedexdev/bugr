import React from "react";

import StatusBtn from "../btns/StatusBtn";

import PropTypes from "prop-types";

import "./issue.css";

export const Issue = ({ description, completion, priority, stage }) => {
    return (
        <div className='issue-container'>
            <div className='issue-description-container'>
                <div className='issue-description'>{description}</div>
                <i className='issue-menu fas fa-ellipsis-v' title='Options'></i>
            </div>
            <div className='issue-state-btn-container'>
                <StatusBtn id='stage' value={stage} />
                <StatusBtn id='priority' value={priority} />
            </div>
            <div className='date-container'>
                <div className='completion-date'>{completion}</div>
                <i
                    className='issue-menu fas fa-ellipsis-v'
                    title='Date options'></i>
            </div>
        </div>
    );
};

Issue.propTypes = {
    description: PropTypes.string,
    completion: PropTypes.string,
    priority: PropTypes.string,
    stage: PropTypes.string,
};

export default Issue;
