import FakeContactsRepository from '../repositories/fakes/FakeContactsRepository';
import ListContactsService from './ListContactsService';

let fakeContactsRepository: FakeContactsRepository;
let listContact: ListContactsService;

describe('ListContacts', () => {
  beforeEach(() => {
    fakeContactsRepository = new FakeContactsRepository();
    listContact = new ListContactsService(fakeContactsRepository);
  });

  it('should be able to list contacts', async () => {
    const contactOne = await fakeContactsRepository.create({
      name: 'contact-one-name',
      email: 'mail@mail.com',
      phone: '3475803',
    });

    const contactTwo = await fakeContactsRepository.create({
      name: 'contact-two-name',
      email: 'mail@mail.com',
      phone: '3475803',
    });

    const contacts = await listContact.execute();

    expect(contacts).toEqual(expect.arrayContaining([contactOne, contactTwo]));
  });
});
