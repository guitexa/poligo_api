import cors from 'cors'; // Controla o acesso de servidores externos
import 'reflect-metadata'; // Converte os decorators do TypeORM em SQL queries
import 'dotenv/config'; // Permite utilizar arquivos de configurações de ambiente
import { errors } from 'celebrate'; // Mostra os erros de validação do celebrate na resposta da requisição

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const port = 4875; // A API está rodando nesta porta
const app = express();

app.use(
  cors({
    origin: 'app.poligo.com.br',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  }),
); // Controla o acesso de servidores externos
app.use(express.json()); // Permite utilizar JSON nas requisições
app.use(routes);

app.use(errors()); // Mostra os erros de validação do celebrate na resposta da requisição

// Middleware para lidar com os erros da aplicação
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`SERVER ON PORT ${port}`);
});
