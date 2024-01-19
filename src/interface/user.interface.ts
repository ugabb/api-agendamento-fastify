export interface IUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updateAt: Date;
}

export interface IUserCreate {
  email: string;
  name: string;
}

export interface IUserRepository {
  create(user: IUserCreate): Promise<IUser>;
  listUsers(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(userId: string): Promise<IUser | null>;
}
