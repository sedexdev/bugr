import React from "react";

import StatusOption from "./StatusOption";

import PropTypes from "prop-types";

import "./status_selector.css";

export const StatusSelector = ({ status, onClick }) => {
    return status === "priority" ? (
        <div className='status-selector-container'>
            <i
                className='remove-selector fas fa-times-circle'
                onClick={() => onClick(false)}></i>
            <StatusOption value='Urgent' />
            <StatusOption value='High' />
            <StatusOption value='Medium' />
            <StatusOption value='Low' />
        </div>
    ) : (
        <div className='status-selector-container'>
            <i
                className='remove-selector fas fa-times-circle'
                onClick={() => onClick(false)}></i>
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
