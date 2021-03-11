import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import CreateCompanyService from './CreateCompanyService';

let fakeCompaniesRepository: FakeCompaniesRepository;
let createCompany: CreateCompanyService;

describe('CreateCompany', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    createCompany = new CreateCompanyService(fakeCompaniesRepository);
  });

  it('should be able to create a new company', async () => {
    const company = await createCompany.execute({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    expect(company).toHaveProperty('id');
  });

  it('should be able to create a new company without phone', async () => {
    const company = await createCompany.execute({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '34988335566',
    });

    expect(company).toHaveProperty('id');
  });

  it('should be able to create a new company without mobile', async () => {
    const company = await createCompany.execute({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '',
    });

    expect(company).toHaveProperty('id');
  });

  it('should NOT be able to create a company without name', async () => {
    await expect(
      createCompany.execute({
        name: '',
        cnpj_cpf: '81023545000115',
        contact_name: 'John Doe',
        email: 'johndoe@mail.com',
        phone: '3433885544',
        mobile: '34988335566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a company without contact name', async () => {
    await expect(
      createCompany.execute({
        name: 'New Company',
        cnpj_cpf: '81023545000115',
        contact_name: '',
        email: 'johndoe@mail.com',
        phone: '3433885544',
        mobile: '34988335566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a company without email', async () => {
    await expect(
      createCompany.execute({
        name: 'New Company',
        cnpj_cpf: '81023545000115',
        contact_name: 'John Doe',
        email: '',
        phone: '3433885544',
        mobile: '34988335566',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to create a company without phone and mobile', async () => {
    await expect(
      createCompany.execute({
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
