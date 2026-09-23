import { useState, useEffect } from "react";
import axios from "axios";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  // Django se tasks fetch karna
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/todos/")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  // Add Task
  const addTask = (title) => {
    axios
      .post("http://127.0.0.1:8000/api/todos/", {
        title: title,
      })
      .then((response) => {
        setTasks((previousTasks) => [
          response.data,
          ...previousTasks,
        ]);
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  // Delete Task
  const deleteTask = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/todos/${id}/`)
      .then(() => {
        setTasks((previousTasks) =>
          previousTasks.filter(
            (task) => task.id !== id
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  // Edit Task
  const editTask = (id, newTitle) => {
    axios
      .patch(`http://127.0.0.1:8000/api/todos/${id}/`, {
        title: newTitle,
      })
      .then((response) => {
        setTasks((previousTasks) =>
          previousTasks.map((task) =>
            task.id === id
              ? response.data
              : task
          )
        );
      })
      .catch((error) => {
        console.error("Error editing task:", error);
      });
  };

  return (
    <div className="app">
      <div className="todo-container">

        <h1>TODO App</h1>

        <TaskForm
          onAddTask={addTask}
        />

        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onEditTask={editTask}
        />

      </div>
    </div>
  );
}

export default App;