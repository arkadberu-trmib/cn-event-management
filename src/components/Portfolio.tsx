import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  {
    webp: "/images/optimized/portfolio1.webp",
    fallback: "/images/optimized/portfolio1.jpg",
    alt: "Birthday Celebration",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    width: 2048,
    height: 1638,
  },
  {
    webp: "/images/optimized/portfolio2.webp",
    fallback: "/images/optimized/portfolio2.jpg",
    alt: "Wedding Sparkler Exit",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    width: 1152,
    height: 2048,
  },
  {
    webp: "/images/optimized/portfolio3.webp",
    fallback: "/images/optimized/portfolio3.jpg",
    alt: "Dance Floor Party Event",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    width: 2048,
    height: 1366,
  },
];

type PortfolioImage = (typeof images)[number];

export function Portfolio() {
  const [selectedImage, setSelectedImage] = useState<PortfolioImage | null>(null);

  return (
    <section id="portfolio" className="py-24 px-6 lg:px-16 container mx-auto liquid-glass my-12 rounded-3xl shadow-lg border border-white/20">
      <div className="mb-16 flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-heading italic text-white mb-4 text-center drop-shadow-md"
        >
          Our Portfolio
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-white/80 max-w-2xl text-center drop-shadow"
        >
          A look at the moments we've brought to life — each one crafted with care, creativity, and intention.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
        {images.map((img, i) => (
          <motion.div
            key={img.webp}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className={`relative rounded-xl overflow-hidden cursor-pointer group border border-white/20 ${img.colSpan} ${img.rowSpan}`}
            onClick={() => setSelectedImage(img)}
          >
            <picture className="block h-full w-full">
              <source srcSet={img.webp} type="image/webp" />
              <img
                src={img.fallback}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 33vw, 100vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </picture>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white bg-black/40 backdrop-blur-md px-4 py-2 rounded-full font-medium text-sm border border-white/20">View</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-8 h-8" />
            </button>
            <picture className="contents">
              <source srcSet={selectedImage.webp} type="image/webp" />
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedImage.fallback}
                alt={selectedImage.alt}
                width={selectedImage.width}
                height={selectedImage.height}
                decoding="async"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
                onClick={(e) => e.stopPropagation()}
              />
            </picture>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
