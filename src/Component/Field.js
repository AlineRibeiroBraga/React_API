import React from 'react';

const Field = ( { label, name, value, errors, onChange})=>

    <div className="form-row">
        <label className = "label"> {label} </label>
        <input className = "form-control" type = "text"
                name = {name}
                value = {value}
                onChange={onChange} />
    </div>


export default Field;