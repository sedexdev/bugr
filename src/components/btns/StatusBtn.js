import React from "react";

import PropTypes from "prop-types";

import "./status-btn.css";

const StatusBtn = ({ id, value }) => {
    const classes = `issue-state-btn ${value}`;
    return (
        <button className={classes} id={id} type='button'>
            {value}
        </button>
    );
};

StatusBtn.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
};

export default StatusBtn;
