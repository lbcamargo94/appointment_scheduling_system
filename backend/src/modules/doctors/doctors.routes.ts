import { Router } from "express";
import { findAll, findById, update, remove } from "./doctors.controller.js";
import { authenticate, authorize } from "../../shared/middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.get("/", findAll);
router.get("/:id", findById);
router.put("/:id", authorize("ADMIN", "DOCTOR"), update);
router.delete("/:id", authorize("ADMIN"), remove);

export default router;
