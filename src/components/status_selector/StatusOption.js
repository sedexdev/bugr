import React from "react";

import PropTypes from "prop-types";

const StatusOption = ({
    value,
    status,
    setFunc,
    setPrioritiesId,
    setStagesId,
    issueId,
    issueGroupId,
    updateAppState,
}) => {
    const classes = `${value} status-color`;
    return (
        <div className='status-option'>
            <div
                className={classes}
                onClick={() => {
                    const data = JSON.parse(
                        localStorage.getItem("currentData")
                    );
                    const values = {
                        projectId: data.project_id,
                        groupId: issueGroupId,
                        issueId,
                    };
                    if (status === "priority") {
                        values.priority = value;
                        setFunc(values);
                        setPrioritiesId("");
                    } else {
                        values.stage = value;
                        setFunc(values);
                        setStagesId("");
                    }
                    updateAppState();
                }}>
                <p className='status-title'>{value}</p>
            </div>
        </div>
    );
};

StatusOption.propTypes = {
    value: PropTypes.string,
    status: PropTypes.string,
    setFunc: PropTypes.func,
    setPrioritiesId: PropTypes.func,
    setStagesId: PropTypes.func,
    issueId: PropTypes.string,
    issueGroupId: PropTypes.string,
    updateAppState: PropTypes.func,
};

export default StatusOption;
