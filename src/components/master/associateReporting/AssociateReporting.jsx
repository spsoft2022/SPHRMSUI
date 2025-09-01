import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

function AssociateReporting() {
  const [departments, setDepartments] = useState([]);
  const [departmentHeads, setDepartmentHeads] = useState([]);
  const [formData, setFormData] = useState({
    departmentName: "",
    departmentHead: "",
  });

  // Fetch departments
useEffect(() => {
    axios
      .get("http://localhost:5000/associates/departments")
      .then((res) => {
        console.log("Departments fetched:", res.data.data); 
        setDepartments(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
      });
  }, []);

  // Fetch department heads
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/department-heads")
  //     .then((res) => {
  //       setDepartmentHeads(res.data.data || []);
  //     })
  //     .catch((err) => console.error("Error fetching department heads:", err));
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Data:", formData);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Department Name</Form.Label>
              <Form.Select
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Department Name
                </option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Department Head</Form.Label>
              <Form.Select
                name="departmentHead"
                value={formData.departmentHead}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Department Head
                </option>
                {departmentHeads.map((head, index) => (
                  <option key={index} value={head.name}>
                    {head.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Centered CREATE button */}
        <div className="d-flex justify-content-center mt-3">
          <Button type="submit" variant="primary">
            CREATE
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AssociateReporting;
