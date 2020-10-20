import ICreateContactDTO from '../dtos/ICreateContactDTO';
import Contact from '../infra/typeorm/entities/Contact';

export default interface IContactsRepository {
  create(contactData: ICreateContactDTO): Promise<Contact>;
  findAll(): Promise<Contact[] | undefined>;
}
