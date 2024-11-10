import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js"
import { createTaskSchema } from "../schemas/task.schema.js";
import { createTask, deleteTask, getPrivateTasks, getPublicTasks, getTask, getTasks, updateTask } from "../controllers/task.controller.js";
import multer from "multer";


const upload = multer({ dest: "public/images/" });
const router = Router();

router.get('/task', auth, getTasks);
router.get('/task/public', getPublicTasks);
router.get('/task/private', auth, getPrivateTasks);
router.get('/task/:id', auth, getTask);
router.post('/task', auth, validateSchema(createTaskSchema), upload.single("image"), createTask);
router.put('/task/:id', auth, upload.single("image"), updateTask);
router.delete('/task/:id', auth, deleteTask);

export default router;
