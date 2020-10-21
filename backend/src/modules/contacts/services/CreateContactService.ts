import { inject, injectable } from 'tsyringe';

import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';
import ICreateContactDTO from '../dtos/ICreateContactDTO';

@injectable()
export default class CreateContactService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute({
    name,
    email,
    phone,
  }: ICreateContactDTO): Promise<Contact> {
    const contact = await this.contactsRepository.create({
      name,
      email,
      phone,
    });

    return contact;
  }
}
