import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js";
import { Router } from "express";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken)
router.post("/logout", logout);

export default router;