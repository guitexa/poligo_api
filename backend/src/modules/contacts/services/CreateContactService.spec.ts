import FakeContactsRepository from '../repositories/fakes/FakeContactsRepository';
import CreateContactService from './CreateContactService';

let fakeContactsRepository: FakeContactsRepository;
let createContact: CreateContactService;

describe('CreateContact', () => {
  beforeEach(() => {
    fakeContactsRepository = new FakeContactsRepository();
    createContact = new CreateContactService(fakeContactsRepository);
  });

  it('should be able to create a new contact', async () => {
    const contact = await createContact.execute({
      name: 'contact-name',
      email: 'mail@mail.com',
      phone: '3475803',
    });

    expect(contact).toHaveProperty('id');
  });
});
