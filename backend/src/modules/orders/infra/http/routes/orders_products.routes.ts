import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrderProductController from '../controllers/OrderProductController';

const ordersProductsRouter = Router();
const orderProductController = new OrderProductController();

ordersProductsRouter.use(ensureAuth);

ordersProductsRouter.get(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
  }),
  orderProductController.show,
);
ordersProductsRouter.patch(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      product_id: Joi.string(),
      product_description: Joi.string(),
      product_value: Joi.number(),
    },
  }),
  orderProductController.update,
);
ordersProductsRouter.delete(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
  }),
  orderProductController.delete,
);

export default ordersProductsRouter;
