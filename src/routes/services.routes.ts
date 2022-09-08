import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Service } from "../entities/services.entity";

export function servicesRoutes(router: Router = Router()) {
  const servicesRepository = AppDataSource.getRepository(Service);

  router.get(
    "/services",
    async (request: Request, response: Response, next: NextFunction) => {
      const services = await servicesRepository.find();

      response.status(200).json(services);
    }
  );

  router.post(
    "/services",
    async (request: Request, response: Response, next: NextFunction) => {
      const service = new Service();
      service.name = request.body.name;
      service.price = request.body.price;

      const result = await servicesRepository.manager.save(service);

      response.status(201).json(result);
    }
  );

  return router;
}
