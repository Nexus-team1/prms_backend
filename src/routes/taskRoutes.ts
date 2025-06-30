import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTaskToUser,
  getTasksByUser,
} from "../controllers/taskController";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  createTask(req, res);
});
router.get("/", (req: Request, res: Response) => {
  getTasks(req, res);
});
router.get("/:id", (req: Request, res: Response) => {
  getTaskById(req, res);
});
router.put("/:id", (req: Request, res: Response) => {
  updateTask(req, res);
});
router.delete("/:id", (req: Request, res: Response) => {
  deleteTask(req, res);
});
router.post("/:id/assign", (req: Request, res: Response) => {
  assignTaskToUser(req, res);
});
router.get("/user/:id", (req: Request, res: Response) => {
  getTasksByUser(req, res);
});

export default router;
