export interface Task3 {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  preferredRole?: string; // "DEVELOPER" or "DESIGNER"
}
