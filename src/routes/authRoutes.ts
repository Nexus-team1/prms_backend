import { Router, Request, Response, NextFunction } from "express";
import {
  register,
  login,
  forgotPassword,
  confirmOtpAndResetPassword,
} from "../controllers/authController";

const router = Router();

// Wrap async route handlers to catch errors
function asyncHandler(fn: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/forgot-password", asyncHandler(forgotPassword));
router.post("/reset-password", asyncHandler(confirmOtpAndResetPassword));

export default router;
