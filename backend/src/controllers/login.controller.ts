import { Request, Response, NextFunction } from "express";
import { comParePassword } from "../utils/hashPassword";
import { pool } from "../config";
import { RowDataPacket } from "mysql2";
import { getAccessToken } from "../utils/authentication";

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Please enter email and password");
    }
    // get user data
    const [user] = await pool.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length == 0) {
      throw new Error("User doesn't exist please register");
    }
    // compare password
    const compare_password = await comParePassword(password, user[0].password);
    if (compare_password) {
      // get access token
      const access_token = await getAccessToken(user[0].email, user[0].role_id);
      return res.status(200).json({ message: "Login successful", token: access_token });
    } else {
      throw new Error("Password isn't match please try again");
    }
  } catch (error: any) {
    next(error);
    return res.status(400).json({ status: "error", message: error.message });
  }
};
