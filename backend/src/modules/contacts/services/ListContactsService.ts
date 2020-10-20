import { inject, injectable } from 'tsyringe';

import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

@injectable()
export default class ListContactsService {
  constructor(
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository,
  ) {}

  public async execute(): Promise<Contact[] | undefined> {
    return this.contactsRepository.findAll();
  }
}
