import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = ['Home', 'Services', 'About', 'Portfolio', 'Testimonials'];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <a href="#home" className="flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white font-heading italic text-2xl pointer-events-auto hover:bg-white/20 transition-colors">
          C&N
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center liquid-glass rounded-full px-2 py-1.5 pointer-events-auto">
          <ul className="flex items-center space-x-6 px-6 text-sm font-medium text-white/90 font-body">
            {navItems.map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a href="#quote" className="flex items-center gap-1 bg-primary text-white rounded-full px-3.5 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">
            Get a Quote
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile: Hamburger */}
        <div className="md:hidden pointer-events-auto">
          <button
            onClick={() => setIsOpen(prev => !prev)}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/20"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="fixed inset-0 z-30 bg-black/35 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="fixed top-20 left-4 right-4 z-40 rounded-2xl border border-white/15 bg-slate-950 p-5 shadow-2xl md:hidden"
            >
              <ul className="mb-5 divide-y divide-white/10">
                {navItems.map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setIsOpen(false)}
                      className="block py-3 text-base font-semibold text-white transition-colors hover:text-white/80"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#quote"
                onClick={() => setIsOpen(false)}
                className="flex w-full items-center justify-center gap-1 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-colors hover:bg-primary/90"
              >
                Get a Quote
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
