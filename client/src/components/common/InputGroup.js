import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <i className="icon" />
      </div>
      <input
        type={type}
        className={classNames("form-control form-control-lg", {
          "is-valid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
InputGroup.defaultProps = {
  type: "text",
};
export default InputGroup;
