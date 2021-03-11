import AppError from '@shared/errors/AppError';
import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import ListCompanyService from './ListCompanyService';

let fakeCompaniesRepository: FakeCompaniesRepository;
let listCompany: ListCompanyService;

describe('ListCompany', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    listCompany = new ListCompanyService(fakeCompaniesRepository);
  });

  it('should be able to list a specific company', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const company = await listCompany.execute(companyOne.id);

    expect(company).toEqual(expect.objectContaining(companyOne));
  });

  it('should NOT be able to list with inexistent company', async () => {
    await expect(
      listCompany.execute('inexistent-company-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
