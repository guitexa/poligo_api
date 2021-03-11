import FakeCompaniesRepository from '../repositories/fakes/FakeCompaniesRepository';
import ListCompaniesService from './ListCompaniesService';

let fakeCompaniesRepository: FakeCompaniesRepository;
let listCompany: ListCompaniesService;

describe('ListCompanies', () => {
  beforeEach(() => {
    fakeCompaniesRepository = new FakeCompaniesRepository();
    listCompany = new ListCompaniesService(fakeCompaniesRepository);
  });

  it('should be able to list companies', async () => {
    const companyOne = await fakeCompaniesRepository.create({
      name: 'New Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'John Doe',
      email: 'johndoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const companyTwo = await fakeCompaniesRepository.create({
      name: 'New Big Company',
      cnpj_cpf: '81023545000115',
      contact_name: 'Jane Doe',
      email: 'janedoe@mail.com',
      phone: '3433885544',
      mobile: '34988335566',
    });

    const companies = await listCompany.execute();

    expect(companies).toEqual(expect.arrayContaining([companyOne, companyTwo]));
  });
});
