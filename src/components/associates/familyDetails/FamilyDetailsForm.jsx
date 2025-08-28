import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

function FamilyDetailsForm() {
  const [associateNo, setAssociateNo] = useState("");
  const [formData, setFormData] = useState({
    fatherName: "",
    fatherDob: "",
    fatherAadhar: "",
    fatherMobile: "",
    motherName: "",
    motherDob: "",
    motherAadhar: "",
    motherMobile: "",
  });

  // Allow only numbers for Associate No
  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    setAssociateNo(value);
  };

  // Handle all input changes
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
    console.log("Saved Family Details:", finalData);
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        {/* Associate Number */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group className="mb-3" controlId="associateNo">
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
        </Row>

        <p className="mt-3">Please Update Family Details</p>
        <h5 className="mt-2 mb-3">Parent Details</h5>

        {/* Father Details */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="fatherName">
              <Form.Label>Father Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Father Name"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="fatherDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="fatherDob" value={formData.fatherDob} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="fatherAadhar">
              <Form.Label>Aadhaar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhaar No"
                name="fatherAadhar"
                value={formData.fatherAadhar}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="fatherMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile Number"
                name="fatherMobile"
                value={formData.fatherMobile}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Mother Details */}
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="motherName">
              <Form.Label>Mother Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mother Name"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="motherDob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="motherDob" value={formData.motherDob} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="motherAadhar">
              <Form.Label>Aadhaar Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Aadhaar No"
                name="motherAadhar"
                value={formData.motherAadhar}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="motherMobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile Number"
                name="motherMobile"
                value={formData.motherMobile}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div className="d-flex justify-content-center mt-4">
          <Button variant="danger" className="me-2" type="reset">
            CANCEL
          </Button>
          <Button variant="primary" type="submit">
            UPDATE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default FamilyDetailsForm;
