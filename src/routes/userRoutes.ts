import { Router, Request, Response } from "express";
import { getTasksByUser } from "../controllers/taskController";

const router = Router();

router.get("/:id/tasks", (req: Request, res: Response) => {
  getTasksByUser(req, res);
});

export default router;
