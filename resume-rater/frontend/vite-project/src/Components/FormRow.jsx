import React from 'react';

const FormRow = ({ type, name, labelText, defaultValue }) => {
    return (
        <div>
            <label htmlFor={name} className="form-label">
                {/* the className css that we are using is react forms inbuilt css */}
                {labelText || name}
                <input
                    type={type}
                    id={name}
                    name={name}
                    className="form-input"
                    defaultValue={defaultValue || ""}
                    required
                />
                {/* the id here should be same as the htmlFor in label and name="name" is imp */}
            </label>
        </div>
    );
};

export default FormRow;
