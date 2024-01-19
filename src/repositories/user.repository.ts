import { prisma } from "../database/prisma-client";
import {
  IUser,
  IUserCreate,
  IUserRepository,
} from "../interface/user.interface";

class UserRepository implements IUserRepository {
  async findById(userId: string): Promise<IUser | null> {
    const result = await prisma.user.findFirst({
      where: { id: userId },
    });
    return result ?? null;
  }

  async listUsers(): Promise<IUser[]> {
    const result = await prisma.user.findMany();
    return result ?? null;
  }

  async create(user: IUserCreate): Promise<IUser> {
    const result = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });
    return result;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const result = await prisma.user.findFirst({
      where: { email },
    });
    return result ?? null;
  }
}

export { UserRepository };
