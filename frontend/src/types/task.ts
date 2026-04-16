export interface Task {
  _id: string;
  title: string;
  status: "active" | "completed"; 
  createdAt: string;
  completedAt?: string;
}