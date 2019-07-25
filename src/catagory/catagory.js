import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './catagory.css';

const Catagory = (props) => {
    return (
        <div className="col-md-3 catagory">
            <div className="catagory-title">
                <p className="lead font-weight-bold text-center">{ props.title }</p>
            </div>
            <div className="tasks-container">
                { props.children }
            </div>
        </div>
    );
};

export default Catagory;