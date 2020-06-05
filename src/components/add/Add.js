import React from "react";

import PropTypes from "prop-types";

import "./add.css";

const Add = ({ id, placeholder, onChange, revealFunc }) => {
    return (
        <div className='add-object-container'>
            <input
                className='object-title-input'
                id={id}
                name='project-text'
                type='text'
                placeholder={placeholder}
                onChange={(e) => onChange(e)}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = placeholder)}
            />
            <button className='add-project-btn'>
                <i
                    className='create-object fas fa-check-circle'
                    title='Create project'></i>
            </button>
            <button className='add-project-btn'>
                <i
                    className='do-not-create-object fas fa-times-circle'
                    onClick={() => revealFunc(false)}></i>
            </button>
        </div>
    );
};

Add.propTypes = {
    id: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    revealFunc: PropTypes.func,
};

export default Add;
