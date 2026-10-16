import { Request, Response, NextFunction } from "express";
import { verifyToken } from "./auth";

export interface EnvAppRequest extends Request {
  app?: {
    user?: unknown;
    userId?: unknown;
    role?: unknown;
  };
}

export function authMiddleware(req: EnvAppRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Não autorizado" });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: "Session inválida" });
  }
  req.app!.user = payload;
  req.app!.userId = payload.sub;
  req.app!.role = payload.role;
  next();
}
