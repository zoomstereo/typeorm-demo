import { NextFunction, Request, Response, Router } from "express";
import { Pokemon } from "../entities/pokemon.entity";

/**
 *  Active Records way
 *
 */
export function pokemonRoutes(router: Router = Router()) {
  router.get(
    "/pokemon",
    async (request: Request, response: Response, next: NextFunction) => {
      const pokemons = await Pokemon.find();

      response.status(200).json({
        pokemons,
      });
    }
  );

  router.post(
    "/pokemon",
    async (request: Request, response: Response, next: NextFunction) => {
      const newPokemon = new Pokemon();
      newPokemon.name = request.body.name;
      newPokemon.type = request.body.type;

      const results = await newPokemon.save();

      response.status(200).json(results);
    }
  );

  return router;
}
