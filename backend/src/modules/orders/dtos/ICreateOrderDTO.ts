export default interface ICreateOrderDTO {
  client_id?: string;
  seller_id?: string;
  total_value?: number;
  status_order?: string;
  approved_at?: Date;
  delivery_conditions?: string;
  requested_delivery_date?: Date;
  delivery_date?: Date;
  status_delivery?: string;
  payment_way?: string;
  due_date?: string;
  status_billing?: string;
  status_payment?: string;
  product_id?: string;
  product_description?: string;
  product_value?: number;
  technical_id?: string;
}
