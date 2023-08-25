import express from "express";
import { getAllUsers, getUserByEmail, updateUserByID, deleteUserByID } from "../controllers/users.controller";
import { isAdmin } from "../middlewares/authorization";
const userRouter = express.Router();

userRouter.get("/api/users", isAdmin, getAllUsers); // GET all users
userRouter.get("/api/user", getUserByEmail); // GET user by email
userRouter.put("/api/user/:id", updateUserByID); // PUT update user by id
userRouter.delete("/api/user/:id", deleteUserByID); // DELETE delete user by id

export default userRouter;
