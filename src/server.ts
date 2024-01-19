import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";

const app: FastifyInstance = fastify({ logger: true });


app.register(userRoutes, {
  prefix:'/users'
})


app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("Server running on port: 3000")
});
