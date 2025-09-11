import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

function FamilyDetailsForm() {
  const [associateNo, setAssociateNo] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
  const [isAssociateValid, setIsAssociateValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Allow only numbers for Associate No
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Form submitted!");
  };

  const handleReset = () => {
    setFormData({
      fatherName: "",
      fatherDob: "",
      fatherAadhar: "",
      fatherMobile: "",
      motherName: "",
      motherDob: "",
      motherAadhar: "",
      motherMobile: "",
    });
    setAssociateNo("");
    setIsAssociateValid(false);
    setSuggestions([]);
  };

  return (
    <div className="container mt-4">
      <Form onSubmit={handleSubmit}>
        {/* Associate Number */}
        <Row className="mb-3">
          <Col md={4} className="position-relative">
            <Form.Group className="mb-3" controlId="associateNo">
              <Form.Label>Associate No</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Enter Associate No"
                  value={associateNo}
                  onChange={handleAssociateChange}
                  required
                  autoComplete="off"
                />
                {loading && <Spinner animation="border" size="sm" className="ms-2" />}
              </div>
            </Form.Group>

            {/* Suggestions Dropdown */}
            {/* Suggestions Dropdown */}
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
        </Row>

        {isAssociateValid && (
          <>
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
              <Button variant="danger" className="me-2" type="reset" onClick={handleReset}>
                CANCEL
              </Button>
              <Button variant="primary" type="submit">
                UPDATE
              </Button>
            </div>
          </>
        )}
      </Form>
    </div>
  );
}

export default FamilyDetailsForm;
