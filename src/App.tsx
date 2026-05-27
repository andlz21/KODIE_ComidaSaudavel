import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, Leaf, Sparkles, Filter, Calendar, MapPin, CheckCircle2, 
  UtensilsCrossed, CupSoda, CakeSlice, Info, Star, ChevronDown, Check, ArrowDown, X
} from 'lucide-react';
import { menuItems } from './data';
import { MenuItem, CartItem } from './types';
import Header from './components/Header';
import MenuItemCard from './components/MenuItemCard';
import PlateComposer from './components/PlateComposer';
import CartSummary from './components/CartSummary';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'meals' | 'juices' | 'desserts_sweets'>('all');
  const [subDessertFilter, setSubDessertFilter] = useState<'all' | 'dessert' | 'sweet'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Floating notification alert helper
  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  // Add standard menu item to simulated order cart
  const handleAddToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.item.id === item.id);
      if (existing) {
        return prevCart.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { item, quantity: 1 }];
    });
    triggerToast(`"${item.name}" adicionado ao seu planejamento de refeições!`);
  };

  // Add custom composed plate to simulated order cart
  const handleAddCustomPlateToCart = (customMeal: {
    id: string;
    name: string;
    price: number;
    calories: number;
    description: string;
    custom: true;
    macros: { protein: number; carbs: number; fat: number; fiber: number };
  }) => {
    // Treat as MenuItem in custom state shape
    const mockMenuItem: any = {
      id: customMeal.id,
      name: customMeal.name,
      description: customMeal.description,
      price: customMeal.price,
      calories: customMeal.calories,
      category: 'meals',
      macros: customMeal.macros,
      tags: ['Feito sob medida', 'Fórmula Equilibrada'],
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      custom: true
    };

    setCart(prevCart => [...prevCart, { item: mockMenuItem, quantity: 1 }]);
    triggerToast(`Seu prato customizado especial foi incluído no menu!`);
  };

  // Manage checkout quantity adjustments
  const handleQuantityChange = (itemId: string, direction: 'inc' | 'dec') => {
    setCart(prevCart => {
      return prevCart.map(i => {
        if (i.item.id === itemId) {
          const nextQty = direction === 'inc' ? i.quantity + 1 : i.quantity - 1;
          return nextQty > 0 ? { ...i, quantity: nextQty } : null;
        }
        return i;
      }).filter((i): i is CartItem => i !== null);
    });
  };

  // Remove a specific line item
  const handleRemoveItem = (itemId: string) => {
    const matchedItem = cart.find(i => i.item.id === itemId);
    setCart(prevCart => prevCart.filter(i => i.item.id !== itemId));
    if (matchedItem) {
      triggerToast(`Fórmula "${matchedItem.item.name}" removida.`);
    }
  };

  // Wipe selections on successful simulated checkout
  const handleClearCart = () => {
    setCart([]);
  };

  // Filter implementation for search queries and tab selections
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // 1. Tag or Text Search filter
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // 2. Main Tab filter
      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'meals') return item.category === 'meals';
      if (selectedCategory === 'juices') return item.category === 'juices';
      
      if (selectedCategory === 'desserts_sweets') {
        const isDessertOrSweet = item.category === 'desserts' || item.category === 'sweets';
        if (!isDessertOrSweet) return false;

        // Apply sub-filter representing the "doce entre as sobremesas" requirement
        if (subDessertFilter === 'all') return true;
        if (subDessertFilter === 'dessert') return item.category === 'desserts';
        if (subDessertFilter === 'sweet') return item.category === 'sweets';
      }

      return true;
    });
  }, [selectedCategory, subDessertFilter, searchQuery]);

  // Decorative today date in PT-BR style
  const todayString = useMemo(() => {
    const date = new Date();
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream/80 text-brand-charcoal font-sans antialiased text-sm pb-16">
      
      {/* Visual Navigation Bar */}
      <nav className="border-b border-neutral-200/50 bg-white/90 backdrop-blur-md sticky top-0 z-40 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-brand-green-mid flex items-center justify-center text-white shadow-sm shadow-brand-green-mid/20">
              <Leaf className="w-5.5 h-5.5 text-emerald-300 fill-emerald-300/10" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-brand-charcoal tracking-tight block">Cardápio Saudável</span>
              <span className="text-[10px] text-brand-orange-dark font-extrabold uppercase tracking-widest block">Alta Gastronomia de Precisão</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs text-neutral-500 font-medium">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#A04423]" /> {todayString}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-600" /> Entrega Expressa Fit</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="#plate-composer" 
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#FEF0E9] border border-brand-orange-dark/15 text-brand-orange-dark px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-brand-orange-light transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 fill-brand-orange-dark/10" />
              Simular Prato
            </a>
            
            <a 
              href="#order-section" 
              className="bg-brand-green-light border border-brand-green-mid/15 text-brand-green-dark px-3.5 py-1.5 rounded-xl text-xs font-bold hover:bg-[#DCEAD7] transition-colors relative"
            >
              Pedido ({cart.reduce((s, i) => s + i.quantity, 0)})
            </a>
          </div>
        </div>
      </nav>

      {/* Main Page Platter container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-12">
        
        {/* Welcome Block Headers */}
        <Header />

        {/* SECTION 1: Plate builder Simulator (Combo solver) */}
        <motion.section 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <PlateComposer onAddCustomPlateToCart={handleAddCustomPlateToCart} />
        </motion.section>

        {/* SECTION 2: Menu / Catalog Area */}
        <section id="menu-catalog" className="space-y-6 pt-4 border-t border-neutral-200/40">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-neutral-200 pb-5">
            <div className="flex-1 text-center md:text-center">
              <span className="text-xs text-brand-green-mid font-mono font-extrabold uppercase tracking-widest block text-center">Fórmulas Gastronômicas</span>
              <h2 className="font-sans text-3xl font-extrabold text-brand-charcoal mt-1 text-center uppercase tracking-tight">O Cardápio de Alta Performance</h2>
              <p className="text-neutral-500 text-xs mt-1.5 text-center max-w-xl mx-auto">
                Escolha entre criações extraordinárias, formuladas com bioativos de alto rendimento e precisão de macronutrientes.
              </p>
            </div>

            {/* Interactive Search Field */}
            <div className="relative w-full md:max-w-xs shrink-0 bg-white rounded-xl border border-neutral-250 shadow-xs focus-within:ring-2 focus-within:ring-brand-green-mid/20 transition-all self-center">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Ex. Salmão, Detox, Chia, Fit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-transparent focus:outline-none placeholder-neutral-400"
              />
            </div>
          </div>

          {/* Catalog Selection Filters */}
          <div className="flex flex-col gap-4">
            {/* Category selection Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                id="tab-all"
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-brand-green-mid text-white shadow-sm'
                    : 'bg-white hover:bg-neutral-50 text-neutral-500 border border-brand-border/60'
                }`}
              >
                🍳 Todos os Itens
              </button>

              <button
                id="tab-meals"
                onClick={() => setSelectedCategory('meals')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'meals'
                    ? 'bg-brand-green-mid text-white shadow-sm'
                    : 'bg-white hover:bg-neutral-50 text-neutral-500 border border-brand-border/60'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-brand-green-light" />
                Combos Balanceados
              </button>

              <button
                id="tab-juices"
                onClick={() => setSelectedCategory('juices')}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'juices'
                    ? 'bg-brand-green-mid text-white shadow-sm'
                    : 'bg-white hover:bg-neutral-50 text-neutral-500 border border-brand-border/60'
                }`}
              >
                <CupSoda className="w-3.5 h-3.5 text-[#A66C55]" />
                Sucos & Bebidas Naturais
              </button>

              <button
                id="tab-desserts"
                onClick={() => {
                  setSelectedCategory('desserts_sweets');
                  setSubDessertFilter('all');
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all uppercase tracking-wider flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === 'desserts_sweets'
                    ? 'bg-brand-green-mid text-white shadow-sm'
                    : 'bg-white hover:bg-neutral-50 text-neutral-500 border border-brand-border/60'
                }`}
              >
                <CakeSlice className="w-3.5 h-3.5 text-[#A66C55] animate-pulse" />
                Sobremesas & Doces Fit
              </button>
            </div>

            {/* Sub-filtering for Desserts category: "coloque também um parte de doces entre as sobremesas" */}
            <AnimatePresence>
              {selectedCategory === 'desserts_sweets' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-brand-orange-light rounded-[24px] p-4 border border-[#FCD2BF]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex gap-2 items-start shrink-0">
                    <Sparkles className="w-4.5 h-4.5 text-brand-orange-dark fill-brand-orange-dark/5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-brand-charcoal">Filtro de Sobremesas Amigas da Dieta</h4>
                      <p className="text-[10.5px] text-neutral-500 font-light mt-0.5">Adicionamos uma seção focada em bombons e doces fit funcionais entre nossas sobremesas.</p>
                    </div>
                  </div>

                  <div className="flex bg-white rounded-lg p-1.5 border border-[#FCD2BF]/50 gap-1 max-w-max">
                    <button
                      onClick={() => setSubDessertFilter('all')}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        subDessertFilter === 'all'
                          ? 'bg-brand-orange-dark text-white'
                          : 'text-neutral-500 hover:bg-neutral-50'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => setSubDessertFilter('dessert')}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        subDessertFilter === 'dessert'
                          ? 'bg-brand-orange-dark text-white'
                          : 'text-neutral-500 hover:bg-neutral-50'
                      }`}
                    >
                      🍮 Sobremesas Cremosas
                    </button>
                    <button
                      onClick={() => setSubDessertFilter('sweet')}
                      className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md cursor-pointer transition-colors ${
                        subDessertFilter === 'sweet'
                          ? 'bg-brand-orange-dark text-white'
                          : 'text-neutral-500 hover:bg-neutral-50'
                      }`}
                    >
                      🍫 Doces & Bombons Fit
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Grid display with Bento Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
            
            {/* Left Hand: Menu Items List */}
            <div className="lg:col-span-8">
              {filteredItems.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-neutral-150">
                  <p className="text-4xl">🔍</p>
                  <h3 className="font-serif text-lg font-medium text-[#2C531D] mt-3">Nenhum prato localizado</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto leading-normal">
                    Não encontramos itens que correspondam ao termo "{searchQuery}". Tente digitar ingredientes clássicos como cacau, salmão, frango ou suco verdes.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="mt-4 text-xs font-bold text-brand-orange-dark underline"
                  >
                    Ver todo o cardápio
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {filteredItems.map(item => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleAddToCart}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Right Hand: Checkout Sticky panel */}
            <div id="order-section" className="lg:col-span-4 lg:sticky lg:top-20">
              <CartSummary
                items={cart}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
                onClearCart={handleClearCart}
              />
            </div>

          </div>

        </section>

      </main>

      {/* Floating alert notifications */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-96 bg-brand-charcoal text-white rounded-2xl p-4 shadow-xl border border-white/10 z-50 flex gap-3 items-center justify-between"
          >
            <div className="flex gap-2.5 items-center">
              <div className="w-8 h-8 rounded-lg bg-brand-green-mid flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-emerald-300" />
              </div>
              <p className="text-xs font-medium text-gray-200 leading-normal">{toastMessage}</p>
            </div>
            <button 
              onClick={() => setShowToast(false)} 
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer design block */}
      <footer className="mt-20 border-t border-neutral-200/60 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🥗</span>
            <span className="font-serif text-lg font-bold">NutriPlatter Cardápio Saudável</span>
          </div>
          <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
            Feito com ingredientes frescos de agricultura orgânica urbana familiar. <br />
            Produzido de forma artesanal sem conservantes artificiais ou adição de açúcares refinados. 
            Todas as calorias e indicadores nutricionais são certificados por junta clínica de nutricionistas certificados.
          </p>
          <div className="font-mono text-[10px] text-neutral-400 flex justify-center gap-4">
            <span>© 2026 Cardápio Saudável Inc.</span>
            <span>•</span>
            <span>Versão 2.4 - Estabilidade Biocelular</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
