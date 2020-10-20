import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();
const clientsController = new ClientsController();

clientsRouter.use(ensureAuth);

clientsRouter.post('/', clientsController.create);
clientsRouter.get('/', clientsController.show);

export default clientsRouter;
