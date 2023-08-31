import { Request, Response, NextFunction } from "express";
import { pool } from "../config";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { hashPassword } from "../utils/hashPassword";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
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
    const [user_result] = await pool.query<ResultSetHeader>(
      "INSERT INTO `users` (first_name, last_name, email, password) VALUES (?, ?, ?, ?);",
      [first_name, last_name, email, hash, 2]
    );
    const [role_result] = await pool.query<ResultSetHeader>("INSERT INTO `user_role` (user_id, role_id) VALUES (?,?)", [
      user_result.insertId,
      2,
    ]);

    if (user_result.affectedRows == 1 && role_result.affectedRows == 1) {
      const user = {
        user_id: user_result.insertId,
        first_name,
        last_name,
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
