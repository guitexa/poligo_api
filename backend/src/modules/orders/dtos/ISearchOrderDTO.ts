// Interface para tipar as variáveis ao fazer uma busca nas orders

export default interface ISearchOrderDTO {
  created_at?: Date;
  client_name?: string;
  seller?: string;
  technical?: string;
  product?: string;
  total_value?: string;
  status_order?: string;
  status_delivery?: string;
  status_billing?: string;
}
