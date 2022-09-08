import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Product } from "../entities/products.entity";

export function productsRoutes(router: Router = Router()) {
  const productsRepository = AppDataSource.getRepository(Product);

  router.get(
    "/products",
    async (request: Request, response: Response, next: NextFunction) => {
      const products = await productsRepository.find();

      response.status(200).json(products);
    }
  );

  router.post(
    "/products",
    async (request: Request, response: Response, next: NextFunction) => {
      const product = new Product();
      product.name = request.body.name;
      product.price = request.body.price;

      const result = await productsRepository.manager.save(product);

      response.status(201).json(result);
    }
  );

  return router;
}
