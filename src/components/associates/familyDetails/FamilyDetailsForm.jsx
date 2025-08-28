import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const FamilyDetailsForm = () => {
  return (
    <Form style={{ margin: "0 auto" }}>
      {/* Associate Number */}
      <Form.Group className="mb-3">
        <Form.Label>Associate No</Form.Label>
        <Form.Control type="text" placeholder="Enter Associate No" />
      </Form.Group>

      <p>
        <strong>Please Update Family Details</strong>
      </p>

      {/* Parent Details */}
      <h5 className="mt-3 mb-3">
        <strong>Parent Details</strong>
      </h5>

      {/* Father Row */}
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Father Name" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Aadhaar No" />
          </Form.Group>
        </Col>
      </Row>

      {/* Father Mobile */}
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Mobile Number" />
          </Form.Group>
        </Col>
      </Row>

      {/* Mother Row */}
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Mother Name" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="date" />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Aadhaar No" />
          </Form.Group>
        </Col>
      </Row>

      {/* Mother Mobile */}
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Mobile Number" />
          </Form.Group>
        </Col>
      </Row>

      {/* Buttons */}
      <div className="d-flex justify-content-center mt-4">
        <Button variant="danger" className="me-3">
          Cancel
        </Button>
        <Button variant="primary">Update</Button>
      </div>
    </Form>
  );
};

export default FamilyDetailsForm;
