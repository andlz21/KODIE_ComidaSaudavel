import { useMemo, useState } from 'react';
import { CartItem } from '../types';
import { ShoppingBag, ChevronRight, Apple, Flame, Award, Dumbbell, ShieldAlert, Check, RefreshCw, X, Trash2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartSummaryProps {
  items: CartItem[];
  onQuantityChange: (itemId: string, direction: 'inc' | 'dec') => void;
  onRemove: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartSummary({ items, onQuantityChange, onRemove, onClearCart }: CartSummaryProps) {
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'processing' | 'done'>('idle');

  // Compute aggregate totals
  const aggregates = useMemo(() => {
    let totalKcal = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;
    let totalPrice = 0;

    items.forEach(cartItem => {
      const q = cartItem.quantity;
      const m = cartItem.item;
      
      totalPrice += m.price * q;
      totalKcal += m.calories * q;
      
      // Handle custom or structured macros safely
      if (m.macros) {
        totalProtein += m.macros.protein * q;
        totalCarbs += m.macros.carbs * q;
        totalFat += m.macros.fat * q;
        totalFiber += m.macros.fiber * q;
      }
    });

    return {
      price: totalPrice,
      kcal: totalKcal,
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat,
      fiber: totalFiber
    };
  }, [items]);

  // Evaluate final state advice
  const mealReview = useMemo(() => {
    if (items.length === 0) return null;
    const { kcal, protein, fiber } = aggregates;

    if (protein >= 45 && fiber >= 12) {
      return {
        title: 'Banquete de Platina Fit!',
        desc: 'Excelente combo supremo! Altíssimo teor de proteínas puras e abundância de fibras vegetais solúveis. Seus músculos e microbiota agradecem.',
        icon: Award,
        color: 'border-[#BCD9AA] bg-brand-green-light/40 text-brand-green-mid'
      };
    }
    if (protein >= 35) {
      return {
        title: 'Foco Hipertrófico 💪',
        desc: 'Aporte extraordinário para construção muscular e síntese de tecidos magros. Equilíbrio metabólico excelente!',
        icon: Dumbbell,
        color: 'border-blue-200 bg-blue-50/40 text-blue-800'
      };
    }
    if (kcal > 800) {
      return {
        title: 'Combo Hiper-Enérgico ⚡',
        desc: 'Alta densidade calórica total. Ideal para repor depósitos de glicogênio muscular pós-treinos exaustivos.',
        icon: Flame,
        color: 'border-[#F5D8CD] bg-brand-orange-light/40 text-[#A66C55]'
      };
    }
    return {
      title: 'Balanço Sutil & Leve 🌱',
      desc: 'Seleção extremamente nutritiva e de fácil digestão. Ideal para manter o foco mental limpo durante o expediente!',
      icon: Apple,
      color: 'border-purple-200 bg-purple-50/30 text-purple-800'
    };
  }, [items, aggregates]);

  const handleCheckoutSubmit = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('done');
    }, 1800);
  };

  const resetCheckout = () => {
    onClearCart();
    setCheckoutStep('idle');
  };

  return (
    <div id="cart-summary" className="bg-white rounded-[32px] border border-brand-border p-6 shadow-sm sticky top-6">
      
      {checkoutStep === 'idle' && (
        <>
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-brand-green-mid" />
              <h2 className="font-sans text-xl font-bold text-brand-charcoal">Resumo da Refeição</h2>
            </div>
            <span className="bg-brand-green-light text-brand-green-mid text-xs font-bold font-mono px-3 py-1 rounded-full">
              {items.length} {items.length === 1 ? 'item' : 'itens'}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="py-12 px-4 text-center">
              <p className="text-neutral-300 text-6xl">🥗</p>
              <h3 className="font-serif text-lg font-medium text-neutral-600 mt-4 leading-tight">Escolha suas delícias</h3>
              <p className="text-neutral-400 text-xs mt-1.5 max-w-xs mx-auto leading-normal">
                Navegue pelas sobremesas, sucos prensados e combos balanceados acima e monte seu planejamento nutritivo.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Cart List */}
              <div className="max-h-72 overflow-y-auto pr-1 space-y-3.5 scrollbar-thin">
                {items.map(cartItem => (
                  <div key={cartItem.item.id} className="flex gap-3 justify-between items-start text-xs border-b border-neutral-50 pb-3 last:border-0 last:pb-0">
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-start gap-1">
                        {'custom' in cartItem.item && (
                          <span className="text-[9px] bg-brand-orange-light text-brand-orange-dark font-extrabold uppercase px-1.5 py-0.5 rounded shrink-0 mr-1">Custom</span>
                        )}
                        <h4 className="font-sans font-semibold text-brand-charcoal truncate">{cartItem.item.name}</h4>
                      </div>
                      <p className="text-neutral-400 text-[10px] truncate max-w-xs">{cartItem.item.description}</p>
                      <p className="text-emerald-700 font-mono text-[10px] font-bold">
                        {cartItem.item.calories} kcal | R$ {cartItem.item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0 ml-3">
                      <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-neutral-50">
                        <button
                          onClick={() => onQuantityChange(cartItem.item.id, 'dec')}
                          className="px-1.5 py-1 text-neutral-500 hover:bg-neutral-100 cursor-pointer transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono font-bold text-neutral-700 text-xs">{cartItem.quantity}</span>
                        <button
                          onClick={() => onQuantityChange(cartItem.item.id, 'inc')}
                          className="px-1.5 py-1 text-neutral-500 hover:bg-neutral-100 cursor-pointer transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => onRemove(cartItem.item.id)}
                        className="text-neutral-400 hover:text-[#902A2A] transition-colors p-1"
                        title="Remover item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Aggregated macro metrics */}
              <div className="bg-brand-cream border border-neutral-200/50 rounded-2xl p-4 space-y-3.5">
                <h4 className="text-xs font-sans font-bold text-brand-charcoal uppercase tracking-wider">Macros do Pedido</h4>
                
                <div className="grid grid-cols-2 gap-3 text-xs leading-tight">
                  <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-neutral-450 block text-[10px]">Energia</span>
                      <span className="font-mono text-xs font-bold text-orange-600">{aggregates.kcal} kcal</span>
                    </div>
                    <Flame className="w-4 h-4 text-orange-400 shrink-0" />
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-neutral-450 block text-[10px]">Proteínas</span>
                      <span className="font-mono text-xs font-bold text-emerald-700">{aggregates.protein}g</span>
                    </div>
                    <Dumbbell className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-neutral-450 block text-[10px]">Polifenóis/Fibras</span>
                      <span className="font-mono text-xs font-bold text-purple-700">{aggregates.fiber}g</span>
                    </div>
                    <Heart className="w-4 h-4 text-purple-400 shrink-0" />
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-neutral-450 block text-[10px]">Carboidratos</span>
                      <span className="font-mono text-xs font-bold text-amber-700">{aggregates.carbs}g</span>
                    </div>
                    <Apple className="w-4 h-4 text-amber-500 shrink-0" />
                  </div>
                </div>
              </div>

              {/* Feed advice conditional block */}
              {mealReview && (
                <div className={`border-l-4 rounded-r-xl p-3 text-xs leading-relaxed flex gap-2 ${mealReview.color}`}>
                  <mealReview.icon className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">{mealReview.title}</h5>
                    <p className="font-light mt-0.5">{mealReview.desc}</p>
                  </div>
                </div>
              )}

              {/* Totals & Price call to action button */}
              <div className="border-t border-neutral-100 pt-4 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-sans text-neutral-500 font-semibold">Valor Total:</span>
                  <span className="font-serif text-2xl font-bold text-brand-charcoal">R$ {aggregates.price.toFixed(2)}</span>
                </div>

                <button
                  id="checkout-btn"
                  onClick={handleCheckoutSubmit}
                  className="w-full flex items-center justify-center gap-2 bg-brand-green-mid hover:bg-brand-green-dark text-white py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer uppercase"
                >
                  <span>Concluir Planejamento</span>
                  <ChevronRight className="w-4.5 h-4.5 shrink-0" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* State Processing Checkout */}
      {checkoutStep === 'processing' && (
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
          <RefreshCw className="w-10 h-10 text-brand-orange-dark animate-spin" />
          <h3 className="font-serif text-lg font-semibold text-brand-charcoal">Analisando Equilíbrio Químico...</h3>
          <p className="text-xs text-neutral-400 font-light max-w-xs">
            Calculando o perfil de aminoácidos, índice glicêmico médio e índice de saciedade de seus pratos saudáveis selecionados...
          </p>
        </div>
      )}

      {/* State Complete Simulated Checkout */}
      {checkoutStep === 'done' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-6 flex flex-col items-center justify-center text-center space-y-5"
        >
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-300 shadow-sm">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-serif text-xl font-bold text-brand-charcoal leading-none">Coração & Mente Nutridos!</h3>
            <p className="text-brand-orange-dark text-xs font-mono font-bold tracking-widest uppercase py-0.5">Pedido Registrado</p>
            <p className="text-xs text-neutral-500 font-light max-w-xs leading-relaxed pt-2">
              Seu planejamento de refeições foi processado com sucesso. Seus compostos bioativos, antioxidantes e proteínas saudáveis estão garantidos para o bem-estar duradouro!
            </p>
          </div>

          {/* Dummy receipt details summarized */}
          <div className="w-full bg-neutral-50 p-4 rounded-2xl border border-neutral-100 text-[11px] text-neutral-600 text-left font-mono space-y-1.5 leading-relaxed">
            <p className="flex justify-between"><span>Total Nutrientes:</span> <strong>{aggregates.kcal} kcal</strong></p>
            <p className="flex justify-between"><span>Proteínas Totais:</span> <strong>{aggregates.protein}g</strong></p>
            <p className="flex justify-between"><span>Fibras Nutritivas:</span> <strong>{aggregates.fiber}g</strong></p>
            <p className="flex justify-between border-t border-neutral-200/50 pt-1.5 mt-1.5 text-xs text-brand-charcoal font-sans font-bold">
              <span>Valor Total Pago:</span> <strong>R$ {aggregates.price.toFixed(2)}</strong>
            </p>
          </div>

          <button
            onClick={resetCheckout}
            className="w-full bg-brand-charcoal hover:bg-neutral-850 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
          >
            Voltar ao Cardápio
          </button>
        </motion.div>
      )}

    </div>
  );
}
