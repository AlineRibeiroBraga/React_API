import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../List.css';

const Field = ( { label,name,value, errors, onChange})=>
    <div className="field" style = {{display : 'flex'}}>
        <label > {label} </label>
        <input className = "form-control" type = "text"
                name = {name}
                value = {value}
                onChange={onChange} />
    </div>

export default Field;