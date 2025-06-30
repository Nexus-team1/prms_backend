import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express + TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
