import { DataSource } from "typeorm";
import { Event } from "../models/event.model";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-ap-southeast-1.pooler.supabase.com",
  port: 5432,
  username: "postgres.waxovqhlqyvacrrfmvzd",
  password: "Xp5kPU7wzZTc9vRw",
  database: "postgres",
  entities: [Event],
  synchronize: true,
  logging: false
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err: Error) => {
    console.error("Error during Data Source initialization:", err);
  });
