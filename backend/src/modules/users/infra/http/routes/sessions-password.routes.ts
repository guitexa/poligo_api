import Router from 'express';

import SessionPasswordController from '../controllers/SessionPasswordController';

const sessionsPasswordRouter = Router();
const sessionPasswordController = new SessionPasswordController();

sessionsPasswordRouter.post('/', sessionPasswordController.create);

export default sessionsPasswordRouter;
