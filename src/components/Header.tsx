import { Leaf, Award, Heart, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header() {
  return (
    <header className="relative w-full overflow-hidden bg-brand-green-mid text-white rounded-[32px] mt-6 px-6 py-12 md:py-20 md:px-12 shadow-sm border border-brand-border/20">
      {/* Decorative vector overlays */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent)] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-1/4 h-1/2 bg-[radial-gradient(circle_at_bottom_left,rgba(253,233,225,0.06),transparent)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/10 text-xs font-bold tracking-wider uppercase text-brand-green-light max-w-max">
            <Leaf className="w-3.5 h-3.5 text-white fill-white/20" />
            Nutrição Científica de Alta Performance
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Nutrição de precisão <br />
            <span className="text-brand-orange-light italic font-serif">para o seu potencial máximo</span>
          </h1>

          <p className="text-brand-green-light/85 font-sans text-base sm:text-lg max-w-lg leading-relaxed">
            Abandone as calorias vazias. Explore um menu inteligente formulado por especialistas de elite para calibrar bioativos e macronutrientes exatos, impulsionando seu foco, energia e vitalidade.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="flex items-center gap-2 bg-white/10 p-3.5 rounded-[20px] border border-white/5">
              <Award className="w-5 h-5 text-brand-green-light shrink-0" />
              <div>
                <p className="font-bold text-white">100% Integral</p>
                <p className="text-white/70 font-light">Zero ultraprocessados</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 p-3.5 rounded-[20px] border border-white/5">
              <Heart className="w-5 h-5 text-white shrink-0" />
              <div>
                <p className="font-bold text-white">Ativos Orgânicos</p>
                <p className="text-white/70 font-light">Sabor & Saúde Real</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white/10 p-3.5 rounded-[20px] border border-white/5 col-span-2 sm:col-span-1">
              <ShieldCheck className="w-5 h-5 text-white shrink-0" />
              <div>
                <p className="font-semibold text-white">Equilibrado</p>
                <p className="text-white/70 font-light">Nutrição exata</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative aspect-[16/10] md:aspect-[16/9] lg:aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-green-mid/40"
        >
          <img 
            src="/src/assets/images/hero_healthy_food_1779917375806.png" 
            alt="Prato saudável com salmão grelhado, arroz aromático, aspargos e suco de laranja natural" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-4 right-4 bg-brand-charcoal/90 backdrop-blur-md text-white p-4 rounded-xl border border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs text-brand-orange-dark font-mono uppercase tracking-widest font-bold">Destaque do Dia</p>
              <h3 className="font-serif text-lg font-medium">Balanço Nutritivo Perfeito</h3>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 font-mono text-sm font-bold">540 kcal</p>
              <p className="text-xs text-gray-400">Proteína: 38g | Fibras: 7g</p>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
