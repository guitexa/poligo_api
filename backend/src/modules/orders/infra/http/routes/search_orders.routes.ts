import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import SearchOrderController from '../controllers/SearchOrderController';

const searchOrdersRouter = Router();
const searchOrder = new SearchOrderController();

searchOrdersRouter.use(ensureAuth);

// Rota para buscar informações dentro dos orders
searchOrdersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      created_at: Joi.string().allow(''),
      delivery_date: Joi.string().allow(''),
      technical: Joi.string().allow(''),
      client_name: Joi.string().allow(''),
      seller: Joi.string().allow(''),
      products: Joi.string().allow(''),
      total_value: Joi.string().allow(''),
      status_order: Joi.string().allow(''),
      status_delivery: Joi.string().allow(''),
      status_billing: Joi.string().allow(''),
    },
  }),
  searchOrder.show,
);

export default searchOrdersRouter;
