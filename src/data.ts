export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const products: Product[] = [
  {
    id: 'prod-5',
    name: 'Mi 4K Ultra HD Smart LED TV (43 inch)',
    price: 24999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-17',
    name: 'Organic Cold Pressed Mustard Oil 1L',
    price: 299,
    category: 'Groceries',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-6',
    name: "Cotton Men's Kurta with Pyjama",
    price: 1299,
    category: 'Ethnic Wear',
    imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-7',
    name: 'Kanchipuram Silk Saree with Zari Border',
    price: 8999,
    category: 'Ethnic Wear',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-11',
    name: 'Stainless Steel Masala Dabba with 7 Spice Pots',
    price: 699,
    category: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-1',
    name: 'Noise Wireless Earbuds with ANC',
    price: 1999,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-20',
    name: 'Kashmiri Mogra Saffron (1 Gram)',
    price: 380,
    category: 'Groceries',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-10',
    name: 'Royal Embroidered Wedding Sherwani',
    price: 14500,
    category: 'Ethnic Wear',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-12',
    name: 'Pure Copper Water Bottle (1 Litre)',
    price: 849,
    category: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-2',
    name: 'boAt Rockerz Bluetooth Neckband',
    price: 1299,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-9',
    name: 'Bandhani Print Georgette Dupatta',
    price: 499,
    category: 'Ethnic Wear',
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-13',
    name: 'Prestige 2000W Induction Cooktop',
    price: 2799,
    category: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-16',
    name: 'Premium Basmati Rice 5kg',
    price: 649,
    category: 'Groceries',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-3',
    name: 'Fire-Boltt Smartwatch 1.96-inch Display',
    price: 2499,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-14',
    name: 'Handcrafted Clay Biryani Handi with Lid',
    price: 599,
    category: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-4',
    name: 'Ambrane 20000mAh Fast-Charging Power Bank',
    price: 1499,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=500&q=60',
  },
  {
    id: 'prod-18',
    name: 'Pure Desi Cow Ghee (A2 Vedic Bilona) 500ml',
    price: 899,
    category: 'Groceries',
    imageUrl: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-8',
    name: 'Chanderi Embroidered Anarkali Kurti',
    price: 2199,
    category: 'Ethnic Wear',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-19',
    name: 'Tata Tea Gold Premium Blend 1kg',
    price: 475,
    category: 'Groceries',
    imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-15',
    name: 'Traditional Brass Puja Thali Set (11 Pieces)',
    price: 1499,
    category: 'Home & Kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80',
  },
];
