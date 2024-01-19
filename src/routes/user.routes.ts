import { FastifyInstance } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { IUserCreate } from "../interface/user.interface";

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();

  fastify.post<{ Body: IUserCreate }>("/", async (req, reply) => {
    const { name, email } = req.body;
    try {
      const data = await userUseCase.create({ name, email });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  //find all users
  fastify.get("/", async (req, reply) => {
    try {
      const users = await userUseCase.listUsers();
      return reply.send(users);
    } catch (error) {
      reply.send(error);
    }
  });

  // find user by email
  fastify.get("/:email", async (req, reply) => {
    const { email } = req.params;
    console.log("EMAIL", email);
    try {
      const user = await userUseCase.findByEmail(email);
      return reply.send(user);
    } catch (error) {
      reply.send(error);
    }
  });

  fastify.get("/hello", (req, reply) => {
    reply.send("Hello");
  });
}
