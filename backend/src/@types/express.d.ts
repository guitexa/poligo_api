/**
 * Inclusão de tipagem na biblioteca Express com objetivo
 * de buscar o id do usuário que está fazendo o request
 */

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
