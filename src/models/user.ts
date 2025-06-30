export interface User {
  id: number;
  username: string;
  password: string; // In production, use hashed passwords!
  email: string;
  fullName?: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
