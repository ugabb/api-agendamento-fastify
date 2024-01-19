import {
  IUser,
  IUserCreate,
  IUserRepository,
} from "../interface/user.interface";
import { UserRepository } from "../repositories/user.repository";

// this file is like a service

class UserUseCase {
  private userRepository: IUserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create({ name, email }: IUserCreate): Promise<IUser> {
    const userExist = await this.userRepository.findByEmail(email);
    if (userExist) {
      throw new Error("User already exists!");
    }
    const result = await this.userRepository.create({ name, email });
    return result;
  }

  async listUsers(): Promise<IUser[]> {
    const users = await this.userRepository.listUsers();
    if (users.length <= 0) {
      throw new Error("No users!");
    }
    return users;
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found with this email!");
    }
    return user;
  }
}

export { UserUseCase };
