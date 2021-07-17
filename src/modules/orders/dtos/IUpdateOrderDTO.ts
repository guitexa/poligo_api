// Interface para tipar as variáveis ao atualizar uma order

export default interface IUpdateOrderDTO {
  order_id: string;
  status_order?: string;
  approved_at?: Date | null;
  delivery_conditions?: string;
  technical_obs?: string;
  requested_delivery_date?: Date | null;
  delivery_date?: Date | null;
  status_delivery?: string;
  payment_way?: string;
  due_date?: Date | null;
  payment_method_id?: string | null;
  status_billing?: string;
  status_payment?: string;
  technical_id?: string | null;
  total_value?: string;
}
