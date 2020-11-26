import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrdersController from '../controllers/OrdersController';
import OrderController from '../controllers/OrderController';

const ordersRouter = Router();
const ordersController = new OrdersController();
const orderController = new OrderController();

ordersRouter.use(ensureAuth);

// Rota para criar uma order
ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      client_id: Joi.string().uuid().required(),
      seller_id: Joi.string().uuid().required(),
    },
  }),
  ordersController.create,
);

// Rota para mostrar os orders cadastrados
ordersRouter.get('/', ordersController.show);

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
      delivery_conditions: Joi.string().allow(''),
      requested_delivery_date: Joi.date().allow(null),
      delivery_date: Joi.date().allow(null),
      status_delivery: Joi.string().allow(''),
      payment_way: Joi.string().allow(''),
      due_date: Joi.string().allow(''),
      status_billing: Joi.string().allow(''),
      status_payment: Joi.string().allow(''),
      technical_id: Joi.string().uuid().allow(null),
    },
  }),
  orderController.update,
);

export default ordersRouter;
