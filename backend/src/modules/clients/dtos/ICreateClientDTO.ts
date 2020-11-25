// Interface para tipar as variáveis ao criar um client

export default interface ICreateClientDTO {
  name: string;
  cpf_cnpj: string;
  contact_name: string;
  email: string;
  phone?: string;
  mobile?: string;
}
