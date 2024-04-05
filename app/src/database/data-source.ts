import { DataSource as DataSourceTypeORM } from "typeorm";

export const DataSource = new DataSourceTypeORM({
  type: "postgres",
  synchronize: false,

  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  entities: [__dirname + "/../app/**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
});
