export default interface ICreateOrderDTO {
  client_id: string;
  seller_id: string;
  status_order: 'Rascunho';
  status_delivery: '';
  status_billing: '';
  status_payment: '';
  delivery_conditions: '';
  payment_way: '';
  due_date: '';
}
