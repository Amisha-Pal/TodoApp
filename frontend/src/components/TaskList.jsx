import TaskItem from "./TaskItem";

function TaskList({ tasks, onDeleteTask, onEditTask }) {
  return (
    <div className="task-list">

      {tasks.length === 0 ? (
        <p className="no-task">
          No tasks added yet.
        </p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onEditTask={onEditTask}
          />
        ))
      )}

    </div>
  );
}

export default TaskList;