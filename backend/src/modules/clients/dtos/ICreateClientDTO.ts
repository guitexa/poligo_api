export default interface ICreateClientDTO {
  name: string;
  cpf_cnpj: string;
  phone?: string;
  email?: string;
  contacts_id?: string;
}
