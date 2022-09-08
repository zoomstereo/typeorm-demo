import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Client } from "./client.entity";
import { Product } from "./products.entity";
import { Service } from "./services.entity";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.invoices)
  client: Client;

  @ManyToMany(() => Service)
  @JoinTable()
  services: Service[];

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
