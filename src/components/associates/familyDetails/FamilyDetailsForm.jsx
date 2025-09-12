import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, ListGroup, Row, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

import ButtonComponent from "../../shared/ButtonComponent";
import InputField from "../../shared/InputField";

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

  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setAssociateNo(value);
    setIsAssociateValid(false);
  };

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

  // Fetch family details for a selected associate
  const fetchFamilyDetails = async (number) => {
    try {
      const response = await axios.get(`http://localhost:5000/associates/family/${number}`);
      if (response.status === 200 && response.data) {
        setFormData({
          fatherName: response.data.fatherName || "",
          fatherDob: response.data.fatherDob ? response.data.fatherDob.substring(0, 10) : "",
          fatherAadhar: response.data.fatherAadhar || "",
          fatherMobile: response.data.fatherMobile || "",
          motherName: response.data.motherName || "",
          motherDob: response.data.motherDob ? response.data.motherDob.substring(0, 10) : "",
          motherAadhar: response.data.motherAadhar || "",
          motherMobile: response.data.motherMobile || "",
        });
      } else {
        // no family data, reset fields
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
      }
    } catch (error) {
      console.error("No family details found:", error);
      // reset if not found
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
    }
  };

  // When user selects from dropdown
  const handleSelectAssociate = (assoc) => {
    setAssociateNo(assoc.associateNo);
    setIsAssociateValid(true);
    setSuggestions([]);
    fetchFamilyDetails(assoc.associateNo); // fetch and populate family details
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/associates/family", {
        associateNo,
        ...formData,
      });
      if (response.status === 201) {
        toast.success("Family details saved successfully!");
        handleReset();
      }
    } catch (error) {
      console.error("Error saving family details:", error);
      toast.error(error.response?.data?.message || "Failed to save family details");
    }
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
            <Row className="mb-3">
              <Col md={4}>
                <InputField
                  label="Father Name"
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  placeholder="Enter Father Name"
                />
              </Col>
              <Col md={4}>
                <InputField
                  label="Date of Birth"
                  type="date"
                  name="fatherDob"
                  value={formData.fatherDob}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <InputField
                  label="Aadhaar Number"
                  type="text"
                  name="fatherAadhar"
                  value={formData.fatherAadhar}
                  onChange={handleChange}
                  placeholder="Enter Aadhaar No"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <InputField
                  label="Mobile Number"
                  type="text"
                  name="fatherMobile"
                  value={formData.fatherMobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <InputField
                  label="Mother Name"
                  type="text"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  placeholder="Enter Mother Name"
                />
              </Col>
              <Col md={4}>
                <InputField
                  label="Date of Birth"
                  type="date"
                  name="motherDob"
                  value={formData.motherDob}
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <InputField
                  label="Aadhaar Number"
                  type="text"
                  name="motherAadhar"
                  value={formData.motherAadhar}
                  onChange={handleChange}
                  placeholder="Enter Aadhaar No"
                />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <InputField
                  label="Mobile Number"
                  type="text"
                  name="motherMobile"
                  value={formData.motherMobile}
                  onChange={handleChange}
                  placeholder="Enter Mobile Number"
                />
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-4">
              <ButtonComponent type="reset" variant="danger" label="RESET" className="me-2" onClick={handleReset} />
              <ButtonComponent type="submit" variant="primary" label="CREATE" />
            </div>
          </>
        )}
      </Form>
    </div>
  );
}
export default FamilyDetailsForm;
