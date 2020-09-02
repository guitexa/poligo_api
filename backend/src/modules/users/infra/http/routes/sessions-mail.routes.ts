import Router from 'express';

import SessionMailController from '../controllers/SessionMailController';

const sessionsMailRouter = Router();
const sessionMailController = new SessionMailController();

sessionsMailRouter.post('/', sessionMailController.create);

export default sessionsMailRouter;
