import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrdersController from '../controllers/OrdersController';
import OrderController from '../controllers/OrderController';

const ordersRouter = Router();
const ordersController = new OrdersController();
const orderController = new OrderController();

ordersRouter.use(ensureAuth);

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
ordersRouter.get('/', ordersController.show);
ordersRouter.get(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
  }),
  orderController.show,
);
ordersRouter.patch(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      status_order: Joi.string(),
      approved_at: Joi.date(),
      delivery_conditions: Joi.string(),
      requested_delivery_date: Joi.date(),
      delivery_date: Joi.date(),
      status_delivery: Joi.string(),
      payment_way: Joi.string(),
      due_date: Joi.string(),
      status_billing: Joi.string(),
      status_payment: Joi.string(),
      technical_id: Joi.string().uuid(),
      product_id: Joi.string().uuid(),
      product_description: Joi.string(),
      product_value: Joi.number(),
    },
  }),
  orderController.update,
);

export default ordersRouter;
