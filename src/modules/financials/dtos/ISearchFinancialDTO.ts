// Interface para tipar as variáveis ao fazer uma busca nos lançamentos financeiros

export default interface ISearchFinancialDTO {
  due_date?: Date;
  replan_date?: Date;
  gross_value?: string;
  net_value?: string;
  paid_date?: Date;
  paid_value?: string;
  company_name?: string;
  bank_account?: string;
  status_financial?: string;
  take?: number;
  from?: string;
}
