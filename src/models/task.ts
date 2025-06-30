export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
