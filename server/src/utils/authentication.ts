import jwt, { Secret } from "jsonwebtoken";
import { pool } from "../config";
import { RowDataPacket } from "mysql2";

export const getAccessToken = async (email: string, role_id: number) => {
  try {
    const [role] = await pool.query<RowDataPacket[]>("SELECT `role_name` FROM roles WHERE role_id = ?", [role_id]);

    const payload = {
      email,
      role: role[0].role_name,
    };

    const privateKey: Secret = String(process.env.ACCESS_TOKEN_SECRET);
    const token = jwt.sign(payload, privateKey, { expiresIn: "2m", algorithm: "HS256" });
    return token;
  } catch (error) {
    console.error(error);
  }
};

export const getRefreshToken = () => {};
