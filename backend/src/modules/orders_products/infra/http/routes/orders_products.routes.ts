import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrdersProductsController from '../controllers/OrdersProductsController';

const ordersProductsRouter = Router();
const ordersProductsController = new OrdersProductsController();

ordersProductsRouter.use(ensureAuth);

// Rota para criar um order_product
ordersProductsRouter.post(
  '/:order_id',
  celebrate({
    [Segments.PARAMS]: {
      order_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      product_id: Joi.string().required(),
      product_description: Joi.string().allow(''),
      product_value: Joi.number().required(),
    },
  }),
  ordersProductsController.create,
);

// Rota para mostrar um order_product específico
ordersProductsRouter.get(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
  }),
  ordersProductsController.show,
);

// Rota para atualizar um order_product específico
ordersProductsRouter.patch(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      product_id: Joi.string().uuid(),
      product_description: Joi.string().allow(''),
      product_value: Joi.number(),
    },
  }),
  ordersProductsController.update,
);

// Rota para deletar um order_product específico
ordersProductsRouter.delete(
  '/:order_product_id',
  celebrate({
    [Segments.PARAMS]: {
      order_product_id: Joi.string().uuid().required(),
    },
  }),
  ordersProductsController.delete,
);

export default ordersProductsRouter;
