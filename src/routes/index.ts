import { Router } from "express";
import { clientRoutes } from "./clients.routes";
import { servicesRoutes } from "./services.routes";

export function routes(router: Router = Router()) {
  router.use(clientRoutes());
  router.use(servicesRoutes());

  return router;
}
