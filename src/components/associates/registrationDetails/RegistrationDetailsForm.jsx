import { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

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

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch registration if associateNo entered
  const fetchRegistration = async () => {
    if (!formData.associateNo) return;

    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:5000/associates/registration/${formData.associateNo}`
      );
      const data = await res.json();

      if (res.ok && data.exists) {
        setFormData((prev) => ({
          ...prev,
          ...data.registration, // backend should send registration object
          associateNo: formData.associateNo, // keep associateNo intact
        }));
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Save or update registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/associates/registration",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Registration saved successfully ✅");
        console.log("Saved data:", result.data);
      } else {
        alert(`Error: ${result.message}`);
        console.error(result.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Failed to connect to server ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Associate Registration</h3>
      <Form onSubmit={handleSubmit}>
        {/* First Row */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Associate No</Form.Label>
              <Form.Control
                type="text"
                name="associateNo"
                value={formData.associateNo}
                onChange={handleChange}
                onBlur={fetchRegistration} // auto-fetch on blur
                placeholder="Enter Associate No"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Marital Status</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Single"
                  name="maritalStatus"
                  value="Single"
                  checked={formData.maritalStatus === "Single"}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Married"
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
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* PAN, Aadhaar, UAN */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>PAN No</Form.Label>
              <Form.Control
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                placeholder="Enter PAN"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Aadhaar</Form.Label>
              <Form.Control
                type="text"
                name="aadhaar"
                value={formData.aadhaar}
                onChange={handleChange}
                placeholder="Enter Aadhaar"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>UAN No</Form.Label>
              <Form.Control
                type="text"
                name="uanNo"
                value={formData.uanNo}
                onChange={handleChange}
                placeholder="Enter UAN"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* PF, ESIC, Insurance */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>PF No</Form.Label>
              <Form.Control
                type="text"
                name="pfNo"
                value={formData.pfNo}
                onChange={handleChange}
                placeholder="Enter PF"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>ESIC No</Form.Label>
              <Form.Control
                type="text"
                name="esicNo"
                value={formData.esicNo}
                onChange={handleChange}
                placeholder="Enter ESIC"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Insurance No</Form.Label>
              <Form.Control
                type="text"
                name="insuranceNo"
                value={formData.insuranceNo}
                onChange={handleChange}
                placeholder="Enter Insurance"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Bank, Mobile, Designation */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Bank Account</Form.Label>
              <Form.Control
                type="text"
                name="bankAccount"
                value={formData.bankAccount}
                onChange={handleChange}
                placeholder="Enter Bank Account"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Designation</Form.Label>
              <Form.Select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              >
                <option value="">Select Designation</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Emergency Contacts */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact 1</Form.Label>
              <Form.Control
                type="text"
                name="emergencyContact1"
                value={formData.emergencyContact1}
                onChange={handleChange}
                placeholder="Enter Contact"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                name="relation1"
                value={formData.relation1}
                onChange={handleChange}
                placeholder="Enter Relation"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation Name</Form.Label>
              <Form.Control
                type="text"
                name="relationName1"
                value={formData.relationName1}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Emergency Contact 2 */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Contact 2</Form.Label>
              <Form.Control
                type="text"
                name="emergencyContact2"
                value={formData.emergencyContact2}
                onChange={handleChange}
                placeholder="Enter Contact"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation</Form.Label>
              <Form.Control
                type="text"
                name="relation2"
                value={formData.relation2}
                onChange={handleChange}
                placeholder="Enter Relation"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Relation Name</Form.Label>
              <Form.Control
                type="text"
                name="relationName2"
                value={formData.relationName2}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Revision, CTC, Addresses */}
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Revision Month</Form.Label>
              <Form.Select
                name="revision"
                value={formData.revision}
                onChange={handleChange}
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>CTC</Form.Label>
              <Form.Control
                type="text"
                name="ctc"
                value={formData.ctc}
                onChange={handleChange}
                placeholder="Enter CTC"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleChange}
                placeholder="Enter Permanent Address"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Form.Group className="mb-3">
              <Form.Label>Present Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="presentAddress"
                value={formData.presentAddress}
                onChange={handleChange}
                placeholder="Enter Present Address"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button
            variant="secondary"
            type="button"
            onClick={() =>
              setFormData({
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
              })
            }
          >
            Reset
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save / Update"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default RegistrationDetailsForm;
