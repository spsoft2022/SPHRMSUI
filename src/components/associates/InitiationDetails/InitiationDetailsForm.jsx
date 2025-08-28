import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

function InitiationDetailsForm() {
  const [formData, setFormData] = useState({
    associateNo: "",
    fullName: "",
    personalEmail: "",
    companyEmail: "",
    gender: "",
    dateOfBirth: "",
    dateOfJoining: "",
    role: "",
    joiningDesignation: "",
    joiningCTC: "",
    currentStatus: "Active",
    employmentType: "",
    department: "",
    reportingAssociate: "",
    client: "",
    headOffice: "",
    lms: false,
    rms: false,
    hrms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Initiation Form Data:", formData);
  };

  return (
    <div>
      <h4 className="mb-3">Initiation Details</h4>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Associate No</Form.Label>
              <Form.Control
                type="text"
                name="associateNo"
                value={formData.associateNo}
                onChange={handleChange}
                placeholder="Enter Associate ID"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Company Email ID</Form.Label>
              <Form.Control
                type="email"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="name@company.com"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Personal Email ID</Form.Label>
              <Form.Control
                type="email"
                name="personalEmail"
                value={formData.personalEmail}
                onChange={handleChange}
                placeholder="name@domain.com"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <div className="mt-1">
                <Form.Check
                  inline
                  label={<span className="custom-radio-label">Male</span>}
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label={<span className="custom-radio-label">Female</span>}
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Joining</Form.Label>
              <Form.Control type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={formData.role === "" ? "placeholder-select" : ""}
                required
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Developer">Developer</option>
                <option value="Manager">Manager</option>
                <option value="Tester">Tester</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Current Status</Form.Label>
              <div className="mt-1">
                <Form.Check
                  inline
                  label={<span className="custom-radio-label">Active</span>}
                  type="radio"
                  name="currentStatus"
                  value="Active"
                  checked={formData.currentStatus === "Active"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label={<span className="custom-radio-label">Inactive</span>}
                  type="radio"
                  name="currentStatus"
                  value="Inactive"
                  checked={formData.currentStatus === "Inactive"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Joining Designation</Form.Label>
              <Form.Control
                type="text"
                name="joiningDesignation"
                value={formData.joiningDesignation}
                onChange={handleChange}
                placeholder="Enter Designation"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Joining CTC</Form.Label>
              <Form.Control
                type="text"
                name="joiningCTC"
                value={formData.joiningCTC}
                onChange={handleChange}
                placeholder="Enter Joining CTC"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Employment Type</Form.Label>
              <Form.Select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className={formData.employmentType === "" ? "placeholder-select" : ""}
              >
                <option value="" disabled>
                  Select Employment Type
                </option>
                <option value="Permanent">Permanent</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={formData.department === "" ? "placeholder-select" : ""}
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Reporting Associate</Form.Label>
              <Form.Select
                name="reportingAssociate"
                value={formData.reportingAssociate}
                onChange={handleChange}
                className={formData.reportingAssociate === "" ? "placeholder-select" : ""}
              >
                <option value="" disabled>
                  Select Reporting Associate
                </option>
                <option value="A001">A001</option>
                <option value="A002">A002</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Client</Form.Label>
              <Form.Control
                type="text"
                name="client"
                value={formData.client}
                onChange={handleChange}
                placeholder="Enter Client Name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Head Office</Form.Label>
              <Form.Control
                type="text"
                name="headOffice"
                value={formData.headOffice}
                onChange={handleChange}
                placeholder="Enter Head Office"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Select</Form.Label>
              <div className="mt-1">
                <Form.Check
                  inline
                  label={<span className="custom-checkbox-label">LMS</span>}
                  type="checkbox"
                  name="lms"
                  checked={formData.lms}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label={<span className="custom-checkbox-label">RMS</span>}
                  type="checkbox"
                  name="rms"
                  checked={formData.rms}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label={<span className="custom-checkbox-label">HRMS</span>}
                  type="checkbox"
                  name="hrms"
                  checked={formData.hrms}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-4">
          <Button type="reset" variant="danger" className="me-2">
            RESET
          </Button>
          <Button type="submit" variant="primary">
            CREATE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default InitiationDetailsForm;
