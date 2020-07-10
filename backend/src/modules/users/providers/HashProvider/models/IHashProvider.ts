export default interface IHashProvider {
  generateHash(pass: string): Promise<string>;
  compareHash(pass: string, hashed: string): Promise<boolean>;
}
