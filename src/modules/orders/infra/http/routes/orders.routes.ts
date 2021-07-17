import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { inputAlphaNumField } from '@shared/utils/regex';
import OrderController from '../controllers/OrderController';
import OrdersController from '../controllers/OrdersController';
import OrdersWithErrorsController from '../controllers/OrdersWithErrorsController';

const ordersRouter = Router();
const orderController = new OrderController();
const ordersController = new OrdersController();
const ordersWithErrorsController = new OrdersWithErrorsController();

ordersRouter.use(ensureAuth);

// Rota para criar uma order
ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      company_id: Joi.string().uuid().required(),
      seller_id: Joi.string().uuid().required(),
    },
  }),
  ordersController.create,
);

// Rota para mostrar todas as orders cadastrados
ordersRouter.get('/', ordersController.show);

// Rota para mostrar todas as orders com erros cadastrados
ordersRouter.get('/errors', ordersWithErrorsController.show);

// Rota para mostrar um order específico
ordersRouter.get(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
  }),
  orderController.show,
);

// Rota para atualizar um order específico
ordersRouter.patch(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status_order: Joi.string().allow(''),
      approved_at: Joi.date().allow(null),
      delivery_conditions: Joi.string().allow('').regex(inputAlphaNumField),
      technical_obs: Joi.string().allow('').regex(inputAlphaNumField),
      requested_delivery_date: Joi.date().allow(null),
      delivery_date: Joi.date().allow(null),
      status_delivery: Joi.string().allow(''),
      payment_way: Joi.string().allow('').regex(inputAlphaNumField),
      due_date: Joi.date().allow(null),
      payment_method_id: Joi.string().uuid().allow(null),
      status_billing: Joi.string().allow(''),
      status_payment: Joi.string().allow(''),
      technical_id: Joi.string().uuid().allow(null),
    },
  }),
  orderController.update,
);

export default ordersRouter;
