import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '../middlewares/ensureAuth';
import UsersController from '../controllers/UsersController';
import UserController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();
const userController = new UserController();

usersRouter.use(ensureAuth);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6),
      permissions: Joi.string().required(),
    },
  }),
  usersController.create,
);
usersRouter.get('/', usersController.show);
usersRouter.get(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  userController.show,
);

export default usersRouter;
