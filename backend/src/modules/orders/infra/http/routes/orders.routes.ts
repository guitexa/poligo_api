import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrdersController from '../controllers/OrdersController';
import OrderController from '../controllers/OrderController';

const ordersRouter = Router();
const ordersController = new OrdersController();
const orderController = new OrderController();

ordersRouter.use(ensureAuth);

ordersRouter.post('/', ordersController.create);
ordersRouter.get('/', ordersController.show);
ordersRouter.get('/:order_id', orderController.show);
ordersRouter.patch('/:order_id', orderController.update);

export default ordersRouter;
