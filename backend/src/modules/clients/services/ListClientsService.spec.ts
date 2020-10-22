import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import ListClientsService from './ListClientsService';

let fakeClientsRepository: FakeClientsRepository;
let listClient: ListClientsService;

describe('ListClients', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    listClient = new ListClientsService(fakeClientsRepository);
  });

  it('should be able to list clients', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'client-one-name',
      cpf_cnpj: '24538785376',
      phone: '3475803',
      email: 'mail@mail.com',
    });

    const clientTwo = await fakeClientsRepository.create({
      name: 'client-two-name',
      cpf_cnpj: '24538785376',
      phone: '3475803',
      email: 'mail@mail.com',
    });

    const clients = await listClient.execute();

    expect(clients).toEqual(expect.arrayContaining([clientOne, clientTwo]));
  });
});
