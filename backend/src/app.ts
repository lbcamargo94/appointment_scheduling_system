import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./modules/auth/auth.routes.js";
import doctorRoutes from "./modules/doctors/doctors.routes.js";
import patientRoutes from "./modules/patients/patients.routes.js";
import appointmentRoutes from "./modules/appointments/appointments.routes.js";
import userRoutes from "./modules/users/users.routes.js";
import { errorMiddleware } from "./shared/middlewares/error.middleware.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (_req, res) => {
  res.json({ message: "MedCare API - v1.0.0" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/appointments", appointmentRoutes);

// Error handler (must be last)
app.use(errorMiddleware);

export default app;
