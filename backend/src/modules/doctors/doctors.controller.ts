import type { Request, Response, NextFunction } from "express";
import * as doctorService from "./doctors.service.js";

export async function findAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const doctors = await doctorService.findAll();
    res.json(doctors);
  } catch (error) {
    next(error);
  }
}

export async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const doctor = await doctorService.findById(req.params.id as string);
    res.json(doctor);
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const doctor = await doctorService.update(req.params.id as string, req.body);
    res.json(doctor);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await doctorService.remove(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
