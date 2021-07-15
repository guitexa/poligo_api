// Interface para tipar as variáveis ao criar uma order

export default interface ICreateOrderDTO {
  company_id: string;
  seller_id: string;
  status_order: string;
  status_delivery: string;
  status_billing: string;
  status_payment: string;
  delivery_conditions: string;
  technical_obs: string;
  payment_way: string;
  total_value: string;
}
