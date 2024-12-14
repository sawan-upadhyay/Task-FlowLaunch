import React, { useState } from "react";

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    const newTask = {
      title,
      description: description || "No description", // Use default if no description is provided
      status,
    };

    addTask(newTask); // Call the addTask function passed as a prop
    setTitle(""); 
    setDescription("");
    setStatus("To Do");
  };

  return (
    <form onSubmit={handleSubmit} className="mb- p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Task Title"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Task Description"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
