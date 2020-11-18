import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ClientsController from '../controllers/ClientsController';
import ClientController from '../controllers/ClientController';

const clientsRouter = Router();
const clientsController = new ClientsController();
const clientController = new ClientController();

clientsRouter.use(ensureAuth);

clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cpf_cnpj: Joi.string().required(),
      contact_name: Joi.string().required(),
      email: Joi.string().email(),
      phone: Joi.string().required(),
      mobile: Joi.string(),
    },
  }),
  clientsController.create,
);
clientsRouter.get('/', clientsController.show);
clientsRouter.get(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required(),
    },
  }),
  clientController.show,
);

export default clientsRouter;
