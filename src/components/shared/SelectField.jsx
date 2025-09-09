import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const SelectField = ({ label, name, value, onChange, options, placeholder, disabled = false }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        className={value === "" ? "placeholder-select" : ""}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            disabled={option.disabled} // Apply the disabled prop from the options array
            className={option.disabled ? "disabled-option" : ""} // Apply the CSS class
          >
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

SelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SelectField;
