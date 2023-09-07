import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: Number(process.env.MYSQL_PORT),
};

export const pool = mysql.createPool(access);
