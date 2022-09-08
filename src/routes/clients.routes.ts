import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { ClientPets } from "../entities/client-pets.entity";

export function clientRoutes(router: Router = Router()) {
  const clientRepository = AppDataSource.getRepository(Client);
  const clientPetsRepository = AppDataSource.getRepository(ClientPets);

  router.get(
    "/client",
    async (request: Request, response: Response, next: NextFunction) => {
      const clients = await clientRepository.find();

      response.status(200).json(clients);
    }
  );

  router.get(
    "/client/:id",
    async (request: Request, response: Response, next: NextFunction) => {
      const clientId = parseInt(request.params.id);

      const client = await clientRepository.findOneBy({ id: clientId });

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

  // TODO: Delete
  // TODO: Update

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

      const results = AppDataSource.manager.save(newPet);

      response.status(201).json(results);
    }
  );

  return router;
}
