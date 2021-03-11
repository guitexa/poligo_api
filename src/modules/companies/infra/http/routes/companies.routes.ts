import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { inputAlphaNumField } from '@shared/utils/regex';
import CompaniesController from '../controllers/CompaniesController';
import CompanyController from '../controllers/CompanyController';

const companiesRouter = Router();
const companiesController = new CompaniesController();
const companyController = new CompanyController();

companiesRouter.use(ensureAuth);

// Rota para criar uma company
companiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().regex(inputAlphaNumField),
      cnpj_cpf: Joi.string().allow(''),
      contact_name: Joi.string().required().regex(inputAlphaNumField),
      email: Joi.string().email().required(),
      phone: Joi.string().allow(''),
      mobile: Joi.string().allow(''),
    },
  }),
  companiesController.create,
);

// Rota para mostrar as companies cadastradas
companiesRouter.get('/', companiesController.show);

// Rota para mostrar uma company específica
companiesRouter.get(
  '/:company_id',
  celebrate({
    [Segments.PARAMS]: {
      company_id: Joi.string().uuid().required(),
    },
  }),
  companyController.show,
);

// Rota para atualizar uma company específica
companiesRouter.patch(
  '/:company_id',
  celebrate({
    [Segments.PARAMS]: {
      company_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().allow('').regex(inputAlphaNumField),
      cnpj_cpf: Joi.string().allow(''),
      contact_name: Joi.string().allow('').regex(inputAlphaNumField),
      email: Joi.string().email().allow(''),
      phone: Joi.string().allow(''),
      mobile: Joi.string().allow(''),
    },
  }),
  companyController.update,
);

export default companiesRouter;
