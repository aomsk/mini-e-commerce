import express from "express";
import { register } from "../controllers/register.controller";

const registerRouter = express.Router();

registerRouter.post("/api/register", register); // POST create new user

export default registerRouter;
