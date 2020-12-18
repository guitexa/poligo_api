import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ClientsController from '../controllers/ClientsController';
import ClientController from '../controllers/ClientController';

const clientsRouter = Router();
const clientsController = new ClientsController();
const clientController = new ClientController();

clientsRouter.use(ensureAuth);

// Rota para criar um client
clientsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      cnpj_cpf: Joi.string().allow(''),
      contact_name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().allow(''),
      mobile: Joi.string().allow(''),
    },
  }),
  clientsController.create,
);

// Rota para mostrar os clients cadastrados
clientsRouter.get('/', clientsController.show);

// Rota para mostrar um client específico
clientsRouter.get(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required(),
    },
  }),
  clientController.show,
);

// Rota para atualizar um client específico
clientsRouter.patch(
  '/:client_id',
  celebrate({
    [Segments.PARAMS]: {
      client_id: Joi.string().uuid().required(),
      name: Joi.string().allow(''),
      cnpj_cpf: Joi.string().allow(''),
      contact_name: Joi.string().allow(''),
      email: Joi.string().email().allow(''),
      phone: Joi.string().allow(''),
      mobile: Joi.string().allow(''),
    },
  }),
  clientController.update,
);

export default clientsRouter;
