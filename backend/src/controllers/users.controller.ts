import { Request, Response, NextFunction } from "express";
import { pool } from "../config";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [users] = await pool.query<RowDataPacket[]>("SELECT * FROM users;");
    if (users.length === 0) {
      throw new Error("No users found");
    }
    return res.status(200).json({ users }).end();
  } catch (error: any) {
    next(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Please enter a valid email address");
    }
    const [user] = await pool.query<RowDataPacket[]>("SELECT * FROM `users` WHERE email = ?;", [email]);
    if (user.length === 0) {
      throw new Error("No users found");
    }
    return res.status(200).json({ user: user[0] }).end();
  } catch (error: any) {
    next(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateUserByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { f_name, l_name, email, password } = req.body;
    if (!f_name || !l_name || !email || !password) {
      throw {
        message: "Please enter a first name, last name, email, or password",
        httpStatusCode: 400,
      };
    }

    // Update user
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE users SET `f_name`=?, `l_name`=?, `email`=?, `password`=? WHERE `user_id` = ?",
      [f_name, l_name, email, password, id]
    );

    // Not found user
    if (result.affectedRows == 0) {
      throw {
        message: "Cannot update users because user not found",
        httpStatusCode: 400,
      };
    }
    const user = {
      id,
      f_name,
      l_name,
      email,
      password,
    };
    return res.status(200).json({ message: "Update user successfully", user }).end();
  } catch (error: any) {
    return res.status(error.httpStatusCode).json({ status: "error", message: error.message });
  }
};

export const deleteUserByID = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query<ResultSetHeader>("DELETE FROM users WHERE user_id = ?;", [id]);
    // Not found user
    if (result.affectedRows == 0) {
      throw {
        message: "Cannot delete users because user not found",
        httpStatusCode: 400,
      };
    }
    return res.status(200).json({ message: "delete user successfully" }).end();
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};
