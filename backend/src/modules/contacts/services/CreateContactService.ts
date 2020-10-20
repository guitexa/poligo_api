import { inject, injectable } from 'tsyringe';

import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

interface IRequest {
  name: string;
  email?: string;
  phone?: string;
}

@injectable()
export default class CreateContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({ name, email, phone }: IRequest): Promise<Contact> {
    const contact = await this.contactsRepository.create({
      name,
      email,
      phone,
    });

    return contact;
  }
}
