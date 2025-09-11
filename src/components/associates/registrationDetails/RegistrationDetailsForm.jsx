import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";

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
  const [associateNo, setAssociateNo] = useState("");

  // const [loading, setLoading] = useState(false);
  const [designations, setDesignations] = useState([]); // State for storing designations
  const [associates, setAssociates] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isAssociateValid, setIsAssociateValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch designations from the API
  const fetchDesignations = async () => {
    try {
      const [designationsRes, associatesRes] = await Promise.all([
        axios.get("http://localhost:5000/associates/designations"),
        axios.get("http://localhost:5000/associates/allAssociates"),
      ]);

      console.log("Fetched designations:", designationsRes.data);
      console.log("Fetched associates:", associatesRes.data);

      if (designationsRes.status === 200) {
        const fetchedDesignations = designationsRes.data.result || [];
        setDesignations(fetchedDesignations);
      }

      if (associatesRes.status === 200) {
        const fetchedAssociates = associatesRes.data.data || [];
        setAssociates(fetchedAssociates); // make sure you have state for associates
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    setAssociateNo(value);
    setIsAssociateValid(false); // reset until user selects
  };

  // Fetch matching associates immediately (no debounce)
  const fetchAssociates = async (number) => {
    if (!number) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/associates/search/${number}`);
      if (response.status === 200) {
        setSuggestions(response.data);
      }
    } catch (error) {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (associateNo) {
      fetchAssociates(associateNo);
    } else {
      setSuggestions([]);
    }
  }, [associateNo]);

  // When user selects from dropdown
  const handleSelectAssociate = (assoc) => {
    setAssociateNo(assoc.associateNo); // fill input
    setIsAssociateValid(true); // show form
    setSuggestions([]); // clear suggestions
    document.activeElement.blur(); // remove focus from input (closes dropdown neatly)
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save or update registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/associates/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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

  // Fetch designations when component mounts
  useEffect(() => {
    fetchDesignations(); // Fetch designations when the component mounts
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Associate Registration</h3>
      <Form onSubmit={handleSubmit}>
        {/* First Row */}
        <Row>
          <Col md={4} className="position-relative">
            <Form.Group className="mb-3">
              <Form.Label>Associate No</Form.Label>
              <Form.Control
                type="text"
                name="associateNo"
                value={associateNo}
                onChange={handleAssociateChange}
                // onBlur={fetchRegistration} // auto-fetch on blur
                placeholder="Enter Associate No"
                required
              />
            </Form.Group>
            {suggestions.length > 0 && (
              <ListGroup className="position-absolute w-100" style={{ zIndex: 1000 }}>
                {suggestions.map((assoc) => (
                  <ListGroup.Item key={assoc._id} action onClick={() => handleSelectAssociate(assoc)}>
                    {assoc.associateNo} - {assoc.initiation?.fullName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
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
              <Form.Select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
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
              <Form.Select name="designation" value={formData.designation} onChange={handleChange}>
                <option value="">Select Designation</option>
                {Array.isArray(designations) && designations.length > 0 ? (
                  designations.map((designation) => (
                    <option key={designation.designationId} value={designation.name}>
                      {designation.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No Designations Available</option>
                )}
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
              <Form.Select name="revision" value={formData.revision} onChange={handleChange}>
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
