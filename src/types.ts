import type { Product } from './data';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ToastInfo = {
  id: string;
  message: string;
  product?: Product;
  type?: 'cart' | 'wishlist' | 'info';
};
