import React, { useState } from "react";
import { useTable } from "react-table";

const TaskTable = ({ tasks, updateTask, deleteTask }) => {
  const columns = React.useMemo(
    () => [
      { Header: "Task ID", accessor: "id" },
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ row }) => (
          <EditableCell
            row={row}
            accessor="title"
            updateTask={updateTask}
          />
        ),
      },
      {
        Header: "Description",
        accessor: "description",
        Cell: ({ row }) => (
          <EditableCell
            row={row}
            accessor="description"
            updateTask={updateTask}
          />
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row, value }) => (
          <select
            className={`border p-1 rounded w-full ${
              value === "To Do"
                ? "bg-red-100 text-red-500"
                : value === "In Progress"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-950"
            }`}
            value={value}
            onChange={(e) => updateTask(row.original.id, { status: e.target.value })}
          >
            <option value="To Do" className="bg-yellow-100 text-yellow-800">
              To Do
            </option>
            <option value="In Progress" className="bg-blue-100 text-blue-800">
              In Progress
            </option>
            <option value="Done" className="bg-green-100 text-green-800">
              Done
            </option>
          </select>
        ),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <button
            className="bg-red-500 text-white p-1 rounded"
            onClick={() => deleteTask(row.original.id)}
          >
            Delete
          </button>
        ),
      },
    ],
    [updateTask, deleteTask]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: tasks,
    });

  return (
    <table
      {...getTableProps()}
      className="table-auto w-full border-collapse border border-gray-300"
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200">
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="border border-gray-300 p-2 text-left"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="hover:bg-gray-100">
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className="border border-gray-300 p-2">
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// EditableCell Component
const EditableCell = ({ row, accessor, updateTask }) => {
  const [value, setValue] = useState(row.original[accessor]);

  const handleBlur = () => {
    // Only update the parent state when the value changes
    if (value !== row.original[accessor]) {
      updateTask(row.original.id, { [accessor]: value });
    }
  };

  return (
    <input
      className="border p-1 rounded w-full"
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur} // Update parent state on blur
    />
  );
};

export default TaskTable;
