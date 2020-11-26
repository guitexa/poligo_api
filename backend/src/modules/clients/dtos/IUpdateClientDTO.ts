// Interface para tipar as variáveis ao atualizar um client

export default interface IUpdateClientDTO {
  id: string;
  name?: string;
  cnpj_cpf?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
}
