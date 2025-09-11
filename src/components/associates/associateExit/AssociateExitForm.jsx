
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";

const AssociateExitForm = () => {
  const [associateNo, setAssociateNo] = useState("");
  const [formData, setFormData] = useState({
    resignationDate: "",
    lastWorkingDay: "",
    reason: "",
  });
  const [suggestions, setSuggestions] = useState([]);
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

  // Handle other input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      associateNo,
      ...formData,
    };
    console.log("Associate Exit Details:", finalData);
  };

  return (
    <Form style={{ margin: "0 auto" }} onSubmit={handleSubmit}>
      <Row>
        <Col md={6} className="position-relative">
          <Form.Group className="mb-3">
            <Form.Label>Associate No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Associate No"
              value={associateNo}
              onChange={handleAssociateChange}
              required
            />
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

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Date of Resignation</Form.Label>
            <Form.Control
              type="date"
              name="resignationDate"
              value={formData.resignationDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Last Working Day</Form.Label>
            <Form.Control
              type="date"
              name="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Enter Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="text-center mt-3">
        <Button variant="primary" type="submit">
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default AssociateExitForm;


