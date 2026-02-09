import type { Request, Response, NextFunction } from "express";
import * as appointmentService from "./appointments.service.js";

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const appointment = await appointmentService.create(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
}

export async function findAll(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appointments = await appointmentService.findAll();
    res.json(appointments);
  } catch (error) {
    next(error);
  }
}

export async function findById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appointment = await appointmentService.findById(
      req.params.id as string,
    );
    res.json(appointment);
  } catch (error) {
    next(error);
  }
}

export async function updateStatus(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const appointment = await appointmentService.updateStatus(
      req.params.id as string,
      req.body,
    );
    res.json(appointment);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await appointmentService.remove(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
