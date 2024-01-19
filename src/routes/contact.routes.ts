import { FastifyInstance } from "fastify";
import { ContactUsecase } from "../usecases/contact.usecase";
import { IContact, IContactCreate } from "../interface/contact.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance) {
  const contactUseCase = new ContactUsecase();

  fastify.addHook("preHandler", authMiddleware);

  fastify.post<{ Body: IContactCreate }>("/", async (req, reply) => {
    const { name, email, phone } = req.body;
    const emailUser = req.headers["email"];
    try {
      const data = await contactUseCase.create({
        name,
        email,
        phone,
        userEmail: emailUser,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  //find all contacts
  fastify.get<{ Params: { userId: string } }>(
    "/:userId",
    async (req, reply) => {
      const { userId } = req.params;
      try {
        const contacts = await contactUseCase.getContactsByUser(userId);
        return reply.send(contacts);
      } catch (error) {
        reply.send(error);
      }
    }
  );

  fastify.put<{
    Body: IContact;
    Params: { userId: string; contactId: string };
  }>("/user/:userId/contact/:contactId", async (req, reply) => {
    const { userId, contactId } = req.params;
    const { email, name, phone } = req.body;
    try {
      const contactUpdated = await contactUseCase.updateContact({
        email,
        id: contactId,
        name,
        phone,
        userId,
      });
      return reply.send(contactUpdated);
    } catch (error) {
      reply.send(error);
    }
  });
}
