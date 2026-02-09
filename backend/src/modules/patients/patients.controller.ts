import type { Request, Response, NextFunction } from "express";
import * as patientService from "./patients.service.js";

export async function findAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const patients = await patientService.findAll();
    res.json(patients);
  } catch (error) {
    next(error);
  }
}

export async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const patient = await patientService.findById(req.params.id as string);
    res.json(patient);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const patient = await patientService.update(req.params.id as string, req.body);
    res.json(patient);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await patientService.remove(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
