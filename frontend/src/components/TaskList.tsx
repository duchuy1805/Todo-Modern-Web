import type { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  filteredTasks: Task[];
  filter: string;
  handleTaskChanged: () => void;
}

const TaskList = ({ filteredTasks, handleTaskChanged }: TaskListProps) => {
  return (
    <div className="space-y-4">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task, index) => (
          <TaskCard
            key={task._id}
            task={task}
            index={index} 
            handleTaskChanged={handleTaskChanged}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
          <p className="text-lg font-medium text-muted-foreground">
            Chưa có nhiệm vụ nào được tìm thấy.
          </p>
          <p className="text-sm text-muted-foreground/60">
            Hãy bắt đầu bằng cách thêm một nhiệm vụ mới phía trên!
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;