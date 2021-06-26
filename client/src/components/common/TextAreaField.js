import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const TextAreaField = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
}) => {
  return (
    <div className="form-group">
      <textarea
        type={type}
        className={classNames("form-control form-control-lg", {
          "is-valid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
TextAreaField.defaultProps = {
  type: "text",
};
export default TextAreaField;
