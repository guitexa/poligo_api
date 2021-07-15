import ICreatePaymentMethodDTO from '../dtos/ICreatePaymentMethodDTO';
import PaymentMethod from '../infra/typeorm/entities/PaymentMethod';

export default interface IPaymentMethodsRepository {
  create(paymentMethodData: ICreatePaymentMethodDTO): Promise<PaymentMethod>;
  findAll(): Promise<PaymentMethod[] | undefined>;
  findById(payment_method_id: string): Promise<PaymentMethod | undefined>;
  findByName(payment_method_name: string): Promise<PaymentMethod | undefined>;
}
