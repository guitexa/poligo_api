// Interface para tipar as variáveis ao fazer uma busca nas orders

export default interface ISearchOrderDTO {
  approved_at?: Date;
  created_at?: Date;
  delivery_date?: Date;
  technical?: string;
  company_name?: string;
  products?: string;
  seller?: string;
  total_value?: string;
  status_order?: string;
  status_delivery?: string;
  status_billing?: string;
  take?: number;
  from?: string;
}
