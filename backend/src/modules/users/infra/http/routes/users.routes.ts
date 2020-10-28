import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';
import UsersController from '../controllers/UsersController';
import UserController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();
const userController = new UserController();

usersRouter.use(ensureAuth);

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.show);
usersRouter.get('/:user_id', userController.show);

export default usersRouter;
