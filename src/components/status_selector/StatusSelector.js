import React from "react";

import StatusOption from "./StatusOption";

import PropTypes from "prop-types";

import "./status_selector.css";

export const StatusSelector = ({ status, onClick }) => {
    return status === "priority" ? (
        <div className='status-selector-container'>
            <div className='selector-header-container'>
                <p>Priority</p>
                <i
                    className='remove-selector fas fa-times-circle'
                    onClick={() => onClick("")}></i>
            </div>
            <StatusOption value='Urgent' />
            <StatusOption value='High' />
            <StatusOption value='Medium' />
            <StatusOption value='Low' />
        </div>
    ) : (
        <div className='status-selector-container'>
            <div className='selector-header-container'>
                <p>Stage</p>
                <i
                    className='remove-selector fas fa-times-circle'
                    onClick={() => onClick("")}></i>
            </div>
            <StatusOption value='Stuck' />
            <StatusOption value='Complete' />
            <StatusOption value='Progressing' />
            <StatusOption value='Todo' />
        </div>
    );
};

StatusSelector.propTypes = {
    status: PropTypes.string,
    onClick: PropTypes.func,
};

export default StatusSelector;
