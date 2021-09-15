// Interface para tipar as variáveis ao atualizar uma order_product

export default interface IUpdateOrderDTO {
  order_product_id: string;
  product_id?: string;
  product_description?: string;
  product_value?: number;
  product_payment_type?: string;
}
