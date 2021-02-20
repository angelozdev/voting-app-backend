import "reflect-metadata";
import server from "./server";
import dbconnection from "./database";

async function main() {
  await dbconnection();
  const app = await server();
  app.listen({ port: 4001 }).then(({ url }) => {
    console.clear();
    console.log(`Server ready at ${url}`);
  });
}

main();
