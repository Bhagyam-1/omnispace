import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key"; // keep in .env

export function signSocketToken(payload: { userId: string; roomId: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" }); // short-lived token
}

export function verifySocketToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; roomId: string };
  } catch {
    return null;
  }
}
