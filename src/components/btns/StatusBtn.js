import React from "react";

import PropTypes from "prop-types";

import "./status-btn.css";

const StatusBtn = ({ id, value }) => {
    return (
        <button className='issue-state-btn' id={id} type='button'>
            {value}
        </button>
    );
};

StatusBtn.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
};

export default StatusBtn;
