import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ProductsController from '../controllers/ProductsController';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();
const productsController = new ProductsController();
const productController = new ProductController();

productsRouter.use(ensureAuth);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  productsController.create,
);
productsRouter.get('/', productsController.show);
productsRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productController.show,
);

export default productsRouter;
