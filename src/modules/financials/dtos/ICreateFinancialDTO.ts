// Interface para tipar as variáveis ao criar um lançamento financeiro

export default interface ICreateFinancialDTO {
  company_id: string;
  order_id?: string;
  gross_value?: number;
  net_value?: number;
  due_date?: Date | null;
  nf_number?: string;
  boleto_number?: string;
  replan_date?: Date | null;
  paid_date?: Date | null;
  paid_value?: number;
  interest_rate_value?: number;
  updated_value?: number;
  initial_competence?: Date | null;
  final_competence?: Date | null;
  cost_center?: string;
  category?: string;
  bank_account_id?: string;
  description?: string;
  charge_description?: string;
  before_status_charge?: Date | null;
  at_day_status_charge?: Date | null;
  two_days_status_charge?: Date | null;
  four_days_status_charge?: Date | null;
  seven_days_status_charge?: Date | null;
  twelve_days_status_charge?: Date | null;
  twenty_days_status_charge?: Date | null;
  thirty_days_status_charge?: Date | null;
  forty_five_days_status_charge?: Date | null;
  user_id: string;
}
