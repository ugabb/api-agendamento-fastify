export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
  userId?: string;
}

export interface IContactCreate {
  name: string;
  email: string;
  phone: string;
  userEmail: string;
}

export interface IContactCreateData {
  name: string;
  email: string;
  phone: string;
  userId: string;
}

export interface IContactRepository {
  create(contact: IContactCreateData): Promise<IContact>;
  getContactByPhoneOrEmail(
    phone: string,
    email: string
  ): Promise<IContact | null>;
  listAllContactsByUser(userId: string): Promise<IContact[]>;
  updateContact({ email, id, name, phone }: IContact): Promise<IContact>;
  deleteContactByPhoneOrEmailOrName({
    email,
    name,
    phone,
  }: IContact): Promise<IContact>;
}
