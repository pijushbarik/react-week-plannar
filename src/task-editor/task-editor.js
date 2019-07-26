import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './task-editor.css';

const TaskEditor = (props) => {
    // Is modal visible value is set to true?
    let modalDisplayProp = props.visible ? 'block' : 'none';

    // Button value - Add new or update?
    let btnVal, btnHandler;
    if(props.operationType === 'new') {
        btnVal = 'Add';
        btnHandler = props.addNew;
    }
    else if(props.operationType === 'edit') {
        btnVal = 'Update';
        btnHandler = props.update
    }

    return(
        <div className="modal-backdrop" style={ { 'display': modalDisplayProp } }>
            <div className="modal" style={ { 'display': modalDisplayProp } }>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new task</h5>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <input className="form-control" placeholder="Subject" name="subject" onChange={ props.subjectChanged } value={ props.subject } />
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" placeholder="Task info" name="info" onChange={ props.infoChanged } value={ props.info }></textarea>
                            </div>
                            <div className="form-group">
                                <select className="form-control" name="catagory" onChange={ props.catagoryChanged } value={ props.catagory } >
                                    <option value="all">All</option>
                                    <option value="todo">To do</option>
                                    <option value="progress">Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" onClick={ props.close }>Cancel</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={ btnHandler }>{ btnVal }</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default TaskEditor;