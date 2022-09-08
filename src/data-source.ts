import { DataSource } from "typeorm";
import { ClientPets } from "./entities/client-pets.entity";
import { Client } from "./entities/client.entity";
import { Invoice } from "./entities/invoices.entity";
import { Pokemon } from "./entities/pokemon.entity";
import { Product } from "./entities/products.entity";
import { Service } from "./entities/services.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "admin",
  database: "typeorm-demo",
  synchronize: true,
  logging: ["error"],
  entities: [Client, Invoice, ClientPets, Product, Service, Pokemon],
});
