import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
// import { inputAlphaNumField } from '@shared/utils/regex';
import BankAccountsController from '../controllers/BankAccountsController';
import BankAccountController from '../controllers/BankAccountController';

const bankAccountsRouter = Router();
const bankAccountsController = new BankAccountsController();
const bankAccountController = new BankAccountController();

bankAccountsRouter.use(ensureAuth);

// Rota para criar uma conta bancária
bankAccountsRouter.post('/', bankAccountsController.create);

// Rota para mostrar as contas bancárias cadastradas
bankAccountsRouter.get('/', bankAccountsController.show);

// Rota para mostrar uma conta bancária específico
bankAccountsRouter.get('/:bank_account_id', bankAccountController.show);

export default bankAccountsRouter;
