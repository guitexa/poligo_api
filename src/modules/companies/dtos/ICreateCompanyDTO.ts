// Interface para tipar as variáveis ao criar uma company

export default interface ICreateCompanyDTO {
  name: string;
  cnpj_cpf?: string;
  contact_name: string;
  email: string;
  phone?: string;
  mobile?: string;
}
