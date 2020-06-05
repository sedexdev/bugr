import React from "react";

import PropTypes from "prop-types";

const StatusOption = ({ value }) => {
    const classes = `${value} status-color`;

    return (
        <div className='status-option'>
            <div className={classes}>
                <p className='status-title'>{value}</p>
            </div>
        </div>
    );
};

StatusOption.propTypes = {
    value: PropTypes.string,
};

export default StatusOption;
