import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const jwtSecret = import.meta.env.JWT_SECRET;

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn,
  });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.signedCookies["Cookie_Token"];
  if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, jwtSecret, (err: any, success: any) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  });
};
