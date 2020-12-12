import AppError from '@shared/errors/AppError';
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
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    expect(client).toHaveProperty('id');
  });

  it('should be able to create a new client without phone', async () => {
    const client = await createClient.execute({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '34988335566',
    });

    expect(client).toHaveProperty('id');
  });

  it('should be able to create a new client without mobile', async () => {
    const client = await createClient.execute({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '',
    });

    expect(client).toHaveProperty('id');
  });

  it('should NOT be able to create a client without name', async () => {
    await expect(
      createClient.execute({
        name: '',
        cnpj_cpf: '81023545000115',
        contact_name: 'John Doe',
        email: 'johndoe@mail.com',
        phone: '3433885544',
        mobile: '34988335566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a client without CNPJ/CPF', async () => {
    await expect(
      createClient.execute({
        name: 'New Company',
        cnpj_cpf: '',
        contact_name: 'John Doe',
        email: 'johndoe@mail.com',
        phone: '3433885544',
        mobile: '34988335566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a client without contact name', async () => {
    await expect(
      createClient.execute({
        name: 'New Company',
        cnpj_cpf: '81023545000115',
        contact_name: '',
        email: 'johndoe@mail.com',
        phone: '3433885544',
        mobile: '34988335566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a client without email', async () => {
    await expect(
      createClient.execute({
        name: 'New Company',
        cnpj_cpf: '81023545000115',
        contact_name: 'John Doe',
        email: '',
        phone: '3433885544',
        mobile: '34988335566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a client without phone and mobile', async () => {
    await expect(
      createClient.execute({
        name: 'New Company',
        cnpj_cpf: '81023545000115',
        contact_name: 'John Doe',
        email: 'johndoe@mail.com',
        phone: '',
        mobile: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
