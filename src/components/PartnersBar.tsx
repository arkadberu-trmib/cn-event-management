import { motion } from 'framer-motion';

export function PartnersBar() {
  const partners = [
    "The Knot",
    "WeddingWire",
    "Vogue Weddings",
    "Martha Stewart",
    "Brides",
    "Style Me Pretty"
  ];

  return (
    <div className="relative z-10 w-full bg-background/5 backdrop-blur-sm border-t border-white/10 py-6 overflow-hidden mt-auto absolute bottom-0 left-0 right-0">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="liquid-glass rounded-full px-4 py-2 text-white/80 text-xs font-medium uppercase tracking-widest whitespace-nowrap"
        >
          Trusted by couples and families everywhere
        </motion.div>
        
        <div className="flex-1 overflow-hidden relative">
          <div className="flex space-x-12 animate-marquee whitespace-nowrap items-center w-full justify-start md:justify-around">
            {partners.map((partner, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.8 }}
                className="text-2xl font-heading italic text-white/70 hover:text-white transition-colors"
              >
                {partner}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
