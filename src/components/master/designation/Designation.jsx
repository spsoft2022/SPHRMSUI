import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import CustomTable from "../../shared/customtable/CustomTable";

function Designation() {
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const columns = [
    { field: "designationId", label: "Designation Id" },
    { field: "name", label: "Designation Name" },
    { field: "code", label: "Designation Code" },
  ];

  // Fetch all data
  useEffect(() => {
    fetchAll();
  }, []);

  // Fetch all designations data
  const fetchAll = async () => {
    try {
      const response = await fetch("http://localhost:5000/associates/designations");
      const result = await response.json();
      if (!result.isError && Array.isArray(result.result)) {
        setData(result.result);
      }
    } catch (error) {
      console.error("Error fetching designations:", error);
    }
  };

  // Fetch a specific designation by its ID and set it to editing state
  const handleEdit = async (row) => {
    try {
      const response = await fetch(`http://localhost:5000/associates/designations/${row.designationId}`);
      const result = await response.json();
      if (!result.isError) {
        setEditingRow(result.result);
      }
    } catch (error) {
      console.error("Error fetching designation by id:", error);
    }
  };

  // Update an existing designation by sending PUT request with edited data
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/associates/update/${editingRow.designationId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingRow),
      });

      const result = await response.json();

      if (!result.isError) {
        setEditingRow(null);
        await fetchAll();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating designation:", error);
    }
  };

  // Create a new designation by sending POST request with new data
  const handleCreate = async () => {
  try {
    const response = await fetch("http://localhost:5000/associates/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingRow),
    });

    const result = await response.json();

    if (!result.isError) {
      setIsAdding(false);
      setEditingRow(null);
      await fetchAll();
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error("Error creating designation:", error);
  }
};


  return (
    <div className="container mt-3">
      <h3>{isAdding ? "Add Designation" : editingRow ? "Edit Designation" : "Designation"}</h3>

      {/* Show Table */}
      {!editingRow && !isAdding && (
        <CustomTable
          columns={columns}
          data={data}
          onEdit={handleEdit}
          extraAction={
            <i
              className="fa-solid fa-user-plus p-2 rounded-3"
              style={{
                fontSize: "15px",
                backgroundColor: "#2199e8",
                cursor: "pointer",
                color: "#fff",
              }}
              onClick={() => {
                setEditingRow({ code: "", name: "" });
                setIsAdding(true);
              }}
            ></i>
          }
        />
      )}

      {/* Add / Edit Form */}
      {(editingRow || isAdding) && (
        <div className="mt-3">
          <div className="row my-4">
            <div className="col-md-6">
              <label>Designation Code</label>
              <input
                type="text"
                className="form-control"
                placeholder={isAdding ? "Enter designation code" : ""}
                value={editingRow?.code || ""}
                onChange={(e) => setEditingRow({ ...editingRow, code: e.target.value })}
              />
            </div>

            <div className="col-md-6">
              <label>Designation Name</label>
              <input
                type="text"
                className="form-control"
                placeholder={isAdding ? "Enter designation name" : ""}
                value={editingRow?.name || ""}
                onChange={(e) => setEditingRow({ ...editingRow, name: e.target.value })}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <Button
              type="reset"
              variant="danger"
              className="me-2"
              onClick={() => {
                setEditingRow(null);
                setIsAdding(false);
              }}
            >
              CANCEL
            </Button>
            <Button type="submit" variant="primary" onClick={isAdding ? handleCreate : handleUpdate}>
              {isAdding ? "CREATE" : "UPDATE"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Designation;
