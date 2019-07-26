import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './catagory.css';

const Catagory = (props) => {
    return (
        <div className="col-md-3 catagory pr-0" onDragOver={ props.dragOvered } onDrop={ props.dragDropped }>
            <div className="catagory-title">
                <p className="lead font-weight-bold text-center mb-1">{ props.title }</p>
            </div>
            <div className="tasks-container">
                { props.children }
            </div>
        </div>
    );
};

export default Catagory;