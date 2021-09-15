import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSplitsPaymentWayService from '@modules/splits_payment_way/services/CreateSplitsPaymentWayService';
import ListSplitsPaymentWayService from '@modules/splits_payment_way/services/ListSplitsPaymentWayService';
import DeleteSplitsPaymentWayService from '@modules/splits_payment_way/services/DeleteSplitsPaymentWayService';

export default class SplitsPaymentWayController {
  // Função para criar um parcelamento
  public async create(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    const {
      payment_way,
      order_total_value,
      enter_due_date,
      enter_value,
      enter_payment_method_id,
      splits_quantity,
      split_due_date,
      split_value,
      split_payment_method_id,
    } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const createSplitsPaymentWay = container.resolve(
      CreateSplitsPaymentWayService,
    );

    // Executa o service enviando os valores recebidos no params e no body
    const split_payment_way = await createSplitsPaymentWay.execute({
      order_id,
      payment_way,
      order_total_value,
      enter_due_date,
      enter_value,
      enter_payment_method_id,
      splits_quantity,
      split_due_date,
      split_value,
      split_payment_method_id,
    });

    // Responde a requisição com o retorno do service
    return res.json(split_payment_way);
  }

  // Função para mostrar as parcelas de um pedido específico
  public async show(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const listSplitsPaymentWay = container.resolve(ListSplitsPaymentWayService);

    // Executa o service enviando os valores recebidos no params
    const split_payment_way = await listSplitsPaymentWay.execute(order_id);

    // Responde a requisição com o retorno do service
    return res.json(split_payment_way);
  }

  // Função para atualizar parcelas de um pedido
  public async update(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    const {
      payment_way,
      order_total_value,
      enter_due_date,
      enter_value,
      enter_payment_method_id,
      splits_quantity,
      split_due_date,
      split_value,
      split_payment_method_id,
    } = req.body;

    // Realiza injeção de dependência para utilizar o service
    const deleteSplitsPaymentWay = container.resolve(
      DeleteSplitsPaymentWayService,
    );

    // Executa o service enviando os valores recebidos no params
    const deleted_split_payment_way = await deleteSplitsPaymentWay.execute(
      order_id,
    );

    if (deleted_split_payment_way?.length) {
      // Realiza injeção de dependência para utilizar o service
      const createSplitsPaymentWay = container.resolve(
        CreateSplitsPaymentWayService,
      );

      // Executa o service enviando os valores recebidos no params e no body
      const split_payment_way = await createSplitsPaymentWay.execute({
        order_id,
        payment_way,
        order_total_value,
        enter_due_date,
        enter_value,
        enter_payment_method_id,
        splits_quantity,
        split_due_date,
        split_value,
        split_payment_method_id,
      });

      // Responde a requisição com o retorno do service
      return res.json(split_payment_way);
    }

    return res.status(500);
  }

  // Função para deletas todas as parcelas de um pedido
  public async delete(req: Request, res: Response): Promise<Response> {
    const { order_id } = req.params;

    // Realiza injeção de dependência para utilizar o service
    const deleteSplitsPaymentWay = container.resolve(
      DeleteSplitsPaymentWayService,
    );

    // Executa o service enviando os valores recebidos no params
    const split_payment_way = await deleteSplitsPaymentWay.execute(order_id);

    // Responde a requisição com o retorno do service
    return res.json(split_payment_way);
  }
}
