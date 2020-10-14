import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsMailRouter from '@modules/users/infra/http/routes/sessions-mail.routes';
import sessionsPasswordRouter from '@modules/users/infra/http/routes/sessions-password.routes';

import permissionsRouter from '@modules/permissions/infra/http/routes/permissions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions-mail', sessionsMailRouter);
routes.use('/sessions-password', sessionsPasswordRouter);

routes.use('/permissions', permissionsRouter);

export default routes;
