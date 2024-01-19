import { prisma } from "../database/prisma-client";
import {
  IContact,
  IContactCreate,
  IContactCreateData,
  IContactRepository,
} from "../interface/contact.interface";

class ContactsRepository implements IContactRepository {
  deleteContactByPhoneOrEmailOrName({
    email,
    name,
    phone,
  }: IContact): Promise<IContact> {
    throw new Error("Method not implemented.");
  }

  async updateContact({ email, id, name, phone }: IContact): Promise<IContact> {
    const contact = await prisma.contacts.update({
      where: { id },
      data: {
        email,
        name,
        phone,
      },
    });
    return contact;
  }
  
  async listAllContactsByUser(userId: string): Promise<IContact[]> {
    const contacts = await prisma.contacts.findMany({ where: { userId } });
    return contacts;
  }

  async getContactByPhoneOrEmail(
    phone: string,
    email: string
  ): Promise<IContact | null> {
    const contact = await prisma.contacts.findFirst({
      where: {
        OR: [{ email: email }, { phone: phone }],
      },
    });
    return contact ?? null;
  }

  async create(contact: IContactCreateData): Promise<IContact> {
    const contactCreated = await prisma.contacts.create({
      data: {
        email: contact.email,
        name: contact.name,
        phone: contact.phone,
        userId: contact.userId,
      },
    });
    return contactCreated;
  }
}

export { ContactsRepository };
