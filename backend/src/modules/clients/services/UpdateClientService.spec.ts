import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import UpdateClientService from './UpdateClientService';

let fakeClientsRepository: FakeClientsRepository;
let updateClient: UpdateClientService;

describe('UpdateClient', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    updateClient = new UpdateClientService(fakeClientsRepository);
  });

  it('should be able to update a specific client', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    const clientOneUpdated = await updateClient.execute(newClientOne);

    expect(clientOneUpdated).toEqual(expect.objectContaining(newClientOne));
  });

  it('should be able to update a specific client using the same name', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: clientOne.name,
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    const clientOneUpdated = await updateClient.execute(newClientOne);

    expect(clientOneUpdated).toEqual(expect.objectContaining(newClientOne));
  });

  it('should be able to update a specific client with phone and without mobile', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '',
    };

    const clientOneUpdated = await updateClient.execute(newClientOne);

    expect(clientOneUpdated).toEqual(expect.objectContaining(newClientOne));
  });

  it('should be able to update a specific client with mobile and without phone', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '',
      mobile: '41983475834',
    };

    const clientOneUpdated = await updateClient.execute(newClientOne);

    expect(clientOneUpdated).toEqual(expect.objectContaining(newClientOne));
  });

  it('should NOT be able to update a client with an inexistent client_id', async () => {
    await expect(
      updateClient.execute({
        id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update a client with an existent name', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const clientTwo = await fakeClientsRepository.create({
      name: 'Another New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: clientTwo.name,
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    await expect(updateClient.execute(newClientOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a client without a CNPJ or CPF', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: 'Old Company',
      cnpj_cpf: '',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    await expect(updateClient.execute(newClientOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a client without a contact name', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: '',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    await expect(updateClient.execute(newClientOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a client without a email', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: '',
      phone: '4134354768',
      mobile: '41983475834',
    };

    await expect(updateClient.execute(newClientOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a client and let it without any phone', async () => {
    const clientOne = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '34988335566',
    });

    const newClientOne = {
      id: clientOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '',
    };

    await expect(updateClient.execute(newClientOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a client and let it without any phone', async () => {
    const clientTwo = await fakeClientsRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '',
    });

    const newClientTwo = {
      id: clientTwo.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '',
    };

    await expect(updateClient.execute(newClientTwo)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
