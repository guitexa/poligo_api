// Interface para tipar as variáveis ao atualizar um client

export default interface IUpdateClientDTO {
  id: string;
  name?: string;
  cpf_cnpj?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
}
