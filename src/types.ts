export interface CartItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  quantity: number;
  image: string;
}

export type AppTheme = 'standard' | 'malewa';
export type AppView = 'home' | 'builder' | 'cart' | 'checkout' | 'success' | 'tracking' | 'videos' | 'profile' | 'product';
