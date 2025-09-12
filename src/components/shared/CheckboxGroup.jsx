import { Form } from "react-bootstrap";

function CheckboxGroup({ label, sites = [], formData, onChange }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div>
        {sites.map((site) => (
          <Form.Check
            key={site._id}
            type="checkbox"
            id={`site-checkbox-${site.siteName}`}
            label={site.siteName}
            name={site.siteName}
            checked={formData.sites.includes(site.siteName)}
            onChange={onChange}
            className="d-inline-block me-3"
          />
        ))}
      </div>
    </Form.Group>
  );
}

export default CheckboxGroup;
