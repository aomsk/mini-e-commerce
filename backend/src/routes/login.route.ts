import express from "express";
import { login } from "../controllers/login.controller";

const loginRouter = express.Router();

loginRouter.post("/api/login", login);

export default loginRouter;
