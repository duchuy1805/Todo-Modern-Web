
interface Task {
  _id: string;
  title: string;
  status: "active" | "complete" | string | number; 
  createdAt?: string;
  completedAt?: string;
}

interface TaskListProps {
  filteredTasks: Task[];         
  filter: string;               
  handleTaskChanged: () => void;
}

const TaskList = ({ filteredTasks }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {filteredTasks.map((task, index) => (
        <div key={task._id || index}>
            {/* ... */}
        </div>
      ))}
    </div>
  );
};

export default TaskList;