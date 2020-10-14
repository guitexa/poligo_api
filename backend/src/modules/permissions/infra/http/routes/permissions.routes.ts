import { Router } from 'express';

import PermissionsController from '../controllers/PermissionsController';

const permissionsRouter = Router();
const permissionsController = new PermissionsController();

permissionsRouter.post('/', permissionsController.create);
permissionsRouter.get('/', permissionsController.show);

export default permissionsRouter;
