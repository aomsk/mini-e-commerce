import { Request, Response, NextFunction } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";

interface IJWTPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// check role
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];
  if (authorization === undefined) {
    return res.status(401).json({ status: 401, message: "Unauthorized No token" });
  }
  // verify token
  const privateKey: Secret = String(process.env.ACCESS_TOKEN_SECRET);
  const token: string | JwtPayload = authorization.split(" ")[1];
  jwt.verify(token, privateKey, (error, decoded) => {
    const payload = decoded as IJWTPayload;
    // const date = new Date(payload.exp * 1000);
    // console.log("date: ", date.toLocaleTimeString());
    if (error) {
      return res.status(401).json({ status: 401, message: error.message });
    }
    if (payload.role === undefined || payload.role !== "admin") {
      return res.status(403).json({ status: 403, message: "Forbidden" });
    }
    next();
  });
};
