import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useEffect, useState, useMemo } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

// Định nghĩa kiểu dữ liệu để TypeScript không báo lỗi 'any'
interface Task {
  _id: string;
  title: string;
  status: "active" | "complete";
  createdAt: string;
  completedAt?: string;
}

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState<Task[]>([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();


  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks || []);
      setActiveTaskCount(res.data.activeCount || 0);
      setCompleteTaskCount(res.data.completeCount || 0);
    } catch (error) {
      console.error("Lỗi xảy ra khi truy xuất tasks:", error);
      toast.error("Lỗi kết nối đến máy chủ.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const handleTaskChanged = () => fetchTasks();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  const filteredTasks = useMemo(() => {
    return taskBuffer.filter((task) => {
      if (filter === "active") return task.status === "active";
      if (filter === "completed") return task.status === "complete";
      return true;
    });
  }, [taskBuffer, filter]);


  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / visibleTaskLimit));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [totalPages, page]);


  const visibleTasks = useMemo(() => {
    const start = (page - 1) * visibleTaskLimit;
    return filteredTasks.slice(start, start + visibleTaskLimit);
  }, [filteredTasks, page]);

  const handleNext = () => page < totalPages && setPage((prev) => prev + 1);
  const handlePrev = () => page > 1 && setPage((prev) => prev - 1);
  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <div className="min-h-screen w-full bg-[#fefcff] relative overflow-x-hidden">
      {/* Nút Đăng xuất ở góc trên bên phải */}
      <Button 
        variant="ghost" 
        onClick={handleLogout}
        className="absolute top-4 right-4 z-50 text-muted-foreground hover:text-destructive transition-colors"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Đăng xuất
      </Button>

      {/* Lớp nền hiệu ứng Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.2), transparent 60%),
            radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.25), transparent 60%)`,
        }}
      />

      <div className="container relative z-10 pt-8 mx-auto px-4">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-8">
          <Header />
          
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          <StatsAndFilters
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <TaskList
            filteredTasks={visibleTasks}
            filter={filter}
            handleTaskChanged={handleTaskChanged}
          />

          <div className="flex flex-col items-center justify-between gap-6 pt-4 sm:flex-row">
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter
              dateQuery={dateQuery}
              setDateQuery={setDateQuery}
            />
          </div>

          <Footer
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;