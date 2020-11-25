import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrderProductController from '../controllers/OrderProductController';

const ordersProductsRouter = Router();
const orderProductController = new OrderProductController();

ordersProductsRouter.use(ensureAuth);

// Rota para mostrar um order_product específico
ordersProductsRouter.get(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
  }),
  orderProductController.show,
);

// Rota para atualizar um order_product específico
ordersProductsRouter.patch(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      product_id: Joi.string(),
      product_description: Joi.string().allow(''),
      product_value: Joi.number(),
    },
  }),
  orderProductController.update,
);

// Rota para deletar um order_product específico
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
