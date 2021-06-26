import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
  onChange,
  options,
}) => {
  const selectOptions = options.map((option) => {
    <option key={option.label} value={option.value}>
      {option.label}
    </option>;
  });
  return (
    <div className="form-group">
      <select
        className={classNames("form-control form-control-lg", {
          "is-valid": error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
SelectListGroup.defaultProps = {
  type: "text",
};
export default SelectListGroup;
