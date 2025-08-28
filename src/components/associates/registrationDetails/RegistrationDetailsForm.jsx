import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function RegistrationDetailsForm() {
  const [formData, setFormData] = useState({
    associateNo: "",
    maritalStatus: "Single",
    panNo: "",
    uanNo: "",
    emergencyContact1: "",
    emergencyContact2: "",
    bloodGroup: "",
    bankAccount: "",
    mobile: "",
    aadhaar: "",
    insuranceNo: "",
    pfNo: "",
    esicNo: "",
    relation1: "",
    relationName1: "",
    relation2: "",
    relationName2: "",
    designation: "",
    revision: "",
    ctc: "",
    permanentAddress: "",
    presentAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Registration Data:", formData);
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        {/* First Row */}
        {/* First Row - Associate No, Marital Status, Blood Group */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Associate No</Form.Label>
              <Form.Control
                type="text"
                name="associateNo"
                placeholder="Enter Associate ID"
                value={formData.associateNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Marital Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="Single"
                  type="radio"
                  name="maritalStatus"
                  value="Single"
                  checked={formData.maritalStatus === "Single"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="Married"
                  type="radio"
                  name="maritalStatus"
                  value="Married"
                  checked={formData.maritalStatus === "Married"}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Blood Group</Form.Label>
              <Form.Select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Second Row - PAN, Aadhaar, UAN */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control
                type="text"
                name="panNo"
                placeholder="Enter PAN No"
                value={formData.panNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar Number</Form.Label>
              <Form.Control
                type="text"
                name="aadhaar"
                placeholder="Enter Aadhaar Number"
                value={formData.aadhaar}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>UAN Number</Form.Label>
              <Form.Control
                type="text"
                name="uanNo"
                placeholder="Enter UAN No"
                value={formData.uanNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Third Row - PF, ESIC, Insurance */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>PF Number</Form.Label>
              <Form.Control
                type="text"
                name="pfNo"
                placeholder="Enter PF No"
                value={formData.pfNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>ESIC Number</Form.Label>
              <Form.Control
                type="text"
                name="esicNo"
                placeholder="Enter ESIC No"
                value={formData.esicNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Insurance Number</Form.Label>
              <Form.Control
                type="text"
                name="insuranceNo"
                placeholder="Enter Insurance No"
                value={formData.insuranceNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Fourth Row - Bank, Mobile, Emergency Contact */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Bank Account No</Form.Label>
              <Form.Control
                type="text"
                name="bankAccount"
                placeholder="Enter Bank A/c No"
                value={formData.bankAccount}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Current Designation</Form.Label>
              <Form.Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option>Developer</option>
                <option>Designer</option>
                <option>Manager</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Fifth Row - 2nd Emergency, Relation, Relation Name */}
        <Row>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="emergencyContact1"
                placeholder="Enter Emergency Contact No"
                value={formData.emergencyContact1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                name="relation1"
                placeholder="Enter Relation"
                value={formData.relation1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation Name</Form.Label>
              <Form.Control
                type="text"
                name="relationName1"
                placeholder="Enter Relation Name"
                value={formData.relationName1}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Sixth Row - Relation 2, Relation Name 2, Designation */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Second Emergency Contact</Form.Label>
              <Form.Control
                type="text"
                name="emergencyContact2"
                placeholder="Enter Emergency Contact No"
                value={formData.emergencyContact2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                name="relation2"
                placeholder="Enter Relation"
                value={formData.relation2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation Name</Form.Label>
              <Form.Control
                type="text"
                name="relationName2"
                placeholder="Enter Relation Name"
                value={formData.relationName2}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Seventh Row - Revision, CTC, Permanent Address */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Next Revision</Form.Label>
              <Form.Select
                name="revision"
                value={formData.revision}
                onChange={handleChange}
              >
                <option value="">Select Next Revision</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Present CTC</Form.Label>
              <Form.Control
                type="text"
                name="ctc"
                placeholder="Enter Present CTC"
                value={formData.ctc}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
                name="permanentAddress"
                placeholder="Enter Permanent Address"
                value={formData.permanentAddress}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Eighth Row - Present Address */}
        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Present Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="presentAddress"
                placeholder="Enter Present Address"
                value={formData.presentAddress}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button variant="danger" type="reset">
            RESET
          </Button>
          <Button variant="primary" type="submit">
            UPDATE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegistrationDetailsForm