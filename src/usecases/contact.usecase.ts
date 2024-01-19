import { IContact, IContactCreate } from "../interface/contact.interface";
import { ContactsRepository } from "../repositories/contact.repository";
import { UserRepository } from "../repositories/user.repository";

class ContactUsecase {
  private contactRepository: ContactsRepository;
  private userRepository: UserRepository;
  constructor() {
    this.contactRepository = new ContactsRepository();
    this.userRepository = new UserRepository();
  }

  async create({ email, name, phone, userEmail }: IContactCreate) {
    // email do usuario logado
    // buscar o usuario pelo email
    // se nao existir, retornar error
    // se existir, criar contato
    // antes de criar o contato, validar se ele já existe pelo telefone ou email

    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) {
      throw new Error("User does not exist!");
    }

    const contactExist = await this.contactRepository.getContactByPhoneOrEmail(
      phone,
      email
    );

    if (contactExist) {
      throw new Error("Contact already exist");
    }

    const contactCreated = await this.contactRepository.create({
      email,
      name,
      phone,
      userId: user.id,
    });

    return contactCreated;
  }

  async getContactsByUser(userId: string) {
    // verifica se o usuario existe
    // se n existir retorna erro
    // pega todos os contatos a partir do id do usuario
    // retorna contatos
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const contacts = await this.contactRepository.listAllContactsByUser(userId);

    return contacts;
  }

  async updateContact({ email, id, name, phone, userId }: IContact) {
    // verifica se o usuario existe
    // se n existir retorna erro
    // atualiza o contato
    // retorna contato
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const contactUpdated = await this.contactRepository.updateContact({
      email,
      id,
      name,
      phone,
    });

    return contactUpdated;
  }
}

export { ContactUsecase };
