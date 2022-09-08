import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";

export function productsRoutes(router: Router = Router()) {
  router.get(
    "/products",
    async (request: Request, response: Response, next: NextFunction) => {
      response.status(200).json({ products: ["yes"] });
    }
  );

  return router;
}
