import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
// import { inputAlphaNumField, inputValueField } from '@shared/utils/regex';
import SearchFinancialController from '../controllers/SearchFinancialController';

const searchFinancialsRouter = Router();
const searchFinancial = new SearchFinancialController();

searchFinancialsRouter.use(ensureAuth);

// Rota para buscar informações dentro dos orders
searchFinancialsRouter.get('/', searchFinancial.show);

export default searchFinancialsRouter;
