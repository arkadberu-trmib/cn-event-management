import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { BlurText } from './BlurText';

export function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 flex flex-col items-start mt-20">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="liquid-glass rounded-full flex items-center p-1 pr-4 mb-6"
        >
          <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full mr-3">
            New
          </span>
          <span className="text-white/90 text-sm font-medium font-body">
            Now Booking 2026
          </span>
        </motion.div>

        {/* Heading */}
        <BlurText 
          text="Turning Your Moments Into Memories" 
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-3xl tracking-[-2px] mb-8 drop-shadow-lg"
        />

        {/* Subheading */}
        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/90 text-lg md:text-xl font-body max-w-xl leading-relaxed mb-10 drop-shadow"
        >
          We create unforgettable, budget-friendly events that feel effortlessly elegant. Let Nina and Char bring your vision to life.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button className="w-full sm:w-auto liquid-glass-strong rounded-full px-8 py-3.5 flex items-center justify-center gap-2 text-white font-medium hover:bg-white/20 transition-colors">
            Our Services
            <ArrowUpRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 font-medium text-white hover:text-white/80 transition-colors">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm">
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            </span>
            Watch Our Story
          </button>
        </motion.div>

      </div>
    </section>
  );
}
