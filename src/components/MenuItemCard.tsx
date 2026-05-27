import { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, Flame, Sparkles, AlertCircle, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuItemCardProps {
  key?: string | number;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

export default function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  const [showNutriTips, setShowNutriTips] = useState(false);

  // Generate personalized functional nutrition tips per item
  const getNutritionTip = (id: string, name: string): string => {
    switch (id) {
      case 'meal-salmon':
        return 'O salmão selvagem é rico em ácidos graxos Ômega-3 (EPA de cadeia longa e DHA). Combinado com o arroz negro, proporciona liberação energética lenta de altíssima qualidade cognitiva.';
      case 'meal-chicken':
        return 'Uma refeição clássica do estilo fit de alta performance: o peito de frango fornece aminoácidos ramificados puros para síntese proteica acelerada, enquanto a quinoa age como aminoácido essencial.';
      case 'meal-tofu':
        return 'Este combo foca em fitonutrientes do espinafre e ferro do lentilhas germinadas. A absorção de ferro vegetal é amplificada pelas gotas cítricas da preparação.';
      case 'meal-tilapia':
        return 'Excelente opção hipocalórica para jantares leves pós-treino aeróbico. O puré rústico de batata-doce reabastece o glicogênio muscular sem sobrecarregar a digestão.';
      case 'juice-green':
        return 'Suco verde extraído a frio! O pepino age como diurético natural supremo, enquanto as fibras solúveis da couve apoiam o fígado nas vias naturais de detoxicação endógena.';
      case 'juice-red':
        return 'Carregado com proantocianidinas das frutas vermelhas, este elixir protege as células de estresse oxidativo. As sementes de chia criam um gel saciante perfeito no trato digestório.';
      case 'juice-yellow':
        return 'A curcumina da cúrcuma potencializa o sistema imunológico natural e combate focos de inflamação. Ideal para consumir no meio da tarde com luz solar.';
      case 'juice-herbal':
        return 'O capim-santo possui propriedades ansiolíticas e calmantes sutis que dão uma sensação de relaxamento mental profundo, reduzindo impulsividades alimentares por ansiedade.';
      case 'dessert-chia':
        return 'Substituto perfeito de sobremesas gordurosas. O ácido alfa-linolênico (ALA) da chia colabora para diminuir o índice glicêmico total da refeição.';
      case 'dessert-avocado':
        return 'O abacate fornece gordura monoinsaturada que protege o sistema cardiovascular, fornecendo saciedade cerebral potente e auxiliando na absorção de vitaminas lipossolúveis (A, D, E, K).';
      case 'dessert-parfait':
        return 'Os probióticos presentes no iogurte grego estimulam a saúde da microbiota intestinal, auxiliando na absorção de polifenóis da manga madura selvagem.';
      case 'sweet-truffle':
        return 'Tâmaras secas concentram fibras insolúveis e potássio que previnem cãibras musculares. Sacia a vontade de chocolate refinado de forma sutil e natural.';
      case 'sweet-strawberry':
        return 'O bombom une o frescor antioxidante da fruta real com o peptídeo concentrado do Whey. Ótima opção prática de doce no lanche da tarde ou pré-treino rápido.';
      case 'sweet-brownie':
        return 'O brownie de cacau selvagem auxilia na produção de serotonina, agindo como estimulante natural de humor e ânimo sem causar rebotes glicêmicos bruscos.';
      default:
        return 'Este item equilibrado estimula a energia celular duradoura e equilibra os micronutrientes do seu dia!';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      className={`${
        item.category === 'desserts' || item.category === 'sweets' 
          ? 'bg-[#FDE9E1] border-[#F5D8CD]' 
          : 'bg-white border-brand-border'
      } rounded-[32px] overflow-hidden shadow-sm hover:shadow-md border flex flex-col h-full group transition-all`}
    >
      {/* Visual Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Header Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {item.category === 'meals' && (
            <span className="bg-[#EBF5E6]/90 backdrop-blur-md text-[#2A531D] text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#BCD9AA]/50 shadow-xs">
              Combo Balanceado
            </span>
          )}
          {item.category === 'juices' && (
            <span className="bg-[#E7F3F7]/90 backdrop-blur-md text-[#285A6B] text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#BCE2EE]/50 shadow-xs">
              Suco Natural
            </span>
          )}
          {item.category === 'desserts' && (
            <span className="bg-[#F8EBF7]/90 backdrop-blur-md text-[#6D286A] text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#EDCBEB]/50 shadow-xs">
              Sobremesa Fit
            </span>
          )}
          {item.category === 'sweets' && (
            <span className="bg-[#FEF0E9]/95 backdrop-blur-md text-brand-orange-dark text-xs font-semibold px-2.5 py-1 rounded-lg border border-[#FCD2BF]/50 shadow-xs">
              Doce No-Sugar
            </span>
          )}
        </div>

        {/* Calories Counter Badge */}
        <div className="absolute bottom-3 right-3 bg-brand-charcoal/80 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1">
          <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0 fill-orange-400/20" />
          <span>{item.calories} kcal</span>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2.5">
          {item.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-neutral-50 border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-md font-medium">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-serif text-lg font-medium text-brand-charcoal group-hover:text-brand-green-mid transition-colors mb-1.5">
          {item.name}
        </h3>

        <p className="text-neutral-500 text-xs leading-relaxed line-clamp-3 mb-4">
          {item.description}
        </p>

        {/* Nutrition Bar Visuals */}
        <div className="mt-auto bg-neutral-50 p-3 rounded-xl border border-neutral-100/80 mb-4 text-[11px] space-y-2">
          <div className="flex justify-between text-neutral-500 font-mono font-semibold">
            <span>Macronutrientes g/unid:</span>
            <span className="text-neutral-400">g</span>
          </div>
          
          <div className="space-y-1.5">
            {/* Protein Bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-neutral-600">
                <span className="font-medium">Proteínas</span>
                <span className="font-mono font-bold text-emerald-700">{item.macros.protein}g</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-600 rounded-full" 
                  style={{ width: `${Math.min((item.macros.protein / 50) * 100, 100)}%` }} 
                />
              </div>
            </div>

            {/* Carbs Bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-neutral-600">
                <span className="font-medium">Carboidratos</span>
                <span className="font-mono font-bold text-amber-600">{item.macros.carbs}g</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full" 
                  style={{ width: `${Math.min((item.macros.carbs / 80) * 100, 100)}%` }} 
                />
              </div>
            </div>

            {/* Fiber Bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-neutral-600">
                <span className="font-medium">Fibras Saudáveis</span>
                <span className="font-mono font-bold text-purple-600">{item.macros.fiber}g</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 rounded-full" 
                  style={{ width: `${Math.min((item.macros.fiber / 15) * 100, 100)}%` }} 
                />
              </div>
            </div>

            {/* Fats Bar */}
            <div className="space-y-0.5">
              <div className="flex justify-between text-neutral-600">
                <span className="font-medium">Lipídios Benéficos</span>
                <span className="font-mono font-bold text-sky-600">{item.macros.fat}g</span>
              </div>
              <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-sky-500 rounded-full" 
                  style={{ width: `${Math.min((item.macros.fat / 25) * 100, 100)}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar (Price & Nutri Tips Toggle & Buy) */}
        <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-3 mt-1">
          <div>
            <span className="text-neutral-400 text-[10px] font-medium block uppercase tracking-wider">Investimento</span>
            <span className="font-mono font-bold text-brand-charcoal text-base">R$ {item.price.toFixed(2)}</span>
          </div>

          <div className="flex gap-1.5">
            {/* Nutrition Tip Button */}
            <button
              onClick={() => setShowNutriTips(!showNutriTips)}
              className={`p-2 rounded-xl border transition-all duration-300 relative ${
                showNutriTips 
                  ? 'bg-brand-orange-light text-brand-orange-dark border-brand-orange-dark/30' 
                  : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500 border-neutral-200'
              }`}
              title="Dica de Farmácia / Saúde"
            >
              <Sparkles className="w-4.5 h-4.5" />
              {/* Pulsing indicator */}
              {!showNutriTips && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-brand-orange-dark rounded-full animate-pulse" />
              )}
            </button>

            {/* Add to list */}
            <button
              id={`add-${item.id}`}
              onClick={() => onAddToCart(item)}
              className="flex items-center gap-1.5 bg-brand-green-mid hover:bg-brand-green-dark text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:shadow-md"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>

        {/* Expandable Nutrition Tips drawer inside card */}
        <AnimatePresence>
          {showNutriTips && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-3"
            >
              <div className="bg-brand-orange-light/80 border border-brand-orange-dark/15 rounded-xl p-3 text-xs text-neutral-700 flex gap-2.5">
                <AlertCircle className="w-5 h-5 text-brand-orange-dark shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-brand-orange-dark tracking-wide">Dica da Nutricionista</p>
                  <p className="font-light leading-relaxed">{getNutritionTip(item.id, item.name)}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
