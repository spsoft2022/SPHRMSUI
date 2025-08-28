import React, { useState } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

const EducationDetails = () => {
  const [formData, setFormData] = useState({
    associateNo: "",
    qualification: "",
    specialization: "",
    boardName: "",
    instituteName: "",
    universityName: "",
    enrolledYear: "",
    yearOfPassing: "",
    percentage: "",
  });

  const [records, setRecords] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved Data:", formData);

    setRecords([...records, { ...formData }]);

    // reset except associateNo
    setFormData({
      ...formData,
      qualification: "",
      specialization: "",
      boardName: "",
      instituteName: "",
      universityName: "",
      enrolledYear: "",
      yearOfPassing: "",
      percentage: "",
    });
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <h4 className="mb-3">Add Education Details</h4>

      <Form onSubmit={handleSubmit}>
        {/* Associate Number */}
        <Form.Group className="mb-3">
          <Form.Label>Associate No</Form.Label>
          <Form.Control
            type="text"
            name="associateNo"
            value={formData.associateNo}
            onChange={handleChange}
            placeholder="Enter Associate No"
            required
          />
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Select name="qualification" value={formData.qualification} onChange={handleChange} required>
                <option value="">Select Qualification</option>
                <option value="10th Class">10th Class</option>
                <option value="12th Class/Intermediate">12th Class/Intermediate</option>
                <option value="Graduation">Graduation</option>
                <option value="Post Graduation">Post Graduation</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Enter Specialization"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                name="boardName"
                value={formData.boardName}
                onChange={handleChange}
                placeholder="Enter Board Name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Institute Name</Form.Label>
              <Form.Control
                type="text"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                placeholder="Enter Institute Name"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>University Name</Form.Label>
              <Form.Control
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                placeholder="Enter University Name"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Enrolled Year</Form.Label>
              <Form.Control
                type="text"
                name="enrolledYear"
                value={formData.enrolledYear}
                onChange={handleChange}
                placeholder="Enter Enrolled Year"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Year of Passing</Form.Label>
              <Form.Control
                type="text"
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleChange}
                placeholder="Enter Year of Passing"
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Percentage</Form.Label>
              <Form.Control
                type="text"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                placeholder="Enter Percentage"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-2">
          CREATE
        </Button>
      </Form>

      {/* Table below */}
      {records.length > 0 && (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Associate No</th>
              <th>Qualification</th>
              <th>Specialization</th>
              <th>Institute</th>
              <th>Board</th>
              <th>University</th>
              <th>Enrolled Year</th>
              <th>Year of Passing</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {records.map((rec, index) => (
              <tr key={index}>
                <td>{rec.associateNo}</td>
                <td>{rec.qualification}</td>
                <td>{rec.specialization}</td>
                <td>{rec.instituteName}</td>
                <td>{rec.boardName}</td>
                <td>{rec.universityName}</td>
                <td>{rec.enrolledYear}</td>
                <td>{rec.yearOfPassing}</td>
                <td>{rec.percentage}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default EducationDetails;
