// Interface para tipar as variáveis ao criar um método de pagamento

export default interface ICreatePaymentMethodDTO {
  name: string;
  split_max: number;
  split_interval: number;
  first_payment: number;
  interest_rate: number;
}
