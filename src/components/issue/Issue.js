import React, { useRef } from "react";

import StatusBtn from "../btns/StatusBtn";
import StatusSelector from "../status_selector/StatusSelector";
import IssueOptions from "./IssueOptions";

import PropTypes from "prop-types";

import "./issue.css";

export const Issue = ({
    currentData,
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
    issueDescription,
    setIssueDescription,
    issueCompletion,
    setIssueCompletion,
    createIssue,
    deleteIssue,
    editIssue,
    setDate,
    setPriority,
    setStage,
    issueGroupId,
    updateAppState,
    options,
}) => {
    const stageId = `stage-${issueId}`;
    const priorityId = `priority-${issueId}`;

    const inputRef = useRef();
    const inputDateRef = useRef();

    const editIssueValue = () => {
        inputRef.current.readOnly = false;
        inputRef.current.focus();
    };

    const editDateValue = () => {
        inputDateRef.current.readOnly = false;
        inputDateRef.current.focus();
    };

    return (
        <div className='issue-container'>
            <div className='issue-description-container'>
                <input
                    className='issue-description'
                    defaultValue={description}
                    ref={inputRef}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    onBlur={(e) => {
                        e.target.readOnly = true;
                        editIssue({
                            projectId: currentData.project_id,
                            groupId: issueGroupId,
                            issueId,
                            description: issueDescription,
                        });
                        updateAppState();
                    }}
                    readOnly
                />
                <i
                    className='issue-menu fas fa-ellipsis-v'
                    title='Options'
                    onClick={() => setIssueOptionsId(issueId)}></i>
                <div className='issue-options-temp-container'>
                    {issueOptionsId === issueId && (
                        <IssueOptions
                            containerName='issue-options-container'
                            displayOptions={setIssueOptionsId}
                            issueGroupId={issueGroupId}
                            issueId={issueId}
                            createIssue={createIssue}
                            deleteIssue={deleteIssue}
                            editIssueValue={editIssueValue}
                            setIssueOptionsId={setIssueOptionsId}
                            setDateOptionsId={setDateOptionsId}
                            updateAppState={updateAppState}
                            options={options}
                            menu={"Issue"}
                        />
                    )}
                </div>
            </div>
            <div className='issue-state-btn-container'>
                {stagesId === issueId && (
                    <StatusSelector
                        status='stage'
                        onClick={setStagesId}
                        setStage={setStage}
                        setStagesId={setStagesId}
                        issueId={issueId}
                        issueGroupId={issueGroupId}
                        updateAppState={updateAppState}
                    />
                )}
                <StatusBtn
                    id={stageId}
                    value={stage}
                    onClick={() => {
                        setStagesId(issueId);
                        setPrioritiesId("");
                    }}
                />
                {prioritiesId === issueId && (
                    <StatusSelector
                        status='priority'
                        onClick={setPrioritiesId}
                        setPriority={setPriority}
                        setPrioritiesId={setPrioritiesId}
                        issueId={issueId}
                        issueGroupId={issueGroupId}
                        updateAppState={updateAppState}
                    />
                )}
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
                <input
                    className='completion-date'
                    defaultValue={completion}
                    ref={inputDateRef}
                    onChange={(e) => setIssueCompletion(e.target.value)}
                    onBlur={(e) => {
                        e.target.readOnly = true;
                        setDate({
                            projectId: currentData.project_id,
                            groupId: issueGroupId,
                            issueId,
                            date: issueCompletion,
                        });
                        updateAppState();
                    }}
                    readOnly
                />
                <i
                    className='issue-menu fas fa-ellipsis-v'
                    title='Date options'
                    onClick={() => setDateOptionsId(issueId)}></i>
                <div className='date-options-temp-container'>
                    {dateOptionsId === issueId && (
                        <IssueOptions
                            containerName='date-options-container'
                            displayOptions={setDateOptionsId}
                            issueGroupId={issueGroupId}
                            issueId={issueId}
                            createIssue={createIssue}
                            deleteIssue={deleteIssue}
                            editDateValue={editDateValue}
                            setIssueOptionsId={setIssueOptionsId}
                            setDateOptionsId={setDateOptionsId}
                            updateAppState={updateAppState}
                            options={["Edit"]}
                            menu={"Date"}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

Issue.propTypes = {
    currentData: PropTypes.object,
    issueId: PropTypes.string,
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
    issueDescription: PropTypes.string,
    setIssueDescription: PropTypes.func,
    issueCompletion: PropTypes.string,
    setIssueCompletion: PropTypes.func,
    createIssue: PropTypes.func.isRequired,
    deleteIssue: PropTypes.func.isRequired,
    editIssue: PropTypes.func.isRequired,
    setDate: PropTypes.func.isRequired,
    setPriority: PropTypes.func.isRequired,
    setStage: PropTypes.func.isRequired,
    issueGroupId: PropTypes.string,
    updateAppState: PropTypes.func,
    options: PropTypes.array,
};

export default Issue;
