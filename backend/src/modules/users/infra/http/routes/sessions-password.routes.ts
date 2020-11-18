import Router from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionPasswordController from '../controllers/SessionPasswordController';

const sessionsPasswordRouter = Router();
const sessionPasswordController = new SessionPasswordController();

sessionsPasswordRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionPasswordController.create,
);

export default sessionsPasswordRouter;
