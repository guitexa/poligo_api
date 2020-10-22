import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';

let fakeClientsRepository: FakeClientsRepository;
let createClient: CreateClientService;

describe('CreateClient', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClient = new CreateClientService(fakeClientsRepository);
  });

  it('should be able to create a new client', async () => {
    const client = await createClient.execute({
      name: 'client-name',
      cpf_cnpj: '24538785376',
      phone: '3475803',
      email: 'mail@mail.com',
    });

    expect(client).toHaveProperty('id');
  });
});
