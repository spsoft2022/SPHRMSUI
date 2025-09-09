import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const RadioGroup = ({ label, name, options, selectedValue, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="mt-1">
        {options.map((option) => (
          <Form.Check
            key={option.value}
            inline
            label={<span className="custom-radio-label">{option.label}</span>}
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
          />
        ))}
      </div>
    </Form.Group>
  );
};

RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
