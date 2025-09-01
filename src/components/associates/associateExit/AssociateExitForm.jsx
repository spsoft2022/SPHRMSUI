import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const AssociateExitForm = () => {
  const [associateNo, setAssociateNo] = useState("");
  const [formData, setFormData] = useState({
    resignationDate: "",
    lastWorkingDay: "",
    reason: "",
  });

  // Allow only numbers for Associate No
  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    setAssociateNo(value);
  };

  // Handle other input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      associateNo,
      ...formData,
    };
    console.log("Associate Exit Details:", finalData);
  };

  return (
    <Form style={{ margin: "0 auto" }} onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Associate No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Associate No"
              value={associateNo}
              onChange={handleAssociateChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date of Resignation</Form.Label>
            <Form.Control
              type="date"
              name="resignationDate"
              value={formData.resignationDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Working Day</Form.Label>
            <Form.Control
              type="date"
              name="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Enter Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <Button variant="primary" type="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default AssociateExitForm;


