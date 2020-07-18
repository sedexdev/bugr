import React from "react";

import StatusBtn from "../btns/StatusBtn";
import StatusSelector from "../status_selector/StatusSelector";
import IssueOptions from "./IssueOptions";

import PropTypes from "prop-types";

import "./issue.css";

export const Issue = ({
    issueId,
    description,
    completion,
    priority,
    stage,
    prioritiesId,
    setPrioritiesId,
    stagesId,
    setStagesId,
    issueOptionsId,
    setIssueOptionsId,
    dateOptionsId,
    setDateOptionsId,
}) => {
    const stageId = `stage-${issueId}`;
    const priorityId = `priority-${issueId}`;

    return (
        <div className='issue-container'>
            <div className='issue-description-container'>
                <div className='issue-description'>{description}</div>
                <i
                    className='issue-menu fas fa-ellipsis-v'
                    title='Options'
                    onClick={() => setIssueOptionsId(issueId)}></i>
                <div className='issue-options-temp-container'>
                    {issueOptionsId === issueId && (
                        <IssueOptions
                            containerName='issue-options-container'
                            displayOptions={setIssueOptionsId}
                            options={["New Issue", "Edit", "Delete", "Notes"]}
                        />
                    )}
                </div>
            </div>
            <div className='issue-state-btn-container'>
                {stagesId === issueId && <StatusSelector status='stage' onClick={setStagesId} />}
                <StatusBtn
                    id={stageId}
                    value={stage}
                    onClick={() => {
                        setStagesId(issueId);
                        setPrioritiesId("");
                    }}
                />
                {prioritiesId === issueId && <StatusSelector status='priority' onClick={setPrioritiesId} />}
                <StatusBtn
                    id={priorityId}
                    value={priority}
                    onClick={() => {
                        setPrioritiesId(issueId);
                        setStagesId("");
                    }}
                />
            </div>
            <div className='date-container'>
                <div className='completion-date'>{completion}</div>
                <i
                    className='issue-menu fas fa-ellipsis-v'
                    title='Date options'
                    onClick={() => setDateOptionsId(issueId)}></i>
                <div className='date-options-temp-container'>
                    {dateOptionsId === issueId && (
                        <IssueOptions
                            containerName='date-options-container'
                            displayOptions={setDateOptionsId}
                            options={["Edit", "Delete"]}
                        />
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
    prioritiesId: PropTypes.string,
    setPrioritiesId: PropTypes.func,
    stagesId: PropTypes.string,
    setStagesId: PropTypes.func,
    issueOptionsId: PropTypes.string,
    setIssueOptionsId: PropTypes.func,
    dateOptionsId: PropTypes.string,
    setDateOptionsId: PropTypes.func,
};

export default Issue;
