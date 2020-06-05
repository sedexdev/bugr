import React from "react";

import PropTypes from "prop-types";

import "./status-btn.css";

const StatusBtn = ({ id, value, onClick }) => {
    const classes = `issue-state-btn ${value}`;
    return (
        <button
            className={classes}
            id={id}
            type='button'
            onClick={(e) => onClick(e)}>
            {value}
        </button>
    );
};

StatusBtn.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
};

export default StatusBtn;
