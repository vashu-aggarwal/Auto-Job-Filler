import React from "react";

const InputField = ({
  type,
  val,
  Name,
  handleChange,
  className,
  Placeholder,
  maxLen,
  maxDate,
  isFieldDisabled,
  onKeyDown
}) => {
  return (
    <input
      className={className}
      name={Name}
      value={val}
      type={type}
      onChange={handleChange}
      placeholder={Placeholder}
      maxLength={maxLen}
      max={maxDate}
      disabled={isFieldDisabled}
      onKeyDown={onKeyDown}
    />
  );
};

export default InputField;
