import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrderProductController from '../controllers/OrderProductController';

const ordersProductsRouter = Router();
const orderProductController = new OrderProductController();

ordersProductsRouter.use(ensureAuth);

ordersProductsRouter.get('/:order_product_id', orderProductController.show);
ordersProductsRouter.patch('/:order_product_id', orderProductController.update);
ordersProductsRouter.delete(
  '/:order_product_id',
  orderProductController.delete,
);

export default ordersProductsRouter;
