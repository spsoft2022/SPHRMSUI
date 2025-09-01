import { useEffect, useState } from "react";

import CustomTable from "../../shared/customtable/CustomTable";

function Designation() {
  const [data, setData] = useState([]);
  const columns = [
    { field: "designationId", label: "Designation Id" },
    { field: "name", label: "Designation Name" },
    { field: "code", label: "Designation Code" },
  ];

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const handleEdit = (row) => {
    console.log("Edit clicked:", row);
    // open modal or navigate to edit page
  };

  return (
    <div className="container mt-3">
      <h3>Designation</h3>
      <CustomTable columns={columns} data={data} onEdit={handleEdit} />
    </div>
  );
}

export default Designation;
