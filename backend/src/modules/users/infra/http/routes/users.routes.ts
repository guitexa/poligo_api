import { Router } from 'express';

import ensureAuth from '../middlewares/ensureAuth';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuth);

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.show);

export default usersRouter;
