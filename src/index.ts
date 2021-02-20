import "reflect-metadata";
import server from "./server";

async function main() {
  const app = await server();

  app.listen({ port: 4001 }).then(({ url }) => {
    console.clear();
    console.log(`Server ready at ${url}`);
  });
}

main();
