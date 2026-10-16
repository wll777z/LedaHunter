import jwt from "jsonwebtoken";

export interface AuthPayload {
  sub: string;
  email: string;
  name: string;
  workspaceId: string;
  role: string;
}

export function signToken(payload: AuthPayload): string {
  const secret = process.env.JWT_SECRET ?? "change-me-in-production";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    const secret = process.env.JWT_SECRET ?? "change-me-in-production";
    return jwt.verify(token, secret) as AuthPayload;
  } catch {
    return null;
  }
}
