import { Router } from "express";
import { findAll, findById, update, remove } from "./patients.controller.js";
import { authenticate, authorize } from "../../shared/middlewares/auth.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { updatePatientSchema } from "./dto/update-patient.dto.js";

const router = Router();

router.use(authenticate);

router.get("/", authorize("ADMIN", "RECEPTIONIST", "DOCTOR"), findAll);
router.get("/:id", findById);
router.put("/:id", authorize("ADMIN", "PATIENT"), validate(updatePatientSchema), update);
router.delete("/:id", authorize("ADMIN"), remove);

export default router;
