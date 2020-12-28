import { mainFn } from "@compas/stdlib";
import { newPostgresConnection } from "@compas/store";

// Remember, mainFn reads our `.env` file automatically
mainFn(import.meta, main);

async function main(logger) {
  const sql = await newPostgresConnection({
    createIfNotExists: true, // Create a new database if `compastodo` is not found
  });

  logger.info({
    result: await sql`SELECT 1 + 1 as "sum"`,
  });

  // Close the connection
  await sql.end();
}
