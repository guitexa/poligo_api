/**
 * Configuração do JWT
 * O segredo usado para gerar o token está definido no arquivo /.env
 * Define que o token expira 8 horas após ser gerado
 */

export default {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    expiresIn: '8h',
  },
};
