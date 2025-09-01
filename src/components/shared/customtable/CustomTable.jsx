import React, { useState } from "react";

function CustomTable({ columns = [], data = [] }) {
  const [search, setSearch] = useState("");

  // filter rows based on search text
  const filteredData = data.filter((row) =>
    columns.some((col) =>
      row[col]?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div>
      {/* Header row with search bar aligned right */}
      <div className="d-flex justify-content-end mb-2">
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No Data Available
              </td>
            </tr>
          ) : (
            filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col]}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
