interface ProductPurchaseOrder {
  name: string;
  quantity: number;
  note?: string;
}
export interface CreatePurchaseOrder {
  products: ProductPurchaseOrder[];
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
}
