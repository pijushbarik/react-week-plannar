import React from 'react';

import './task.css';

const Task = (props) => {
    return (
        <div className="task-card">
            <h3><span className="text-secondary">{props.taskIdx + 1} </span>{props.task.subject}</h3>
            <div className="task-info">
                <p>{ props.task.info }</p>
            </div>

            <div className="task-controls">
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={ props.edit }>Edit</button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={ props.remove }>Remove</button>
            </div>
        </div>
    );
};

export default Task;