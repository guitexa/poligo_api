import { uuid } from 'uuidv4';

import IContactsRepository from '@modules/contacts/repositories/IContactsRepository';
import ICreateContactDTO from '@modules/contacts/dtos/ICreateContactDTO';
import Contact from '../../infra/typeorm/entities/Contact';

export default class FakeContactsRepository implements IContactsRepository {
  private contactRepository: Contact[] = [];

  public async create(contactData: ICreateContactDTO): Promise<Contact> {
    const contact = new Contact();

    Object.assign(contact, { id: uuid() }, contactData);

    this.contactRepository.push(contact);

    return contact;
  }

  public async findAll(): Promise<Contact[] | undefined> {
    return this.contactRepository;
  }
}
