import jwt, { type SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  role: string;
}

const SECRET = process.env.JWT_SECRET || "fallback-secret";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "24h";

export function generateToken(payload: JwtPayload): string {
  const options: SignOptions = {
    expiresIn: EXPIRES_IN as SignOptions["expiresIn"],
  };
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload;
}
