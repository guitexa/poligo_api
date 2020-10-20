import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(ensureAuth);

ordersRouter.post('/', ordersController.create);
ordersRouter.get('/', ordersController.show);

export default ordersRouter;
