import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const AssociateExitForm = () => {
  return (
    <Form style={{ margin: "0 auto" }}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Associate No</Form.Label>
            <Form.Control type="text" placeholder="Enter Associate No" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date of Resignation</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Working Day</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Control as="textarea" rows={1} placeholder="Enter Reason" />
          </Form.Group>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
};

export default AssociateExitForm;
