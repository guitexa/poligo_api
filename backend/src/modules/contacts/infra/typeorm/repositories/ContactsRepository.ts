import { Repository, getRepository } from 'typeorm';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import Contact from '@modules/contacts/infra/typeorm/entities/Contact';

export default class ContactsRepository implements IContactsRepository {
  private ormRepository: Repository<Contact>;

  constructor() {
    this.ormRepository = getRepository(Contact);
  }

  public async create(contactData: ICreateContactDTO): Promise<Contact> {
    const contact = this.ormRepository.create(contactData);

    await this.ormRepository.save(contact);

    return contact;
  }

  public async findAll(): Promise<Contact[] | undefined> {
    return this.ormRepository.find();
  }
}
