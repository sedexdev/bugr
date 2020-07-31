import React from "react";

import StatusOption from "./StatusOption";

import PropTypes from "prop-types";

import "./status_selector.css";

export const StatusSelector = ({
    status,
    onClick,
    setPriority,
    setPrioritiesId,
    setStage,
    setStagesId,
    issueId,
    issueGroupId,
    updateAppState,
}) => {
    return status === "priority" ? (
        <div className='status-selector-container'>
            <div className='selector-header-container'>
                <p>Priority</p>
                <i
                    className='remove-selector fas fa-times-circle'
                    onClick={() => onClick("")}></i>
            </div>
            <StatusOption
                value='Urgent'
                status={status}
                setFunc={setPriority}
                setPrioritiesId={setPrioritiesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
            <StatusOption
                value='High'
                status={status}
                setFunc={setPriority}
                setPrioritiesId={setPrioritiesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
            <StatusOption
                value='Medium'
                status={status}
                setFunc={setPriority}
                setPrioritiesId={setPrioritiesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
            <StatusOption
                value='Low'
                status={status}
                setFunc={setPriority}
                setPrioritiesId={setPrioritiesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
        </div>
    ) : (
        <div className='status-selector-container'>
            <div className='selector-header-container'>
                <p>Stage</p>
                <i
                    className='remove-selector fas fa-times-circle'
                    onClick={() => onClick("")}></i>
            </div>
            <StatusOption
                value='Stuck'
                status={status}
                setFunc={setStage}
                setStagesId={setStagesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
            <StatusOption
                value='Complete'
                status={status}
                setFunc={setStage}
                setStagesId={setStagesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
            <StatusOption
                value='Progressing'
                status={status}
                setFunc={setStage}
                setStagesId={setStagesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
            <StatusOption
                value='Todo'
                status={status}
                setFunc={setStage}
                setStagesId={setStagesId}
                issueId={issueId}
                issueGroupId={issueGroupId}
                updateAppState={updateAppState}
            />
        </div>
    );
};

StatusSelector.propTypes = {
    status: PropTypes.string,
    onClick: PropTypes.func,
    setPriority: PropTypes.func,
    setPrioritiesId: PropTypes.func,
    setStage: PropTypes.func,
    setStagesId: PropTypes.func,
    issueId: PropTypes.string,
    issueGroupId: PropTypes.string,
    updateAppState: PropTypes.func,
};

export default StatusSelector;
