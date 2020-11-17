import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import SearchOrderController from '../controllers/SearchOrderController';

const searchOrdersRouter = Router();
const searchOrder = new SearchOrderController();

searchOrdersRouter.use(ensureAuth);

searchOrdersRouter.get('/', searchOrder.show);

export default searchOrdersRouter;
