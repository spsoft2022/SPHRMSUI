import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

function ButtonComponent({ label, type, variant, onClick, className }) {
  return (
    <Button type={type} variant={variant} onClick={onClick} className={className}>
      {label}
    </Button>
  );
}

ButtonComponent.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ButtonComponent;
