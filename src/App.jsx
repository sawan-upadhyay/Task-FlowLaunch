import React, { useState, useEffect } from "react";
import TaskTable from "./TaskTable";
import AddTaskForm from "./AddTaskForm";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
  const [tasks, setTasks] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 

  // Fetch tasks from the API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();

        // Map completed field to Status
        const formattedTasks = data.slice(0, 20).map((task) => ({
          id: task.id,
          title: task.title,
          description: `Description for Task ${task.id}`, // Dummy description
          status: task.completed ? "Done" : "To Do", // Map completed to Status
        }));

        setTasks(formattedTasks); // Set state with formatted tasks
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []); 

  // Add a new task
  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...newTask, id: prevTasks.length + 1 },
    ]);
    toast.success("Task added successfully!"); // Toast notification
  };

  // Update task logic
  const updateTask = (id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
    toast.success("Task updated successfully!"); // Toast notification
  };

  // Delete task logic
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    toast.success("Task deleted successfully!"); // Toast notification
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count tasks by status
  const statusCounts = tasks.reduce(
    (counts, task) => {
      counts[task.status] += 1;
      return counts;
    },
    { "To Do": 0, "In Progress": 0, Done: 0 }
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl text-center font-bold mb-4">Task List Manager</h1>
  
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Title or Description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>
      
      <div className="mb-4">
        <p className="font-bold text-lg">Task Counters:</p>
        <p className="bg-red-100 text-red-800">To Do: &nbsp; &nbsp; &nbsp;&nbsp; {statusCounts["To Do"]}</p>
        <p className="bg-blue-100 text-blue-800">In Progress: {statusCounts["In Progress"]}</p>
        <p className="bg-green-100 text-green-800">Done:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {statusCounts["Done"]}</p>
      </div>
      
      <AddTaskForm addTask={addTask} />
      
      <TaskTable
        tasks={filteredTasks} // Use filtered tasks for rendering
        updateTask={updateTask}
        deleteTask={deleteTask}
      />

      <ToastContainer />
    </div>
  );
};

export default App;
