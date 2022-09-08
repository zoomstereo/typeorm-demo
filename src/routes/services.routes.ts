import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";

export function servicesRoutes(router: Router = Router()) {
  router.get(
    "/services",
    async (request: Request, response: Response, next: NextFunction) => {
      response.status(200).json({ services: ["yes"] });
    }
  );
  
  return router;
}
