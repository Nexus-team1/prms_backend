import { Router, Request, Response } from "express";
import {
  createSprint,
  getSprints,
  getSprintById,
  updateSprint,
  deleteSprint,
} from "../controllers/sprintController";

const router = Router();

function asyncHandler(fn: any) {
  return (req: Request, res: Response) => {
    Promise.resolve(fn(req, res)).catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    });
  };
}

router.post("/", asyncHandler(createSprint));
router.get("/", asyncHandler(getSprints));
router.get("/:id", asyncHandler(getSprintById));
router.put("/:id", asyncHandler(updateSprint));
router.delete("/:id", asyncHandler(deleteSprint));

export default router;
