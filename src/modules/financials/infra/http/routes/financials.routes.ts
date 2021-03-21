import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
// import { inputAlphaNumField } from '@shared/utils/regex';
import FinancialsController from '../controllers/FinancialsController';
import FinancialController from '../controllers/FinancialController';
import FinancialsTodayController from '../controllers/FinancialsTodayController';

const financialsRouter = Router();
const financialsController = new FinancialsController();
const financialController = new FinancialController();
const financialsTodayController = new FinancialsTodayController();

financialsRouter.use(ensureAuth);

// Rota para criar um lançamento financeiro
financialsRouter.post('/', financialsController.create);

// Rota para mostrar todos os lançamentos financeiros cadastrados
financialsRouter.get('/', financialsController.show);

// Rota para mostrar todas as orders com erros cadastrados
financialsRouter.get('/today', financialsTodayController.show);

// Rota para mostrar um lançamento financeiro específico
financialsRouter.get('/:financial_id', financialController.show);

// Rota para atualizar um lançamento financeiro específico
financialsRouter.patch('/:financial_id', financialController.update);

export default financialsRouter;
