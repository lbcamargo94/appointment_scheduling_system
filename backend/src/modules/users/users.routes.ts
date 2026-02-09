import { Router } from "express";
import { findAll, findById, remove } from "./user.controller.js";
import {
  authenticate,
  authorize,
} from "../../shared/middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);
router.use(authorize("ADMIN"));

router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", remove);

export default router;
