import { Router } from "express";
import { clientRoutes } from "./clients.routes";
import { invoicesRoutes } from "./invoices.routes";
import { pokemonRoutes } from "./pokemon.routes";
import { productsRoutes } from "./products.routes";
import { servicesRoutes } from "./services.routes";

export function routes(router: Router = Router()) {
  router.use(clientRoutes());
  router.use(servicesRoutes());
  router.use(productsRoutes());
  router.use(invoicesRoutes());
  router.use(pokemonRoutes());

  return router;
}
