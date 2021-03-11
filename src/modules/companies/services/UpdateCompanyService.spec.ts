import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import UpdateCompanyService from './UpdateCompanyService';

let fakeCompaniesRepository: FakeCompaniesRepository;
let updateCompany: UpdateCompanyService;

describe('UpdateCompany', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    updateCompany = new UpdateCompanyService(fakeCompaniesRepository);
  });

  it('should be able to update a specific company', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    const companyOneUpdated = await updateCompany.execute(newCompanyOne);

    expect(companyOneUpdated).toEqual(expect.objectContaining(newCompanyOne));
  });

  it('should be able to update a specific company using the same name', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: companyOne.name,
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    const companyOneUpdated = await updateCompany.execute(newCompanyOne);

    expect(companyOneUpdated).toEqual(expect.objectContaining(newCompanyOne));
  });

  it('should be able to update a specific company with phone and without mobile', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '',
    };

    const companyOneUpdated = await updateCompany.execute(newCompanyOne);

    expect(companyOneUpdated).toEqual(expect.objectContaining(newCompanyOne));
  });

  it('should be able to update a specific company with mobile and without phone', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '',
      mobile: '41983475834',
    };

    const companyOneUpdated = await updateCompany.execute(newCompanyOne);

    expect(companyOneUpdated).toEqual(expect.objectContaining(newCompanyOne));
  });

  it('should NOT be able to update a company with an inexistent company_id', async () => {
    await expect(
      updateCompany.execute({
        id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update a company without a name', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    await expect(
      updateCompany.execute({
        id: companyOne.id,
        name: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should NOT be able to update a company with an existent name', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const companyTwo = await fakeCompaniesRepository.create({
      name: 'Another New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: companyTwo.name,
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    await expect(updateCompany.execute(newCompanyOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a company without a contact name', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: '',
      email: 'janedoe@mail.com',
      phone: '4134354768',
      mobile: '41983475834',
    };

    await expect(updateCompany.execute(newCompanyOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a company without a email', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: '',
      phone: '4134354768',
      mobile: '41983475834',
    };

    await expect(updateCompany.execute(newCompanyOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a company and let it without any phone', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '34988335566',
    });

    const newCompanyOne = {
      id: companyOne.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '',
    };

    await expect(updateCompany.execute(newCompanyOne)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should NOT be able to update a company and let it without any phone', async () => {
    const companyTwo = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '',
    });

    const newCompanyTwo = {
      id: companyTwo.id,
      name: 'Old Company',
      cnpj_cpf: '56323545000863',
      contact_name: 'Jane Doe',
      email: 'johndoe@mail.com',
      phone: '',
      mobile: '',
    };

    await expect(updateCompany.execute(newCompanyTwo)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
