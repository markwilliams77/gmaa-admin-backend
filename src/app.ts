import express from "express";
import cors from "cors";
import apiRouter from "./routes/api";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);

export default app;
