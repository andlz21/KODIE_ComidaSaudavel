import { MenuItem, CustomIngredient } from './types';

export const menuItems: MenuItem[] = [
  // --- CONJUNTOS DE COMIDAS BALANCEADAS ---
  {
    id: 'meal-salmon',
    name: 'Combo Salmão Nobre & Aspargos',
    description: 'Posta de salmão grelhada ao molho de limão siciliano, acompanhada de arroz negro aromático, aspargos frescos salteados no azeite de ervas e purê rústico de abóbora cabotiá.',
    price: 52.90,
    calories: 540,
    category: 'meals',
    macros: { protein: 38, carbs: 42, fat: 18, fiber: 7 },
    tags: ['Rico em Ômega-3', 'Sem Glúten', 'Proteína Premium'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'meal-chicken',
    name: 'Prato Equilíbrio Saudável',
    description: 'Filé de frango grelhado marinado com mostarda Dijon e mel, servido com quinoa cozida com cenouras baby, brócolis cozido no vapor e mix de gergelim tostado.',
    price: 39.90,
    calories: 460,
    category: 'meals',
    macros: { protein: 42, carbs: 38, fat: 8, fiber: 9 },
    tags: ['Fit Clássico', 'Ganho de Massa', 'Baixo Carb'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'meal-tofu',
    name: 'Combo Vegano Proteico',
    description: 'Cubos de tofu orgânico grelhados e glaceados com canastra de shoyu de coco, arroz vermelho integral, cogumelos Paris salteados, lentilhas germinadas e folhas de espinafre ao alho.',
    price: 42.50,
    calories: 420,
    category: 'meals',
    macros: { protein: 26, carbs: 48, fat: 12, fiber: 11 },
    tags: ['100% Vegano', 'Muito Fibra', 'Antioxidante'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'meal-tilapia',
    name: 'Marmita Fit Energia Marinha',
    description: 'Lombo de tilápia com crosta de ervas finas, batata doce assada com alecrim, cenoura ralada e refogado de repolho roxo com maçã verde.',
    price: 36.90,
    calories: 390,
    category: 'meals',
    macros: { protein: 34, carbs: 32, fat: 9, fiber: 6 },
    tags: ['Funcional', 'Pobre em Gorduras', 'Leve'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
  },

  // --- BEBIDAS (FOCO EM SUCOS NATURAIS) ---
  {
    id: 'juice-green',
    name: 'Vibrar Detox Verde',
    description: 'Suco extraído a frio composto por maçã verde, couve manteiga orgânica, pepino japonês fresco, raspas de gengibre picante e gotas de limão taiti.',
    price: 15.00,
    calories: 95,
    category: 'juices',
    macros: { protein: 2, carbs: 21, fat: 0, fiber: 4 },
    tags: ['Prensado a Frio', 'Desintoxicante', 'Sem Açúcar'],
    image: 'https://images.unsplash.com/photo-1628557049538-fae242d7968f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'juice-red',
    name: 'Elixir Vermelho Antioxidante',
    description: 'Mistura vibrante batida na água de coco com morangos frescos, mirtilos silvestres, framboesas, beterraba roxa fresca e sementes de chia.',
    price: 17.50,
    calories: 125,
    category: 'juices',
    macros: { protein: 3, carbs: 26, fat: 1, fiber: 5 },
    tags: ['Rico em Antocianinas', 'Pele Jovem', 'Chia'],
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'juice-yellow',
    name: 'Sol Citrus Imunidade',
    description: 'Suco cremoso e refrescante de laranjas de lima espremidas, polpa de acerola silvestre fresca, cenoura cozida e cúrcuma coloidal orgânica para reforço imunológico.',
    price: 14.50,
    calories: 110,
    category: 'juices',
    macros: { protein: 2, carbs: 24, fat: 0, fiber: 3 },
    tags: ['Vitamina C Pura', 'Antiestresse', 'Cor Radiante'],
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'juice-herbal',
    name: 'Infusão Macio de Capim-Santo',
    description: 'Chá gelado refrescante de folhas maceradas de capim-santo com infusão fria de hortelã fresca, gotas de limão siciliano e leve toque de estévia natural.',
    price: 11.00,
    calories: 25,
    category: 'juices',
    macros: { protein: 0, carbs: 6, fat: 0, fiber: 1 },
    tags: ['Calmante Natural', 'Zero Calorias', 'Refrescante'],
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80'
  },

  // --- SOBREMESAS (COM SUB-CATEGORIAS SAUDÁVEIS E DOCES) ---
  {
    id: 'dessert-chia',
    name: 'Pudim de Chia Real com Amoras',
    description: 'Sementes de chia hidratadas lentamente no leite de amêndoas caseiro com fava de baunilha orgânica, cobertas por uma generosa geleia artesanal de frutas vermelhas e mirtilos frescos.',
    price: 18.90,
    calories: 165,
    category: 'desserts',
    subCategory: 'dessert',
    macros: { protein: 5, carbs: 18, fat: 7, fiber: 8 },
    tags: ['Fibras Solúveis', 'Vegano', 'Sem Lactose'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dessert-avocado',
    name: 'Mousse de Cacau Belga & Abacate',
    description: 'Creme aveludado e denso de abacate Hass maduro batido com puro pó de cacau selvagem 100%, adoçado levemente de mel de flores silvestres e com nibs crocantes por cima.',
    price: 19.50,
    calories: 210,
    category: 'desserts',
    subCategory: 'dessert',
    macros: { protein: 4, carbs: 16, fat: 15, fiber: 6 },
    tags: ['Gordura do Bem', 'Antioxidante', 'Low-Carb'],
    image: 'https://images.unsplash.com/photo-1541795795328-f073b763494e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dessert-parfait',
    name: 'Ninho Fit de Iogurte & Manga',
    description: 'Camadas intercaladas de iogurte grego natural desnatado sem açúcar, manga Hadem madura em cubos e granola artesanal assada com sementes de abóbora e melado de cana.',
    price: 16.00,
    calories: 180,
    category: 'desserts',
    subCategory: 'dessert',
    macros: { protein: 12, carbs: 24, fat: 4, fiber: 4 },
    tags: ['Rico em Proteínas', 'Probiótico', 'Crocante'],
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
  },

  // --- DOCES FIT (PARTE DE DOCES ENTRE AS SOBREMESAS) ---
  {
    id: 'sweet-truffle',
    name: 'Trufa Recheada de Tâmara & Coco',
    description: 'Massa macia de tâmara Medjool do Oriente moída com castanhas-de-caju defumadas, recheada de pasta de coco fresco ralado e envelopada em cacau em pó 70% cacau.',
    price: 14.00,
    calories: 110,
    category: 'sweets',
    subCategory: 'sweet',
    macros: { protein: 3, carbs: 14, fat: 5, fiber: 3 },
    tags: ['Doces Veganos', 'Sem Açúcar Refinado', 'Energia Pronta'],
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sweet-strawberry',
    name: 'Bombom Fit de Morango com Whey',
    description: 'Morangos frescos hidropônicos envoltos em pasta cremosa de Whey Protein sabor coco e cobertos por uma fina casquinha de chocolate belga zero açúcar.',
    price: 8.50,
    calories: 89,
    category: 'sweets',
    subCategory: 'sweet',
    macros: { protein: 9, carbs: 7, fat: 3, fiber: 2 },
    tags: ['Proteico', 'Sabor Gourmet', 'Sem Glúten'],
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sweet-brownie',
    name: 'Brownie Fudge de Batata Doce & Doce de Leite',
    description: 'Brownie assado à base de batata doce orgânica roxa e cacau, super molhadinho, recheado e mesclado com fios de doce de leite artesanal zero lactose e zero adição de açúcar.',
    price: 16.50,
    calories: 175,
    category: 'sweets',
    subCategory: 'sweet',
    macros: { protein: 6, carbs: 22, fat: 6, fiber: 4 },
    tags: ['Funcional', 'Doce de Leite Zero', 'Para Chocólatras'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80'
  }
];

export const customIngredients: CustomIngredient[] = [
  // CARBOHYDRATES
  { id: 'carb-quinoa', name: 'Quinoa Real com Ervas', type: 'carb', calories: 120, protein: 4, carbs: 21, fat: 2, fiber: 3, price: 9.00 },
  { id: 'carb-brownrice', name: 'Arroz Negro Aromático', type: 'carb', calories: 130, protein: 3, carbs: 26, fat: 1, fiber: 4, price: 8.00 },
  { id: 'carb-sweetpotato', name: 'Purê de Batata Doce Rústico', type: 'carb', calories: 105, protein: 2, carbs: 22, fat: 0, fiber: 3, price: 7.00 },
  { id: 'carb-risotto', name: 'Cevadinha ao Pesto de Manjericão', type: 'carb', calories: 140, protein: 4, carbs: 24, fat: 3, fiber: 4, price: 9.50 },

  // PROTEINS
  { id: 'prot-salmon', name: 'Filet de Salmão Grelhado', type: 'protein', calories: 230, protein: 24, carbs: 0, fat: 14, fiber: 0, price: 24.00 },
  { id: 'prot-chicken', name: 'Peito de Frango Desfiado Defumado', type: 'protein', calories: 160, protein: 31, carbs: 0, fat: 3, fiber: 0, price: 14.00 },
  { id: 'prot-tofu', name: 'Grelha de Tofu Orgânico Defumado', type: 'protein', calories: 110, protein: 12, carbs: 2, fat: 6, fiber: 1, price: 13.00 },
  { id: 'prot-mushrooms', name: 'Mix de Cogumelos Frescos Sauté (Shimeji/Paris)', type: 'protein', calories: 95, protein: 6, carbs: 7, fat: 4, fiber: 3, price: 16.00 },

  // VEGETABLES / SIDES
  { id: 'veg-broccoli', name: 'Brócolis & Amêndoas Tostadas', type: 'veg', calories: 75, protein: 3, carbs: 6, fat: 4, fiber: 3, price: 8.00 },
  { id: 'veg-asparagus', name: 'Aspargos Grelhados no Vapor', type: 'veg', calories: 45, protein: 2, carbs: 4, fat: 1, fiber: 2, price: 12.00 },
  { id: 'veg-spinach', name: 'Espinafre Salteado com Alho Poró', type: 'veg', calories: 50, protein: 3, carbs: 5, fat: 2, fiber: 3, price: 7.50 },
  { id: 'veg-mixveg', name: 'Mix Sauté de Abobrinha, Pimentão & Ervilha Torta', type: 'veg', calories: 60, protein: 2, carbs: 8, fat: 1, fiber: 4, price: 8.00 }
];
