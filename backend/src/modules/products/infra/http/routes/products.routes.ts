import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuth);

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.show);

export default productsRouter;
