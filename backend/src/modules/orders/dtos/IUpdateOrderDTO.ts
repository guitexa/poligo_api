// Interface para tipar as variáveis ao atualizar uma order

export default interface IUpdateOrderDTO {
  order_id: string;
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
  technical_id?: string;
  product_id?: string;
  product_description?: string;
  product_value?: number;
  total_value?: string;
}
