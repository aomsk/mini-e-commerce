import express from "express";
import {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUserByID,
  deleteUserByID,
} from "../controllers/users.controller";

const userRouter = express.Router();

userRouter.get("/api/users", getAllUsers); // GET all users
userRouter.get("/api/user", getUserByEmail); // GET user by email
userRouter.post("/api/user", createUser); // POST create new user
userRouter.put("/api/user/:id", updateUserByID); // PUT update user by id
userRouter.delete("/api/user/:id", deleteUserByID); // DELETE delete user by id

export default userRouter;
