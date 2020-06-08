import React from "react";

export const IssueOptions = ({ containerName, displayOptions, options }) => {
    let key = 0;
    return (
        <div className={containerName}>
            <i
                className='remove-menu-options fas fa-times-circle'
                onClick={() => displayOptions("")}></i>
            <ul className='issue-options-list'>
                {options.map((option) => {
                    return (
                        <li key={key++} className='issue-option-list-element'>
                            {option}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default IssueOptions;
