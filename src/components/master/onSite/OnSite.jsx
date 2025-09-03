import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomTable from "../../shared/customtable/CustomTable";

function OnSite() {
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ clientName: "", clientLocation: "" });
  const [editClientId, setEditClientId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/clients");
      setClients(res.data);
    } catch (err) {
      console.error("Error fetching clients:", err);
      toast.error("Failed to fetch clients!");
    }
  };

  const handleCreate = async () => {
    if (!formData.clientName || !formData.clientLocation) {
      toast.warning("Please fill all fields!");
      return;
    }

    // ✅ Check for duplicate by Name or Location
    const isDuplicate = clients.some(
      (c) =>
        c.clientName.toLowerCase() === formData.clientName.toLowerCase() ||
        c.clientLocation.toLowerCase() === formData.clientLocation.toLowerCase()
    );

    if (isDuplicate) {
      toast.error("Client with same name or location already exists!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/clients/add", formData);
      toast.success("Client created successfully!");
      fetchClients();
      resetForm();
    } catch (err) {
      console.error("Error creating client:", err);
      toast.error("Failed to create client!");
    }
  };

  const handleUpdate = async () => {
    if (!formData.clientName || !formData.clientLocation) {
      toast.warning("Please fill all fields!");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/clients/update/${editClientId}`, formData);
      toast.success("Client updated successfully!");
      fetchClients();
      resetForm();
    } catch (err) {
      console.error("Error updating client:", err);
      toast.error("Failed to update client!");
    }
  };

  const handleEditClick = async (client) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/clients/${client.clientId}`);
      const clientData = res.data;

      setEditClientId(clientData.clientId);
      setFormData({
        clientName: clientData.clientName,
        clientLocation: clientData.clientLocation,
      });
      setShowForm(true);
    } catch (err) {
      console.error("Error fetching client details:", err);
      toast.error("Failed to load client details!");
    }
  };

  const resetForm = () => {
    setFormData({ clientName: "", clientLocation: "" });
    setEditClientId(null);
    setShowForm(false);
  };

  return (
    <div className="container mt-4">
      <h2>OnSite Clients</h2>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {showForm ? (
        <div className="card p-3 mb-3">
          <input
            type="text"
            placeholder="Client Name"
            className="form-control mb-2"
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Client Location"
            className="form-control mb-2"
            value={formData.clientLocation}
            onChange={(e) => setFormData({ ...formData, clientLocation: e.target.value })}
          />
          <div>
            {editClientId ? (
              <button className="btn btn-warning me-2" onClick={handleUpdate}>
                Update
              </button>
            ) : (
              <button className="btn btn-success me-2" onClick={handleCreate}>
                Create
              </button>
            )}
            <button className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <CustomTable
          columns={[
            { field: "clientId", label: "Client ID" },
            { field: "clientName", label: "Client Name" },
            { field: "clientLocation", label: "Client Location" },
          ]}
          data={clients}
          onEdit={handleEditClick}
          createAction={
            <i
              className="fa-solid fa-user-plus p-2 rounded-3"
              style={{
                fontSize: "15px",
                backgroundColor: "#2199e8",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => setShowForm(true)}
            ></i>
          }
        />
      )}
    </div>
  );
}

export default OnSite;
