import express from "express";
import cors from "cors";
import apiRouter from "./routes/api";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const allowedOrigins = new Set([
  "http://localhost:3000",
  "https://gmaa-admin-panel.vercel.app",
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());
app.use("/api", apiRouter);
app.use(errorHandler);

export default app;
