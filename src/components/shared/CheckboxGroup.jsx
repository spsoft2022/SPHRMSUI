import { Form } from "react-bootstrap";

const CheckboxGroup = ({ label, sites, formData, onChange }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div>
        {sites.map((site) => (
          <Form.Check
            key={site.siteId}
            type="checkbox"
            id={site.siteId}
            label={site.siteName}
            name={site.siteName.toLowerCase()}
            checked={formData.sites.includes(site.siteName.toLowerCase())}
            onChange={onChange}
            className="d-inline-block me-3"
          />
        ))}
      </div>
    </Form.Group>
  );
};

export default CheckboxGroup;
