import React from 'react';

import './task.css';

const Task = (props) => {
    // Creation date is in the integer format (Linux format).
    // Format it as DD/MM/YYYY at HH:MM.
    // If the lengths of date, month, hour and minute are length of 1,
    // add a leading 0.
    let date = new Date(props.task.creationDate);
    let day = '' + date.getDate();
    day = day.length === 1 ? '0' + day : day
    let month = '' + date.getMonth();
    month = month.length === 1 ? '0' + month : month;
    let year = '' + date.getFullYear();
    let hour = '' + date.getHours();
    hour = hour.length === 1 ? '0' + hour : hour;
    let minute = '' + date.getMinutes();
    minute = minute.length === 1 ? '0' + minute : minute;
    let dateFormatted = `${day}/${month}/${year} at ${hour}:${minute}`;

    return (
        <div className="task-card" draggable={ true } onDragStart={ props.dragStarted }>
            <h3><span className="text-secondary">{ props.taskIdx + 1 } </span>{ props.task.subject }</h3>

            <div className="task-info">
                <p>{ props.task.info }</p>
            </div>

            <div className="task-time">
                <p className="text-secondary small">{ dateFormatted }</p>
            </div>

            <div className="task-controls">
                <button type="button" className="btn btn-outline-primary btn-sm" onClick={ props.clickedEdit }>Edit</button>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={ props.clickedRemove }>Remove</button>
            </div>
        </div>
    );
};

export default Task;