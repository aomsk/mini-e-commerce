import jwt, { Secret } from "jsonwebtoken";
import { pool } from "../config";
import { RowDataPacket } from "mysql2";

export const getAccessToken = async (email: string, user_id: number) => {
  try {
    // get user role from user_role table
    const [user_role] = await pool.query<RowDataPacket[]>("SELECT `role_id` FROM user_role WHERE user_id = ?", [user_id]);

    // join user_role and roles table for get user id and role name
    const [role] = await pool.query<RowDataPacket[]>(
      "SELECT user_role.user_id, roles.name FROM `roles` JOIN `user_role` ON roles.role_id = ? WHERE user_role.user_id = ?",
      [user_role[0].role_id, user_id]
    );

    const payload = {
      email,
      role: role[0].name,
    };

    const privateKey: Secret = String(process.env.ACCESS_TOKEN_SECRET);
    const token = jwt.sign(payload, privateKey, { expiresIn: "2m", algorithm: "HS256" });
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const getRefreshToken = () => {};
