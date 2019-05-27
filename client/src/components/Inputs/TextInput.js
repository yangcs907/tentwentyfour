// Component for text inputs on forms
import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import '../../App.css';

const TextInput = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <div className="row inputDiv">
        <div className="col s12">
          <p className="labelStyle"><i className={label} /></p>
          <input
            name={name}
            value={value}
            placeholder={placeholder}
            type={type}
            onChange={onChange}
            disabled={disabled}
            className={classnames('validate', {
              'validate invalid' : error })}
          />
        {error && ( <sup className="errorMessage" >! {error}</sup> )}

        </div>
      </div>
    </div>

  )
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text'
};

export default TextInput;
