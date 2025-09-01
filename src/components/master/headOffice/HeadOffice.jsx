import React, { useEffect, useState } from "react";
import CustomTable from "../../shared/customtable/CustomTable";

function HeadOffices() {  // <-- Uppercase H
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
  { field: "headOfficeId", label: "Head Office ID" },
  { field: "headOfficeLocation", label: "Location" },
  { field: "headOfficeName", label: "Name" }
]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/associates/headOffices");
        const result = await response.json();

        if (!result.isError && Array.isArray(result.result)) {
          setData(result.result);
        }
      } catch (error) {
        console.error("Error fetching head office data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-3">
      <h3>Head Offices</h3>
      <CustomTable columns={columns} data={data} />
    </div>
  );
}

export default HeadOffices;
