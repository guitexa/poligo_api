import { Router } from 'express';

import sessionsRouter from './sesstions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

export default routes;
