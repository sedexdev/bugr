import React from "react";

import PropTypes from "prop-types";

export const IssueOptions = ({
    containerName,
    displayOptions,
    issueGroupId,
    issueId,
    createIssue,
    deleteIssue,
    editIssueValue,
    editDateValue,
    setIssueOptionsId,
    setDateOptionsId,
    updateAppState,
    options,
    menu,
}) => {
    let key = 0;
    return (
        <div className={containerName}>
            <i
                className='remove-menu-options fas fa-times-circle'
                onClick={() => displayOptions("")}></i>
            <ul className='issue-options-list'>
                {options.map((option) => {
                    return (
                        <li
                            key={key++}
                            className='issue-option-list-element'
                            onClick={() => {
                                const data = JSON.parse(
                                    localStorage.getItem("currentData")
                                );
                                switch (option) {
                                    case "New Issue":
                                        createIssue({
                                            projectName: data.project_name,
                                            projectId: data.project_id,
                                            groupId: issueGroupId,
                                        });
                                        break;
                                    case "Delete":
                                        deleteIssue({
                                            projectId: data.project_id,
                                            groupId: issueGroupId,
                                            issueId,
                                        });
                                        break;
                                    case "Edit":
                                        menu === "Issue"
                                            ? editIssueValue()
                                            : editDateValue();
                                        break;
                                    default:
                                        return null;
                                }
                                setIssueOptionsId("");
                                setDateOptionsId("");
                                updateAppState();
                            }}>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

IssueOptions.propTypes = {
    containerName: PropTypes.string,
    displayOptions: PropTypes.func,
    issueGroupId: PropTypes.string,
    issueId: PropTypes.string,
    createIssue: PropTypes.func,
    deleteIssue: PropTypes.func,
    editIssueValue: PropTypes.func,
    editDateValue: PropTypes.func,
    setIssueOptionsId: PropTypes.func,
    setDateOptionsId: PropTypes.func,
    updateAppState: PropTypes.func,
    options: PropTypes.array,
    menu: PropTypes.string,
};

export default IssueOptions;
