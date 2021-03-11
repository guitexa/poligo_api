// Interface para tipar as variáveis ao atualizar uma company

export default interface IUpdateCompanyDTO {
  id: string;
  name?: string;
  cnpj_cpf?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  mobile?: string;
}
