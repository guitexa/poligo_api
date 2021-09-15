import { Router } from 'express';
// import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
// import { inputAlphaNumField } from '@shared/utils/regex';
import SplitsPaymentWayController from '../controllers/SplitsPaymentWayController';
import SplitPaymentWayController from '../controllers/SplitPaymentWayController';

const splitsPaymentWayRouter = Router();
const splitsPaymentWayController = new SplitsPaymentWayController();
const splitPaymentWayController = new SplitPaymentWayController();

splitsPaymentWayRouter.use(ensureAuth);

// Rota para criar um parcelamento
splitsPaymentWayRouter.post('/:order_id', splitsPaymentWayController.create);

// Rota para mostrar as parcelas de um pedido específico
splitsPaymentWayRouter.get('/:order_id', splitsPaymentWayController.show);

// Rota para mostrar uma única parcela de um pedido específico
splitsPaymentWayRouter.get(
  '/:order_id/:split_payment_way_id',
  splitPaymentWayController.show,
);

// Rota para atualizar parcelas de um pedido
splitsPaymentWayRouter.patch('/:order_id', splitsPaymentWayController.update);

// Rota para deletas todas as parcelas de um pedido
splitsPaymentWayRouter.delete('/:order_id', splitsPaymentWayController.delete);

export default splitsPaymentWayRouter;
