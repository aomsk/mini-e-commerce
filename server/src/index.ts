import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

// import rooutes
import userRouter from "./routes/users.route";
import registerRouter from "./routes/register.route";
import loginRouter from "./routes/login.route";

// create app instance
const app = express();

// use middlware
app.use(bodyParser.json());
app.use(cors());

// help check
app.get("/help", (req: Request, res: Response) => {
  res.status(200).json({ message: "Help Check", status: "OK" });
});

// routes
app.use("/", registerRouter);
app.use("/", userRouter);
app.use("/", loginRouter);

// start server
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
