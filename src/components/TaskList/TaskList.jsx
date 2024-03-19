import TaskCard from "../TaskCard/TaskCard";
import { Suspense } from "react";

function TaskList({ tasks, setUpdate, searchQuery }) {
  if (!Array.isArray(tasks)) {
    return <div>Error: Invalid data</div>;
  }

  const filteredRobots = tasks.filter((task) =>
    task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="taskContainer">
      {filteredRobots.map((task) => (
        <Suspense key={task._id} fallback={<div>Loading...</div>}>
          <TaskCard key={task._id} task={task} setUpdate={setUpdate} />
        </Suspense>
      ))}
    </div>
  );
}

export default TaskList;
