import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

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
    const { name, value } = e.target;

    // Only allow numbers for associateNo
    if (name === "associateNo") {
      const onlyNumbers = value.replace(/\D/g, ""); // remove non-numeric
      setFormData({
        ...formData,
        [name]: onlyNumbers,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
    <div>
      <Form onSubmit={handleSubmit}>
        {/* Associate Number */}
        <Row className="mb-3">
          <Col md={4}>
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
          </Col>
        </Row>
        <h5 className="mt-4 mb-3">Add Education Details</h5>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                required
                className={formData.qualification === "" ? "placeholder-select" : ""}
              >
                <option value="" disabled>
                  Select Qualification
                </option>
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
        <div className="text-center mt-3">
          <Button type="submit" variant="primary" className="mt-2">
            CREATE
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EducationDetails;
