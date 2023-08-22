import { Request, Response, NextFunction } from "express";
import { checkPassword } from "../utils/hashPassword";
import { pool } from "../config";
import { RowDataPacket } from "mysql2";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please enter email and password");
    }

    const [user] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length == 0) {
      throw new Error("User doesn't exist in DB please register");
    }

    const check_password = await checkPassword(password, user[0].password);
    if (check_password) {
      return res.status(200).json({ message: "Login successful" });
    } else {
      throw new Error("Password isn't match please try again");
    }
  } catch (error: any) {
    next(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
