// Interface para tipar as variáveis ao criar um usuário

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  permissions: string;
}
