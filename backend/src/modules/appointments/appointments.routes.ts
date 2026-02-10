import { Router } from "express";
import { create, findAll, findById, updateStatus, remove } from "./appointments.controller.js";
import { authenticate, authorize } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createAppointmentSchema } from "./dto/create-appointment.dto.js";
import { updateStatusSchema } from "./dto/update-status.dto.js";

const router = Router();

router.use(authenticate);

router.post("/", authorize("ADMIN", "RECEPTIONIST"), validate(createAppointmentSchema), create);
router.get("/", findAll);
router.get("/:id", findById);
router.patch("/:id/status", authorize("ADMIN", "RECEPTIONIST", "DOCTOR"), validate(updateStatusSchema), updateStatus);
router.delete("/:id", authorize("ADMIN", "RECEPTIONIST"), remove);

export default router;
