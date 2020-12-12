import Router from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionMailController from '../controllers/SessionMailController';

const sessionsMailRouter = Router();
const sessionMailController = new SessionMailController();

// Rota da primeira autenticação do user apenas com e-mail
sessionsMailRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sessionMailController.create,
);

export default sessionsMailRouter;
