import React from "react";

import PropTypes from "prop-types";

import "./delete.css";

export const Delete = ({ title, extraClasses, revealFunc }) => {
    const deleteClasses = extraClasses
        ? `delete-project-container ${extraClasses}`
        : "delete-project-container";

    return (
        <div className={deleteClasses}>
            <p className='delete-project-msg'>Delete {title}?</p>
            <div className='delete-project-btn-container'>
                <button className='delete-project-btn'>
                    <i className='do-delete fas fa-check-circle'></i>
                </button>
                <button className='delete-project-btn'>
                    <i
                        className='do-not-delete fas fa-times-circle'
                        onClick={() => revealFunc("")}></i>
                </button>
            </div>
        </div>
    );
};

Delete.propTypes = {
    title: PropTypes.string,
    extraClasses: PropTypes.string,
    revealFunc: PropTypes.func,
};

export default Delete;
