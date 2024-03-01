export const config = (): Record<string, unknown> => ({
  appEnv: process.env.APP_ENV,
  appPort: process.env.APP_PORT,

  databaseHost: process.env.DATABASE_HOST,
  databasePort: process.env.DATABASE_PORT,
  databaseUser: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_NAME,
});
