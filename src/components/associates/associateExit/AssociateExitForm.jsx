import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, ListGroup, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import InputField from "../../shared/InputField";
import ButtonComponent from "../../shared/ButtonComponent";

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
    const value = e.target.value.replace(/\D/g, "");
    setAssociateNo(value);
    setIsAssociateValid(false);
    setFormData({ resignationDate: "", lastWorkingDay: "", reason: "" }); // reset form
  };

  // Fetch matching associates
  const fetchAssociates = async (number) => {
    if (!number) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/associates/search/${number}`
      );
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

  // Select associate from dropdown
  const handleSelectAssociate = async (assoc) => {
    setAssociateNo(assoc.associateNo);
    setIsAssociateValid(true);
    setSuggestions([]);
    document.activeElement.blur();

    try {
      // Fetch existing exit details
      const res = await axios.get(
        `http://localhost:5000/associates/exit/${assoc.associateNo}`
      );
      if (res.status === 200 && res.data) {
        setFormData({
          resignationDate: res.data.resignationDate
            ? res.data.resignationDate.split("T")[0]
            : "",
          lastWorkingDay: res.data.lastWorkingDay
            ? res.data.lastWorkingDay.split("T")[0]
            : "",
          reason: res.data.reason || "",
        });
        toast.info(" Exit details already exist. You can update them.");
      } else {
        setFormData({ resignationDate: "", lastWorkingDay: "", reason: "" });
      }
    } catch (err) {
      // No exit details yet
      setFormData({ resignationDate: "", lastWorkingDay: "", reason: "" });
    }
  };

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalData = { associateNo, ...formData };
      const res = await axios.post(
        "http://localhost:5000/associates/exit",
        finalData
      );
      toast.success(res.data.message || "Exit details saved successfully ✅");
    } catch (err) {
      toast.error(err.response?.data?.message || " Error saving exit details");
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Associate Exit Form</h3>
      <Form style={{ margin: "0 auto" }} onSubmit={handleSubmit}>
        <Row>
          <Col md={6} className="position-relative">
            <InputField
              label="Associate No"
              type="text"
              name="associateNo"
              value={associateNo}
              onChange={handleAssociateChange}
              placeholder="Enter Associate No"
              required
            />
            {suggestions.length > 0 && (
              <ListGroup
                className="position-absolute w-100"
                style={{ zIndex: 1000 }}
              >
                {suggestions.map((assoc) => (
                  <ListGroup.Item
                    key={assoc._id}
                    action
                    onClick={() => handleSelectAssociate(assoc)}
                  >
                    {assoc.associateNo} - {assoc.initiation?.fullName}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={6}>
            <InputField
              label="Date of Resignation"
              type="date"
              name="resignationDate"
              value={formData.resignationDate}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <InputField
              label="Last Working Day"
              type="date"
              name="lastWorkingDay"
              value={formData.lastWorkingDay}
              onChange={handleChange}
              required
            />
          </Col>

          <Col md={6}>
            <InputField
              label="Reason"
              as="textarea"
              rows={1}
              placeholder="Enter Reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        {isAssociateValid && (
          <div className="text-center mt-3">
            <ButtonComponent
              variant="primary"
              type="submit"
              disabled={loading}
              label={formData.resignationDate ? "Update" : "Create"}
            />
          </div>
        )}
      </Form>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} newestOnTop />
    </div>
  );
};

export default AssociateExitForm;
