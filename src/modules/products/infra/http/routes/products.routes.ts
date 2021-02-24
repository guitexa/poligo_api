import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import { inputAlphaNumField } from '@shared/utils/regex';
import ProductsController from '../controllers/ProductsController';
import ProductController from '../controllers/ProductController';

const productsRouter = Router();
const productsController = new ProductsController();
const productController = new ProductController();

productsRouter.use(ensureAuth);

// Rota para criar um product
productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().regex(inputAlphaNumField),
    },
  }),
  productsController.create,
);

// Rota para mostrar os products cadastrados
productsRouter.get('/', productsController.show);

// Rota para mostrar um product específico
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
