// Interface para tipar as variáveis ao criar um client

export default interface ICreateClientDTO {
  name: string;
  cnpj_cpf?: string;
  contact_name: string;
  email: string;
  phone?: string;
  mobile?: string;
}
