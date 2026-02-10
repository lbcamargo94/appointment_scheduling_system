import { Router } from "express";
import { findAll, findById, update, remove } from "./doctors.controller.js";
import { authenticate, authorize } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { updateDoctorSchema } from "./dto/update-doctor.dto.js";

const router = Router();

router.use(authenticate);

router.get("/", findAll);
router.get("/:id", findById);
router.put("/:id", authorize("ADMIN", "DOCTOR"), validate(updateDoctorSchema), update);
router.delete("/:id", authorize("ADMIN"), remove);

export default router;
