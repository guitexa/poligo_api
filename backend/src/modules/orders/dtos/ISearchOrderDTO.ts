// Interface para tipar as variáveis ao fazer uma busca nas orders

export default interface ISearchOrderDTO {
  created_at?: Date;
  delivery_date?: Date;
  technical?: string;
  client_name?: string;
  products?: string;
  seller?: string;
  product?: string;
  total_value?: string;
  status_order?: string;
  status_delivery?: string;
  status_billing?: string;
}
