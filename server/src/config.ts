import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "e-commerce",
  host: process.env.MYSQL_HOST || "localhost",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(access);
