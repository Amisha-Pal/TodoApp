import { useState } from "react";

function TaskItem({ task, onDeleteTask, onEditTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (editText.trim() === "") {
      alert("Task cannot be empty");
      return;
    }

    onEditTask(task.id, editText);

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.title);
    setIsEditing(false);
  };

  return (
    <div className="task-card">

      {isEditing ? (
        <>
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />

          <div className="buttons">
            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save
            </button>

            <button
              className="cancel-btn"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="task-info">
            <h3>{task.title}</h3>

            <p>
              Created: {task.created_at}
            </p>
          </div>

          <div className="buttons">
            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}

    </div>
  );
}

export default TaskItem;