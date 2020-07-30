import React from "react";

import PropTypes from "prop-types";

import "./add.css";

const Add = ({
    id,
    extraClasses,
    placeholder,
    name,
    onChange,
    revealFunc,
    onClick,
}) => {
    const addClasses = extraClasses
        ? `add-object-container ${extraClasses}`
        : "add-object-container";

    return (
        <div className={addClasses}>
            <input
                className='object-title-input'
                id={id}
                name={name}
                type='text'
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = placeholder)}
            />
            <button className='add-project-btn'>
                <i
                    className='create-object fas fa-check-circle'
                    title='Create project'
                    onClick={() => {
                        onClick();
                        revealFunc("");
                    }}></i>
            </button>
            <button className='add-project-btn'>
                <i
                    className='do-not-create-object fas fa-times-circle'
                    onClick={() => revealFunc("")}></i>
            </button>
        </div>
    );
};

Add.propTypes = {
    id: PropTypes.string,
    extraClasses: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    revealFunc: PropTypes.func,
    onClick: PropTypes.func,
};

export default Add;
