import { Router } from "express";
import {
  create,
  findAll,
  findById,
  updateStatus,
  remove,
} from "./appointments.controller.js";
import {
  authenticate,
  authorize,
} from "../../shared/middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", authorize("ADMIN", "RECEPTIONIST"), create);
router.get("/", findAll);
router.get("/:id", findById);
router.patch(
  "/:id/status",
  authorize("ADMIN", "RECEPTIONIST", "DOCTOR"),
  updateStatus,
);
router.delete("/:id", authorize("ADMIN", "RECEPTIONIST"), remove);

export default router;
