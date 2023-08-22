import { Request, Response, NextFunction } from "express";
import { pool } from "../config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { hashPassword } from "../utils/hashPassword";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { f_name, l_name, email, password } = req.body;
    if (!f_name || !l_name || !email || !password) {
      throw new Error("Please enter a first name, last name, email, or password");
    }

    // Check user is existing
    const [user] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length > 0) {
      throw new Error("User already exists please login");
    }

    // Hash password
    const hash = await hashPassword(password);

    // Insert new user to DB
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO `users` (f_name, l_name, email, password, role_id) VALUES (?, ?, ?, ?, ?);",
      [f_name, l_name, email, hash, 2]
    );
    if (result.affectedRows == 1) {
      const user = {
        id: result.insertId,
        f_name,
        l_name,
        email,
        hash,
      };
      return res.status(201).json({ message: "Create user successfully", user }).end();
    }
  } catch (error: any) {
    next(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
