import TaskCard from "./TaskCard"
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

const TaskList = ({ filteredTasks, handleTaskChanged }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskCard 
            key={task._id} 
            task={task} 
            handleTaskChanged={handleTaskChanged} 
          />
        ))
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          Chưa có nhiệm vụ nào ở đây cả!
        </div>
      )}
    </div>
  );
};
export default TaskList;