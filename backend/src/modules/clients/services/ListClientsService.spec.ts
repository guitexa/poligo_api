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
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const clientTwo = await fakeClientsRepository.create({
      name: 'New Big Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const clients = await listClient.execute();

    expect(clients).toEqual(expect.arrayContaining([clientOne, clientTwo]));
  });
});
