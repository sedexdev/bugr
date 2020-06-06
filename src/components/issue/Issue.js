import React, { useState } from "react";

import StatusBtn from "../btns/StatusBtn";
import StatusSelector from "../status_selector/StatusSelector";

import PropTypes from "prop-types";

import "./issue.css";

export const Issue = ({ id, description, completion, priority, stage }) => {
    const [showPriorities, setPriorities] = useState(false);
    const [showStages, setStages] = useState(false);
    const [showIssueOptions, setIssueOptions] = useState(false);
    const [showDateOptions, setDateOptions] = useState(false);

    const stageId = `stage-${id}`;
    const priorityId = `priority-${id}`;

    return (
        <div className='issue-container'>
            <div className='issue-description-container'>
                <div className='issue-description'>{description}</div>
                <i
                    className='issue-menu fas fa-ellipsis-v'
                    title='Options'
                    onClick={() => setIssueOptions(true)}></i>
                <div className='issue-options-temp-container'>
                    {showIssueOptions && (
                        <div className='issue-options-container'>
                            <i
                                className='remove-menu-options fas fa-times-circle'
                                onClick={() => setIssueOptions(false)}></i>
                            <ul className='issue-options-list'>
                                <li className='issue-option-list-element'>
                                    New issue
                                </li>
                                <li className='issue-option-list-element'>
                                    Edit
                                </li>
                                <li className='issue-option-list-element'>
                                    Delete
                                </li>
                                <li className='issue-option-list-element'>
                                    Notes
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className='issue-state-btn-container'>
                {showStages && (
                    <StatusSelector status='stage' onClick={setStages} />
                )}
                <StatusBtn
                    id={stageId}
                    value={stage}
                    onClick={() => {
                        setStages(true);
                        setPriorities(false);
                    }}
                />
                {showPriorities && (
                    <StatusSelector status='priority' onClick={setPriorities} />
                )}
                <StatusBtn
                    id={priorityId}
                    value={priority}
                    onClick={() => {
                        setPriorities(true);
                        setStages(false);
                    }}
                />
            </div>
            <div className='date-container'>
                <div className='completion-date'>{completion}</div>
                <i
                    className='issue-menu fas fa-ellipsis-v'
                    title='Date options'
                    onClick={() => setDateOptions(true)}></i>
                <div className='date-options-temp-container'>
                    {showDateOptions && (
                        <div className='date-options-container'>
                            <i
                                className='remove-menu-options fas fa-times-circle'
                                onClick={() => setDateOptions(false)}></i>
                            <ul className='date-options-list'>
                                <li className='date-option-list-element'>
                                    Edit
                                </li>
                                <li className='date-option-list-element'>
                                    Delete
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

Issue.propTypes = {
    id: PropTypes.string,
    description: PropTypes.string,
    completion: PropTypes.string,
    priority: PropTypes.string,
    stage: PropTypes.string,
};

export default Issue;
