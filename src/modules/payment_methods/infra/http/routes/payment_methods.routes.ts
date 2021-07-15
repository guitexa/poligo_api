import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
// import { inputAlphaNumField } from '@shared/utils/regex';
import PaymentMethodsController from '../controllers/PaymentMethodsController';
import PaymentMethodController from '../controllers/PaymentMethodController';

const paymentMethodsRouter = Router();
const paymentMethodController = new PaymentMethodsController();
const bankAccountController = new PaymentMethodController();

paymentMethodsRouter.use(ensureAuth);

// Rota para criar um método de pagamento
paymentMethodsRouter.post('/', paymentMethodController.create);

// Rota para mostrar os métodos de pagamentos cadastrados
paymentMethodsRouter.get('/', paymentMethodController.show);

// Rota para mostrar um método de pagamento específico
paymentMethodsRouter.get('/:payment_method_id', bankAccountController.show);

export default paymentMethodsRouter;
