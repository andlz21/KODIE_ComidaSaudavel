import { useState, useMemo } from 'react';
import { customIngredients } from '../data';
import { CustomIngredient } from '../types';
import { Sparkles, ShoppingCart, Info, RotateCcw, Flame, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlateComposerProps {
  onAddCustomPlateToCart: (customMeal: {
    id: string;
    name: string;
    price: number;
    calories: number;
    description: string;
    custom: true;
    macros: { protein: number; carbs: number; fat: number; fiber: number };
  }) => void;
}

export default function PlateComposer({ onAddCustomPlateToCart }: PlateComposerProps) {
  const [selectedCarb, setSelectedCarb] = useState<CustomIngredient | null>(null);
  const [selectedProtein, setSelectedProtein] = useState<CustomIngredient | null>(null);
  const [selectedVeg, setSelectedVeg] = useState<CustomIngredient | null>(null);
  const [successAnimation, setSuccessAnimation] = useState(false);

  // Group ingredients by type
  const carbs = useMemo(() => customIngredients.filter(i => i.type === 'carb'), []);
  const proteins = useMemo(() => customIngredients.filter(i => i.type === 'protein'), []);
  const vegs = useMemo(() => customIngredients.filter(i => i.type === 'veg'), []);

  // Compute combined nutrition and price
  const totals = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbsCount = 0;
    let fat = 0;
    let fiber = 0;
    let price = 0;

    const items = [selectedCarb, selectedProtein, selectedVeg].filter((i): i is CustomIngredient => i !== null);

    items.forEach(item => {
      calories += item.calories;
      protein += item.protein;
      carbsCount += item.carbs;
      fat += item.fat;
      fiber += item.fiber;
      price += item.price;
    });

    return { calories, protein, carbs: carbsCount, fat, fiber, price };
  }, [selectedCarb, selectedProtein, selectedVeg]);

  // Handle building the custom meal and adding to parent cart state
  const handleAddPlate = () => {
    if (!selectedCarb || !selectedProtein || !selectedVeg) return;

    const mealDescription = `Prato customizado montado manualmente contendo: ${selectedProtein.name}, ${selectedCarb.name} e acompanhado de ${selectedVeg.name}.`;
    
    onAddCustomPlateToCart({
      id: `custom-meal-${Date.now()}`,
      name: `Meu Almoço Balanceado Custom`,
      price: totals.price,
      calories: totals.calories,
      description: mealDescription,
      custom: true,
      macros: {
        protein: totals.protein,
        carbs: totals.carbs,
        fat: totals.fat,
        fiber: totals.fiber
      }
    });

    // Run custom success animation
    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
      // Reset choices
      setSelectedCarb(null);
      setSelectedProtein(null);
      setSelectedVeg(null);
    }, 2000);
  };

  const handleReset = () => {
    setSelectedCarb(null);
    setSelectedProtein(null);
    setSelectedVeg(null);
  };

  // Nutrition Score evaluation
  const scoreReport = useMemo(() => {
    if (!selectedCarb || !selectedProtein || !selectedVeg) {
      return { msg: 'Selecione um ingrediente de cada grupo para calcular o balanço de nutrientes.', color: 'text-neutral-400 bg-neutral-50 border-neutral-200' };
    }

    const { protein, carbs: c, fiber } = totals;
    const isHighFiber = fiber >= 9;
    const isHighProtein = protein >= 45;
    
    // Ideal balance: carbs represent around 40-50%, proteins around 30-40%, fibers abundant
    if (isHighProtein && isHighFiber) {
      return { 
        msg: 'Balanço Extraordinário! 🥇 Alta densidade de aminoácidos para regeneração e teor de fibras protetoras elevado.', 
        color: 'text-brand-green-dark bg-[#EBF5E6] border-[#BCD9AA]' 
      };
    } else if (isHighProtein) {
      return { 
        msg: 'Aporte Proteico Excelente! 💪 Termômetro de massa magra ideal. Considere adicionar mais fibras no próximo combo.', 
        color: 'text-blue-900 bg-[#E8EFF9] border-[#B7D1F2]' 
      };
    } else if (isHighFiber) {
      return { 
        msg: 'Riquíssimo em Fibras e Vitaminas! 🌱 Digestão leve, saciedade de longo prazo e controle glicêmico perfeito.', 
        color: 'text-purple-900 bg-[#F5EBF8] border-[#E8CBEF]' 
      };
    } else {
      return { 
        msg: 'Prato Equilibrado! 🥗 Proporção harmônica para uma tarde focada e sem indisposição digestiva.', 
        color: 'text-teal-900 bg-[#E6F5F2] border-[#AADCCF]' 
      };
    }
  }, [selectedCarb, selectedProtein, selectedVeg, totals]);

  return (
    <div id="plate-composer" className="bg-white rounded-[32px] border border-brand-border p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-brand-border pb-5">
        <div>
          <span className="text-xs text-brand-orange-dark font-mono font-bold uppercase tracking-wider block">Construa Sua Fórmula</span>
          <h2 className="font-sans text-2xl md:text-3xl text-brand-charcoal font-bold mt-1">
            Simulador Nutricional de Alta Precisão
          </h2>
          <p className="text-neutral-500 text-sm mt-1.5 max-w-xl leading-relaxed">
            Siga o equilíbrio ideal: combine carboidratos complexos de baixo índice glicêmico, proteínas limpas de alto valor biológico e fitonutrientes bioativos frescos.
          </p>
        </div>

        {(selectedCarb || selectedProtein || selectedVeg) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 border border-neutral-250 text-neutral-500 hover:text-brand-orange-dark hover:border-brand-orange-dark/30 px-3 py-1.5 rounded-xl text-xs font-semibold bg-neutral-50 hover:bg-brand-orange-light transition-all cursor-pointer self-start md:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Resetar Prato</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Columns of selection */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Group 1: Carbohydrates */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold font-mono flex items-center justify-center">1</span>
              <h3 className="font-sans text-sm font-semibold text-brand-charcoal uppercase tracking-wider">
                Carboidratos Saudáveis / Bases de Grãos
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {carbs.map(item => {
                const isSelected = selectedCarb?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedCarb(item)}
                    className={`text-left p-3.5 rounded-2xl border transition-all relative cursor-pointer group flex flex-col justify-between h-28 ${
                      isSelected 
                        ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20' 
                        : 'border-neutral-200 hover:border-amber-300 hover:bg-amber-50/10'
                    }`}
                  >
                    <div>
                      <h4 className="font-sans font-medium text-xs text-brand-charcoal line-clamp-1 group-hover:text-amber-800 transition-colors">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400 mt-1">{item.calories} kcal | Carb {item.carbs}g</p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 w-full">
                      <span className="font-sans font-bold text-xs text-brand-charcoal">R$ {item.price.toFixed(2)}</span>
                      {isSelected && <CheckCircle2 className="w-4.5 h-4.5 text-amber-600 fill-amber-50" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 2: Proteins */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-emerald-105 bg-emerald-100 text-emerald-700 text-xs font-bold font-mono flex items-center justify-center">2</span>
              <h3 className="font-sans text-sm font-semibold text-brand-charcoal uppercase tracking-wider">
                Proteínas de Alto Valor Biológico
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {proteins.map(item => {
                const isSelected = selectedProtein?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedProtein(item)}
                    className={`text-left p-3.5 rounded-2xl border transition-all relative cursor-pointer group flex flex-col justify-between h-28 ${
                      isSelected 
                        ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-500/20' 
                        : 'border-neutral-200 hover:border-emerald-300 hover:bg-emerald-50/10'
                    }`}
                  >
                    <div>
                      <h4 className="font-sans font-medium text-xs text-brand-charcoal line-clamp-1 group-hover:text-emerald-800 transition-colors">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400 mt-1">{item.calories} kcal | Prot {item.protein}g</p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 w-full">
                      <span className="font-sans font-bold text-xs text-brand-charcoal">R$ {item.price.toFixed(2)}</span>
                      {isSelected && <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 fill-emerald-50" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Group 3: Siding / Greens */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 text-xs font-bold font-mono flex items-center justify-center">3</span>
              <h3 className="font-sans text-sm font-semibold text-brand-charcoal uppercase tracking-wider">
                Acompanhamentos Verdes / Fibras de Vegetal
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {vegs.map(item => {
                const isSelected = selectedVeg?.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVeg(item)}
                    className={`text-left p-3.5 rounded-2xl border transition-all relative cursor-pointer group flex flex-col justify-between h-28 ${
                      isSelected 
                        ? 'border-purple-600 bg-purple-50/30 ring-2 ring-purple-500/20' 
                        : 'border-neutral-200 hover:border-purple-300 hover:bg-purple-50/10'
                    }`}
                  >
                    <div>
                      <h4 className="font-sans font-medium text-xs text-brand-charcoal line-clamp-1 group-hover:text-purple-800 transition-colors">
                        {item.name}
                      </h4>
                      <p className="font-mono text-[10px] text-neutral-400 mt-1">{item.calories} kcal | Fib {item.fiber}g</p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 w-full">
                      <span className="font-sans font-bold text-xs text-brand-charcoal">R$ {item.price.toFixed(2)}</span>
                      {isSelected && <CheckCircle2 className="w-4.5 h-4.5 text-purple-600 fill-purple-50" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Visualizing the Plate Representation */}
        <div className="lg:col-span-4 bg-brand-green-light/20 rounded-[28px] p-5 border border-brand-border flex flex-col items-center">
          <h3 className="font-sans text-xs font-bold text-brand-charcoal uppercase tracking-wider mb-5 self-start">
            Distribuição do seu prato
          </h3>

          {/* Virtual Graphic Plate */}
          <div className="relative w-48 h-48 bg-white rounded-full border border-neutral-300 flex items-center justify-center shadow-inner group overflow-hidden mb-5">
            {/* Split Backgrounds */}
            <div className="absolute inset-x-0 top-0 h-1/2 flex">
              {/* Top-Left: Carbohydrate sector */}
              <div 
                className={`w-1/2 h-full border-r border-[#EBF5E6]/80 transition-all duration-500 flex items-center justify-center ${
                  selectedCarb ? 'bg-amber-100 text-amber-800' : 'bg-neutral-50/60 text-neutral-300'
                }`}
              >
                <div className="text-[11px] font-bold text-center leading-tight">
                  <p>Carbos</p>
                  <p className="text-[9px] font-mono">{selectedCarb ? `${selectedCarb.carbs}g` : '25%'}</p>
                </div>
              </div>

              {/* Top-Right: Protein sector */}
              <div 
                className={`w-1/2 h-full transition-all duration-500 flex items-center justify-center ${
                  selectedProtein ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-50/90 text-neutral-300'
                }`}
              >
                <div className="text-[11px] font-bold text-center leading-tight">
                  <p>Proteínas</p>
                  <p className="text-[9px] font-mono">{selectedProtein ? `${selectedProtein.protein}g` : '25%'}</p>
                </div>
              </div>
            </div>

            {/* Bottom Half: Full Greens sector (50% area representing dietary guidance) */}
            <div 
              className={`absolute inset-x-0 bottom-0 h-1/2 border-t border-neutral-200 transition-all duration-500 flex items-center justify-center ${
                selectedVeg ? 'bg-purple-100 text-purple-800' : 'bg-neutral-50/40 text-neutral-300'
              }`}
            >
              <div className="text-[11px] font-bold text-center leading-tight">
                <p>Nutrientes Verdes & Fibras</p>
                <p className="text-[9px] font-mono">{selectedVeg ? `${selectedVeg.fiber}g fibras` : '50% recomendado'}</p>
              </div>
            </div>

            {/* Middle Platter Core Circle */}
            <div className="absolute w-16 h-16 rounded-full bg-white border-2 border-neutral-200 shadow-md flex items-center justify-center flex-col z-10 font-mono">
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest leading-none">Prato</span>
              <span className="text-xs font-bold text-brand-charcoal mt-1 leading-none">{totals.calories || '--'}</span>
              <span className="text-[8px] text-neutral-400">kcal</span>
            </div>
          </div>

          {/* Selections list */}
          <div className="w-full space-y-2 border-t border-neutral-200/55 pt-4 text-xs">
            <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-neutral-100">
              <span className="text-neutral-400">Arroz/Base (25%):</span>
              <span className={`font-semibold shrink-0 text-right truncate max-w-[140px] ${selectedCarb ? 'text-amber-700' : 'text-neutral-300 italic'}`}>
                {selectedCarb ? selectedCarb.name : 'Vazio'}
              </span>
            </div>

            <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-neutral-100">
              <span className="text-neutral-400">Proteína (25%):</span>
              <span className={`font-semibold shrink-0 text-right truncate max-w-[140px] ${selectedProtein ? 'text-emerald-700' : 'text-neutral-300 italic'}`}>
                {selectedProtein ? selectedProtein.name : 'Vazio'}
              </span>
            </div>

            <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-neutral-100">
              <span className="text-neutral-400">Vez Veggies (50%):</span>
              <span className={`font-semibold shrink-0 text-right truncate max-w-[140px] ${selectedVeg ? 'text-purple-700' : 'text-neutral-300 italic'}`}>
                {selectedVeg ? selectedVeg.name : 'Vazio'}
              </span>
            </div>
          </div>

          {/* Interactive Report Banner */}
          <div className={`w-full text-xs rounded-xl p-3 border mt-4 leading-normal ${scoreReport.color}`}>
            <div className="flex gap-2 items-start">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="font-light">{scoreReport.msg}</p>
            </div>
          </div>

          {/* Call to action trigger */}
          <button
            onClick={handleAddPlate}
            disabled={!selectedCarb || !selectedProtein || !selectedVeg || successAnimation}
            className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm shadow-xs transition-all uppercase tracking-wide cursor-pointer ${
              selectedCarb && selectedProtein && selectedVeg 
                ? 'bg-brand-orange-dark text-white hover:bg-orange-850 hover:shadow-md'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            {successAnimation ? (
              <span className="flex items-center gap-1.5 text-emerald-300 font-bold font-sans">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 fill-white" />
                Adicionado ao Menu!
              </span>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Pedir Prato R$ {totals.price.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
