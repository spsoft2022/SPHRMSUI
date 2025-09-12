import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaEye, FaPaperclip } from "react-icons/fa";
import { Modal, Button, Table, Spinner, ListGroup, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import InputField from "../../shared/InputField";
import ButtonComponent from "../../shared/ButtonComponent";

function EmploymentDetailsForm() {
  const [associateNo, setAssociateNo] = useState("");
  const [employment, setEmployment] = useState({
    dateOfJoining: "",
    lastWorkingDate: "",
    organizationName: "",
    workLocation: "",
  });
  const [document, setDocument] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isAssociateValid, setIsAssociateValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // For modal view
  const [showModal, setShowModal] = useState(false);
  const [viewDocument, setViewDocument] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployment({ ...employment, [name]: value });
  };

  const handleAssociateChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove non-digits
    setAssociateNo(value);
    setIsAssociateValid(false); // reset until user selects
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

  const handleSelectAssociate = (assoc) => {
    setAssociateNo(assoc.associateNo); // fill input
    setIsAssociateValid(true); // show form
    setSuggestions([]); // clear suggestions
  };

  const handleFileChange = (e) => {
    setDocument(e.target.files[0]); // Store the selected file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!associateNo) {
      alert("Please enter Associate No!");
      return;
    }

    const formData = new FormData();
    formData.append("associateNo", associateNo);
    formData.append("dateOfJoining", employment.dateOfJoining);
    formData.append("lastWorkingDate", employment.lastWorkingDate);
    formData.append("organizationName", employment.organizationName);
    formData.append("workLocation", employment.workLocation);

    if (document) {
      formData.append("document", document); // Append file if selected
    }

    try {
      const response = await axios.post("http://localhost:5000/associates/employment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        setSubmittedData({
          associateNo,
          dateOfJoining: employment.dateOfJoining,
          lastWorkingDate: employment.lastWorkingDate,
          organizationName: employment.organizationName,
          workLocation: employment.workLocation,
          document: document ? document.name : "No file uploaded",
        });
      }
       setEmployment({
        dateOfJoining: "",
        lastWorkingDate: "",
        organizationName: "",
        workLocation: "",
      }); // Clear employment details fields
    } catch (error) {
      console.error("Error submitting employment data:", error);
    }
  };

  // Action Handlers for Edit, View, Delete
  const handleView = (data) => {
    // Show modal with the uploaded document
    setViewDocument(data.document); // Set the document to view
    setShowModal(true); // Open the modal
  };

  const handleEdit = (data) => {
  };

  const handleDelete = (associateNo) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete Associate No: ${associateNo}?`);
    if (confirmDelete) {
      setSubmittedData(null); // Optionally remove the deleted data from state
    }
  };

  const handleCloseModal = () => setShowModal(false); // Close modal

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
            <h5 className="mt-4 mb-3">Add Professional Details</h5>

            <div className="row">
              <div className="col-md-3">
                <InputField
                  label="Date of Joining"
                  type="date"
                  name="dateOfJoining"
                  value={employment.dateOfJoining}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <InputField
                  label="Last Working Date"
                  type="date"
                  name="lastWorkingDate"
                  value={employment.lastWorkingDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <InputField
                  label="Organization Name"
                  type="text"
                  name="organizationName"
                  value={employment.organizationName}
                  onChange={handleChange}
                  placeholder="Enter Organization Name"
                />
              </div>

              <div className="col-md-3">
                <InputField
                  label="Work Location"
                  type="text"
                  name="workLocation"
                  value={employment.workLocation}
                  onChange={handleChange}
                  placeholder="Enter Work Location"
                />
              </div>
            </div>

            {/* Document Upload with working label */}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
                <FaPaperclip size={15} className="me-2" />
                Upload Document
              </Form.Label>
              <Form.Control
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

            </Form.Group>


            <div className="text-center mt-3">
              <ButtonComponent
                label="CREATE"
                type="submit"
                variant="primary"
                className="mt-2"
              />
            </div>
          </>
        )}
      </Form>

      {/* Table to show submitted data */}
      {submittedData && (
        <div className="mt-4">
          <Table  bordered>
            <thead>
              <tr>
                <th>Associate No</th>
                <th>Date of Joining</th>
                <th>Last Working Date</th>
                <th>Organization Name</th>
                <th>Work Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{submittedData.associateNo}</td>
                <td>{submittedData.dateOfJoining}</td>
                <td>{submittedData.lastWorkingDate}</td>
                <td>{submittedData.organizationName}</td>
                <td>{submittedData.workLocation}</td>
                <td>
                  <FaEye
                    size={2}
                    className="me-3 text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleView(submittedData)} // View document
                  />
                  <FaEdit
                    size={2}
                    className="me-3 text-warning"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEdit(submittedData)} // Edit details
                  />
                  <FaTrashAlt
                    size={2}
                    className="me-3 text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(submittedData.associateNo)} // Delete data
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}


      {/* Modal for viewing document */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Uploaded Document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewDocument ? (
            <div>
              {/* Display the document name and use it as the link text */}
              <a href={URL.createObjectURL(document)} target="_blank" rel="noopener noreferrer">
                {document.name} {/* This will show the document name */}
              </a>
            </div>
          ) : (
            <p>No document uploaded</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default EmploymentDetailsForm;
