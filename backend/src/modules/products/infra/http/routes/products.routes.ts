import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ProductsController from '../controllers/ProductsController';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();
const productsController = new ProductsController();
const productController = new ProductController();

productsRouter.use(ensureAuth);

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.show);
productsRouter.get('/:product_id', productController.show);

export default productsRouter;
