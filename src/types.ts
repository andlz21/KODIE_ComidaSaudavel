export type Category = 'meals' | 'juices' | 'desserts' | 'sweets';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  category: Category;
  subCategory?: 'dessert' | 'sweet';
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  tags: string[];
  image: string;
}

export interface CustomIngredient {
  id: string;
  name: string;
  type: 'protein' | 'carb' | 'veg';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  price: number;
}

export interface CartItem {
  item: MenuItem | { id: string; name: string; price: number; calories: number; description: string; custom: true; macros: MenuItem['macros'] };
  quantity: number;
}
