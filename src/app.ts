import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { routes } from "./routes";

// Create Express server
const app = express();

// Express configuration
app.set("port", 3000);
app.use(express.json());

app.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).send("default route ... app is working!");
  }
);

app.use(routes());

export default app;
