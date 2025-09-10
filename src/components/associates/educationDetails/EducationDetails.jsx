import axios from "axios";
import { useEffect, useState } from "react";
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
  const [educations, setEducations] = useState([]);


  // Fetch educations (already in your code)
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

  // Handle associate number change
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

    // Reset form after submission
    setFormData({
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
              >
                <option value="" disabled>
                  Select Qualification
                </option>
                {educations.map((edu) => (
                  <option key={edu._id} value={edu.name}>
                    {edu.name} ({edu.category})
                  </option>
                ))}
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
              <Form.Select
                name="enrolledYear"
                value={formData.enrolledYear}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Enrolled Year
                </option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>

              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Year of Passing</Form.Label>
              <Form.Select
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select Year of Passing
                </option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>

              </Form.Select>
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
