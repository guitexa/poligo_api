import { Router } from 'express';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ClientsController from '../controllers/ClientsController';
import ClientController from '../controllers/ClientController';

const clientsRouter = Router();
const clientsController = new ClientsController();
const clientController = new ClientController();

clientsRouter.use(ensureAuth);

clientsRouter.post('/', clientsController.create);
clientsRouter.get('/', clientsController.show);
clientsRouter.get('/:client_id', clientController.show);

export default clientsRouter;
