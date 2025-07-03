import { Router, Request, Response } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController";

const router = Router();

// Wrap async route handlers to catch errors
function asyncHandler(fn: any) {
  return (req: Request, res: Response) => {
    Promise.resolve(fn(req, res)).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
  };
}

router.post("/", asyncHandler(createProject));
router.get("/", asyncHandler(getProjects));
router.get("/:id", asyncHandler(getProjectById));
router.put("/:id", asyncHandler(updateProject));
router.delete("/:id", asyncHandler(deleteProject));

export default router;
