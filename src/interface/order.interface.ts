interface ProductPurchaseOrder {
  url:string;
  name: string;
  quantity: number;
  note?: string;
}
interface ProductShipOrder {
  name?: string;
  image?: string;
  quantity?: number;
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
export interface CreateShipOrder {
  products: ProductShipOrder[];
  name: string;
  email: string;
  phone: string;
  shippingAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
}
