import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import SearchOrderController from '../controllers/SearchOrderController';

const searchOrdersRouter = Router();
const searchOrder = new SearchOrderController();

searchOrdersRouter.use(ensureAuth);

searchOrdersRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      created_at: Joi.string().allow(''),
      company: Joi.string().allow(''),
      seller: Joi.string().allow(''),
      technical: Joi.string().allow(''),
      product: Joi.string().allow(''),
      total_value: Joi.number().allow(''),
      status_order: Joi.string().allow(''),
      status_delivery: Joi.string().allow(''),
      status_billing: Joi.string().allow(''),
    },
  }),
  searchOrder.show,
);

export default searchOrdersRouter;
