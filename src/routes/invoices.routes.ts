import { NextFunction, Request, Response, Router } from "express";
import { EntityManager } from "typeorm";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { Invoice } from "../entities/invoices.entity";
import { Product } from "../entities/products.entity";
import { Service } from "../entities/services.entity";

export function invoicesRoutes(router: Router = Router()) {
  const clientRepository = AppDataSource.getRepository(Client);
  const invoiceRepository = AppDataSource.getRepository(Invoice);
  const entityManager = new EntityManager(AppDataSource);

  router.get(
    "/invoice",
    async (request: Request, response: Response, next: NextFunction) => {
      const invoices = await entityManager.find(Invoice, {
        relations: {
          services: true,
          products: true,
        },
      });

      response.status(200).json(invoices);
    }
  );

  router.post(
    "/invoice",
    async (request: Request, response: Response, next: NextFunction) => {
      const invoiceInfo = request.body;

      const client = await clientRepository.findOneBy({
        id: invoiceInfo.clientId,
      });

      const services = await entityManager
        .createQueryBuilder(Service, "service")
        .where("service.id IN (:...services)", {
          services: invoiceInfo.services,
        })
        .getMany();

      const products = await entityManager
        .createQueryBuilder(Product, "product")
        .where("product.id IN (:...products)", {
          products: invoiceInfo.products,
        })
        .getMany();

      const newInvoice = new Invoice();
      newInvoice.client = client;
      newInvoice.services = services;
      newInvoice.products = products;

      const results = await invoiceRepository.save(newInvoice);

      response.status(201).json(results);
    }
  );

  return router;
}
