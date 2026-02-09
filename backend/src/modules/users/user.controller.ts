import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.service.js";

export async function findAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
}

export async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await userService.findById(req.params.id as string);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await userService.remove(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
