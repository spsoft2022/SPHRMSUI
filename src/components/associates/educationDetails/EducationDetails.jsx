import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, ListGroup, Row, Spinner, Table } from "react-bootstrap";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

import ButtonComponent from "../../shared/ButtonComponent";
import InputField from "../../shared/InputField";
import SelectField from "../../shared/SelectField";

const EducationDetails = () => {
  const [formData, setFormData] = useState({
    qualification: "",
    specialization: "",
    boardName: "",
    instituteName: "",
    universityName: "",
    enrolledYear: "",
    yearOfPassing: "",
    percentage: "",
  });

  const [educations, setEducations] = useState([]); // master education list
  const [suggestions, setSuggestions] = useState([]); // associate search
  const [isAssociateValid, setIsAssociateValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [associateNo, setAssociateNo] = useState("");
  const [educationTableData, setEducationTableData] = useState([]); // store table data
  const [showModal, setShowModal] = useState(false);
  const [viewDocument, setViewDocument] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);

  // ---------------- Fetch master education list ----------------
  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/educations");
      setEducations(res.data);
    } catch (err) {
      console.error("Error fetching educations:", err);
    }
  };

  // ---------------- Handle associate input ----------------
  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only numbers
    setAssociateNo(value);
    setIsAssociateValid(false);
  };

  // ---------------- Fetch associate suggestions ----------------
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

  // ---------------- Handle input changes ----------------
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- Handle form submission ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { associateNo, ...formData };
      const res = await axios.post("http://localhost:5000/associates/education", payload);

      if (res.status === 201) {
        alert("✅ Education details saved successfully");

        // Add the new data to the table
        setEducationTableData([
          ...educationTableData,
          {
            associateNo,
            qualification: formData.qualification,
            specialization: formData.specialization,
            boardName: formData.boardName,
            instituteName: formData.instituteName,
            universityName: formData.universityName,
            enrolledYear: formData.enrolledYear,
            yearOfPassing: formData.yearOfPassing,
            percentage: formData.percentage,
          },
        ]);

        // Clear form data
        setFormData({
          qualification: "",
          specialization: "",
          boardName: "",
          instituteName: "",
          universityName: "",
          enrolledYear: "",
          yearOfPassing: "",
          percentage: "",
        });
      }
    } catch (err) {
      console.error("Error saving education:", err);
      alert("❌ Failed to save education details");
    }
  };

  // ---------------- Handle select associate ----------------
  const handleSelectAssociate = (assoc) => {
    // Set the associate number
    setAssociateNo(assoc.associateNo);

    // Clear any previous suggestions
    setSuggestions([]);

    // Optionally, if you need to fetch additional details about the selected associate, you can do that here.
    // For now, we just set the associate as valid.
    setIsAssociateValid(true);

    // Optionally, blur the input to remove focus once a selection is made
    document.activeElement.blur();
  };
  const handleView = (data) => {
    if (data && data.document) {
      setViewDocument(data.document);
      setShowModal(true);
    } else {
      alert("No document available for this education entry.");
    }
  };

  const handleEdit = (data) => {};

  const handleDelete = (associateNo) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Associate No: ${associateNo}?`);
    if (confirmDelete) {
      setSubmittedData(null); // Optionally remove the deleted data from state
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* Associate Number */}
        <Row className="mb-3">
          <Col md={4} className="position-relative">
            <Form.Group className="mb-3">
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
            <h5 className="mt-4 mb-3">Add Education Details</h5>

            <Row>
              <Col md={4}>
                <SelectField
                  label="Qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  options={educations.map((edu) => ({
                    value: edu.name,
                    label: `${edu.name} (${edu.category})`,
                  }))}
                  placeholder="Select Qualification"
                  required
                />
              </Col>

              <Col md={4}>
                <InputField
                  label="Specialization"
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  placeholder="Enter Specialization"
                />
              </Col>

              <Col md={4}>
                <InputField
                  label="Board Name"
                  type="text"
                  name="boardName"
                  value={formData.boardName}
                  onChange={handleChange}
                  placeholder="Enter Board Name"
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <InputField
                  label="Institute Name"
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  placeholder="Enter Institute Name"
                />
              </Col>

              <Col md={4}>
                <InputField
                  label="University Name"
                  type="text"
                  name="universityName"
                  value={formData.universityName}
                  onChange={handleChange}
                  placeholder="Enter University Name"
                />
              </Col>

              <Col md={4}>
                <SelectField
                  label="Enrolled Year"
                  name="enrolledYear"
                  value={formData.enrolledYear}
                  onChange={handleChange}
                  options={["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"].map(
                    (year) => ({ value: year, label: year })
                  )}
                  placeholder="Select Enrolled Year"
                  required
                />
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <SelectField
                  label="Year of Passing"
                  name="yearOfPassing"
                  value={formData.yearOfPassing}
                  onChange={handleChange}
                  options={["2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"].map(
                    (year) => ({ value: year, label: year })
                  )}
                  placeholder="Select Year of Passing"
                  required
                />
              </Col>

              <Col md={4}>
                <InputField
                  label="Percentage"
                  type="text"
                  name="percentage"
                  value={formData.percentage}
                  onChange={handleChange}
                  placeholder="Enter Percentage"
                />
              </Col>
            </Row>

            <div className="text-center mt-3">
              <ButtonComponent label="CREATE" type="submit" variant="primary" className="mt-2" />
            </div>
          </>
        )}
      </Form>

      {/* Table to show education data */}
      {educationTableData.length > 0 && (
        <div className="mt-4">
          <Table bordered>
            <thead>
              <tr>
                <th>Qualification</th>
                <th>Specialization</th>
                <th>Board Name</th>
                <th>Institute Name</th>
                <th>University Name</th>
                <th>Enrolled Year</th>
                <th>Year of Passing</th>
                <th>Percentage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educationTableData.map((edu, index) => (
                <tr key={index}>
                  <td>{edu.qualification}</td>
                  <td>{edu.specialization}</td>
                  <td>{edu.boardName}</td>
                  <td>{edu.instituteName}</td>
                  <td>{edu.universityName}</td>
                  <td>{edu.enrolledYear}</td>
                  <td>{edu.yearOfPassing}</td>
                  <td>{edu.percentage}</td>
                  <td>
                    <FaEye
                      size={15}
                      className="me-3 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleView(edu)} // View document
                    />
                    <FaEdit
                      size={15}
                      className="me-3 text-warning"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(edu)} // Edit details
                    />
                    <FaTrashAlt
                      size={15}
                      className="me-3 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(edu.associateNo)} // Delete data
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default EducationDetails;
