import { useState } from "react";
import { FaEdit } from "react-icons/fa"; // Edit icon

function CustomTable({ columns = [], data = [], onEdit }) {
  const [search, setSearch] = useState("");

  // Normalize columns (support both string & object)
  const normalizedColumns = columns.map((col) => (typeof col === "string" ? { field: col, label: col } : col));

  // Filter rows based on search text
  const filteredData = data.filter((row) =>
    normalizedColumns.some((col) => row[col.field]?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  const showAction = typeof onEdit === "function";

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
      <table className="table table-bordered">
        <thead>
          <tr>
            {normalizedColumns.map((col, index) => (
              <th key={index} className="custom-thead">
                {col.label}
              </th>
            ))}
            {showAction && <th className="custom-thead">Action</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td colSpan={normalizedColumns.length + (showAction ? 1 : 0)} className="text-center">
                No Data Available
              </td>
            </tr>
          ) : (
            filteredData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {normalizedColumns.map((col, colIndex) => (
                  <td key={colIndex}>{row[col.field]}</td>
                ))}
                {showAction && (
                  <td className="text-center">
                    <i
                      className="fas fa-edit text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => onEdit(row)}
                    ></i>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
