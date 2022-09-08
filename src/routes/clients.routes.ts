import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { ClientPets } from "../entities/client-pets.entity";
import { EntityManager } from "typeorm";

export function clientRoutes(router: Router = Router()) {
  const clientRepository = AppDataSource.getRepository(Client);
  const clientPetsRepository = AppDataSource.getRepository(ClientPets);
  const entityManager = new EntityManager(AppDataSource);

  router.get(
    "/client",
    async (request: Request, response: Response, next: NextFunction) => {
      const clients = await clientRepository.find();
      // const clients = await clientRepository.find({
      //   relations: {
      //     pets: true,
      //   },
      // });

      response.status(200).json(clients);
    }
  );

  router.get(
    "/client/:id",
    async (request: Request, response: Response, next: NextFunction) => {
      const clientId = parseInt(request.params.id);

      const client = await clientRepository.findOneBy({ id: clientId });

      // const client = await entityManager.findOne(Client, {
      //   where: {
      //     id: clientId,
      //   },
      //   relations: {
      //     pets: true,
      //   },
      // });

      response.status(200).json(client);
    }
  );

  router.post(
    "/client",
    async (request: Request, response: Response, next: NextFunction) => {
      const newClient = await clientRepository.save({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
      });

      response.status(201).json(newClient);
    }
  );

  // TODO: Update
  router.put(
    "/client/:id",
    async (request: Request, response: Response, next: NextFunction) => {
      const clientId = parseInt(request.params.id);

      const client = await clientRepository.findOneBy({ id: clientId });

      client.firstName = request.body.firstName;
      client.lastName = request.body.lastName;

      const results = await clientRepository.save(client);

      response.status(201).json(results);
    }
  );

  // TODO: Delete
  router.delete(
    "/client/:id",
    async (request: Request, response: Response, next: NextFunction) => {
      const clientId = parseInt(request.params.id);

      const client = await clientRepository.findOneBy({ id: clientId });

      const results = await clientRepository.delete(client);

      response.status(201).json(results);
    }
  );

  router.get(
    "/client/:id/pets",
    async (request: Request, response: Response, next: NextFunction) => {
      const clientId = parseInt(request.params.id);

      const clientPets = await clientPetsRepository.findBy({
        client: {
          id: clientId,
        },
      });

      response.status(200).json(clientPets);
    }
  );

  router.post(
    "/client/:id/pets",
    async (request: Request, response: Response, next: NextFunction) => {
      const clientId = parseInt(request.params.id);

      const client = await clientRepository.findOneBy({ id: clientId });

      const newPet = new ClientPets();
      newPet.name = request.body.name;
      newPet.client = client;

      const results = await AppDataSource.manager.save(newPet);

      response.status(201).json(results);
    }
  );

  return router;
}
