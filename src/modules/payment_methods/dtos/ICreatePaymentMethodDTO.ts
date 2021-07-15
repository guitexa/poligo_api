// Interface para tipar as variáveis ao criar um método de pagamento

export default interface ICreatePaymentMethodDTO {
  name: string;
  split_max: string;
  split_interval: string;
  first_payment: string;
  interest_rate: string;
}
