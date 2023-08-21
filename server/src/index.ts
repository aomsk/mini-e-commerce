import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/users.route";

// create app instance
const app = express();

// use middlware
app.use(bodyParser.json());
app.use(cors());

// help check
app.get("/help", (req: express.Request, res: express.Response) => {
  res.status(200).json({ message: "Help Check", status: "OK" });
});

// routes
app.use("/", userRouter);

// start server
const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
