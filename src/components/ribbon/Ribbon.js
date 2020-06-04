import React from "react";

import "./ribbon.css";

export const Ribbon = () => {
    return (
        <header className='app-ribbon'>
            <div className='app-ribbon-btn-container'>
                <button className='ribbon-btn' id='file-ribbon-btn' type='button'>
                    File
                </button>
                <button className='ribbon-btn' id='edit-ribbon-btn' type='button'>
                    Edit
                </button>
            </div>
            <div className='app-visibility-controls-container'>
                <button className='app-control-btn' id='minimise' type='button'>
                    <i className='far fa-window-minimize'></i>
                </button>
                <button className='app-control-btn' id='maximise' type='button'>
                    <i className='fas fa-window-maximize'></i>
                </button>
                <button className='app-control-btn' id='quit-app' type='button'>
                    <i className='far fa-window-close'></i>
                </button>
            </div>
        </header>
    );
};

export default Ribbon;
