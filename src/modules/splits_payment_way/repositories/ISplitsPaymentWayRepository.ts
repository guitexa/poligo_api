import ICreateSplitPaymentWayDTO from '../dtos/ICreateSplitPaymentWayDTO';
import SplitPaymentWay from '../infra/typeorm/entities/SplitPaymentWay';

export default interface ISplitsPaymentWayRepository {
  create(
    splitPaymentWayData: ICreateSplitPaymentWayDTO,
  ): Promise<SplitPaymentWay>;
  findAllFromOrderId(order_id: string): Promise<SplitPaymentWay[] | undefined>;
  findById(split_payment_way_id: string): Promise<SplitPaymentWay | undefined>;
  delete(order_id: string): Promise<SplitPaymentWay[] | undefined>;
}
