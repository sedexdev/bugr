import React, { useEffect, useRef } from "react";

import PropTypes from "prop-types";

const Stats = ({ title, stats }) => {
    const column1 = useRef();
    const column2 = useRef();
    const column3 = useRef();
    const column4 = useRef();

    useEffect(() => {
        if (stats) {
            const columns = [column1, column2, column3, column4];
            const status = [
                "Low",
                "Medium",
                "High",
                "Urgent",
                "Todo",
                "Progressing",
                "Complete",
                "Stuck",
            ];
            for (let i = 0; i < columns.length; i++) {
                for (let j = 0; j < status.length; j++) {
                    if (columns[i].current.classList.contains(status[j])) {
                        columns[i].current.classList.remove(status[j]);
                    }
                }
            }
            for (let i = 0; i < stats.length; i++) {
                columns[i].current.style.height = "0";
                columns[i].current.classList.add(stats[i][0]);
                columns[i].current.style.height = stats[i][1];
            }
        }
    }, [stats]);

    return (
        <div className='stats-graph-box'>
            <h4 className='graph-title'>{title}</h4>
            <div className='stats-graph'>
                <div className='graph-column' ref={column1}></div>
                <div className='graph-column' ref={column2}></div>
                <div className='graph-column' ref={column3}></div>
                <div className='graph-column' ref={column4}></div>
            </div>
        </div>
    );
};

Stats.propTypes = {
    title: PropTypes.string,
    stats: PropTypes.array,
    context: PropTypes.string,
};

export default Stats;
