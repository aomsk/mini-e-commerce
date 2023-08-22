import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  // user: "root",
  // password: "",
  // database: "e-commerce",
  // port: 3308,
  // host: "localhost",
  // waitForConnections: true,
  // connectionLimit: 10,
  // queueLimit: 0,

  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "e-commerce",
  port: Number(process.env.DB_PORT) || 3308,
  host: process.env.DB_HOST || "localhost",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(access);
