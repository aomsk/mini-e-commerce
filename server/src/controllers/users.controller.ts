import express from "express";
import { pool } from "../config";
import { RowDataPacket, ResultSetHeader } from "mysql2";

export const getAllUsers = (req: express.Request, res: express.Response) => {
  try {
    const sql = "SELECT * FROM `users`;";
    pool.query<RowDataPacket[]>(sql, (_err, rows) => {
      if (_err) {
        return res.status(400).json({ status: "error", message: _err?.message });
      }
      if (rows.length > 0) {
        return res.status(200).json({ users: rows }).end();
      }
    });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const getUserByEmail = (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;
    const sql = "SELECT * FROM `users` WHERE email = ?;";
    pool.query<RowDataPacket[]>(sql, [email], (_err, rows) => {
      if (_err) {
        return res.status(400).json({ status: "error", message: _err?.message });
      }
      if (rows.length == 0) {
        return res.status(404).json({ status: "not found", message: "User not found" }).end();
      }
      if (rows.length == 1) {
        return res.status(200).json({ users: rows }).end();
      }
    });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const createUser = (req: express.Request, res: express.Response) => {
  try {
    const { f_name, l_name, email, password } = req.body;
    const sql = "INSERT INTO `users` (f_name, l_name, email, password) VALUES (?, ?, ?, ?);";
    pool.query<ResultSetHeader>(sql, [f_name, l_name, email, password], (_err, result) => {
      if (_err) {
        return res.status(400).json({ status: "error", message: _err?.message });
      }
      if (result.affectedRows == 1) {
        const user = {
          id: result.insertId,
          f_name,
          l_name,
          email,
          password,
        };
        return res.status(201).json({ message: "create user successfully", user }).end();
      }
    });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const updateUserByID = (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { f_name, l_name, email, password } = req.body;
    if (!f_name || !l_name || !email || !password) {
      return res.status(400).json({ status: "error", message: "Missing some feild" });
    }
    const sql = "UPDATE `users` SET `f_name`=?, `l_name`=?, `email`=?, `password`=? WHERE `id` = ?";
    pool.query<ResultSetHeader>(sql, [f_name, l_name, email, password, id], (_err, result) => {
      if (_err) {
        return res.status(400).json({ status: "error", message: _err?.message });
      }
      if (result.affectedRows == 1 && result.changedRows == 1) {
        const user = {
          id,
          f_name,
          l_name,
          email,
          password,
        };
        return res.status(200).json({ message: "update user successfully", user }).end();
      }
      return res.status(200).json({ message: "user data not change" }).end();
    });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};

export const deleteUserByID = (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    pool.query<ResultSetHeader>(sql, [id], (_err, result) => {
      if (_err) {
        return res.status(400).json({ status: "error", message: _err?.message });
      }
      if (result.affectedRows == 1) {
        return res.status(200).json({ message: "delete user successfully" }).end();
      }
    });
  } catch (error: any) {
    return res.status(400).json({ status: "error", message: error.message });
  }
};
