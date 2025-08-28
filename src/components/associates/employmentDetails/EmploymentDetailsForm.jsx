import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaPaperclip } from "react-icons/fa";

function EmploymentDetailsForm() {
  const [associateNo, setAssociateNo] = useState("");
  const [employment, setEmployment] = useState({
    dateOfJoining: "",
    lastWorkingDate: "",
    organizationName: "",
    workLocation: "",
  });
  const [document, setDocument] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployment({ ...employment, [name]: value });
  };

  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    setAssociateNo(value);
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!associateNo) {
      alert("Please enter Associate No!");
      return;
    }

    console.log("Employment Details Submitted:", {
      associateNo,
      ...employment,
      document,
    });

    setEmployment({
      dateOfJoining: "",
      lastWorkingDate: "",
      organizationName: "",
      workLocation: "",
    });
    setAssociateNo("");
    setDocument(null);
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group className="mb-3" controlId="associateNo">
              <Form.Label>Associate No</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Associate No"
                value={associateNo}
                onChange={handleAssociateChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <h5 className="mt-4 mb-3">Add Professional Details</h5>

        <div className="row">
          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control type="date" name="dateOfJoining" value={employment.dateOfJoining} onChange={handleChange} />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Last Working Date</Form.Label>
              <Form.Control
                type="date"
                name="lastWorkingDate"
                value={employment.lastWorkingDate}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                name="organizationName"
                placeholder="Enter Organization Name"
                value={employment.organizationName}
                onChange={handleChange}
              />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Group className="mb-3">
              <Form.Label>Work Location</Form.Label>
              <Form.Control
                type="text"
                name="workLocation"
                placeholder="Enter Work Location"
                value={employment.workLocation}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </div>

        {/* Document Upload with working label */}
        <Form.Group className="mb-3">
          <Form.Label htmlFor="fileUpload" style={{ cursor: "pointer" }} className="">
            <FaPaperclip size={15} className="me-2" />
            Upload Document
          </Form.Label>
          <Form.Control type="file" id="fileUpload" onChange={handleFileChange} style={{ display: "none" }} />
          {document && (
            <div className="mt-2 text-primary">
              Selected: <strong>{document.name}</strong>
            </div>
          )}
        </Form.Group>

        <div className="text-center mt-3">
          <Button type="submit" variant="primary" className="mt-2">
            CREATE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EmploymentDetailsForm;
