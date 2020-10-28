import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import ListClientService from './ListClientService';

let fakeClientsRepository: FakeClientsRepository;
let listClient: ListClientService;

describe('ListClient', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    listClient = new ListClientService(fakeClientsRepository);
  });

  it('should be able to list a specific client', async () => {
    const clientOne = await fakeClientsRepository.create({
      company_name: 'New Company',
      cpf_cnpj: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const client = await listClient.execute(clientOne.id);

    expect(client).toEqual(expect.objectContaining(clientOne));
  });

  it('should NOT be able to list with inexistent client', async () => {
    await expect(
      listClient.execute('inexistent-client-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
