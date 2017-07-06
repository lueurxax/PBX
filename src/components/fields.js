/**
 * Created by xax on 14.03.2017.
 */
import React from 'react';
const FormStyle = { paddingLeft: '40px'};
export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div style={FormStyle} className="form-group">
        <label className="form-group-addon">{label}</label>
        <input {...input} placeholder={label} type={type} className="form-control"/>
        {touched && ((error && <span className="error form-group-addon">{error}</span>) )}
    </div>
);

export const renderTd = ({ input, label, type, meta: { touched, error, warning } }) => (
  <td className="form-group">
    <input {...input} placeholder={label} type={type} className="form-control"/>
    {touched && ((error && <span className="error form-group-addon">{error}</span>) )}
  </td>
);
