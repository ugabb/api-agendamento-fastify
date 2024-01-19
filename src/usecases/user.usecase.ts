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
}

export { UserUseCase };
