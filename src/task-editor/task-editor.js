import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './task-editor.css';

const TaskEditor = () => {
    return(
        <div className="modal-backdrop">
            <div className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add new task</h5>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <textarea className="form-control"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm">Cancel</button>
                            <button type="button" className="btn btn-primary btn-sm">Add</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default TaskEditor;