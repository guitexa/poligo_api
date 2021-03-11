import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { inputAlphaNumField, inputValueField } from '@shared/utils/regex';
import SearchOrderController from '../controllers/SearchOrderController';

const searchOrdersRouter = Router();
const searchOrder = new SearchOrderController();

searchOrdersRouter.use(ensureAuth);

// Rota para buscar informações dentro dos orders
searchOrdersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      approved_at: Joi.string().allow(''),
      created_at: Joi.string().allow(''),
      delivery_date: Joi.string().allow(''),
      technical: Joi.string().allow(''),
      company_name: Joi.string().allow('').regex(inputAlphaNumField),
      seller: Joi.string().allow(''),
      products: Joi.string().allow('').regex(inputAlphaNumField),
      total_value: Joi.string().allow('').regex(inputValueField),
      status_order: Joi.string().allow(''),
      status_delivery: Joi.string().allow(''),
      status_billing: Joi.string().allow(''),
      take: Joi.string().required(),
      from: Joi.string().required(),
    },
  }),
  searchOrder.show,
);

export default searchOrdersRouter;
