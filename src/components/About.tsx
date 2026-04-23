import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 px-6 lg:px-16 container mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden aspect-[4/5] shadow-2xl border border-white/20"
        >
          <img 
            src="/images/about_nina_char_1774166325257.png" 
            alt="Nina and Char - Founders of C&N Event Management" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="w-full lg:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white mb-6 drop-shadow-md"
          >
            Meet Nina & Char
          </motion.h2>
          
          <div className="space-y-6 text-white/80 text-lg leading-relaxed drop-shadow">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              We believe every moment deserves to be celebrated with intention and grace. With a shared passion for creativity and bringing people together, we founded C&N Event Management to turn beautiful visions into reality.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Every event we touch is crafted with intention, personal care, and meticulous planning. We specialize in creating elevated experiences that honor the beauty and emotion of your most precious celebrations.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-medium text-white mt-4"
            >
              Let's create something unforgettable together.
            </motion.p>
          </div>
          
        </div>
      </div>
    </section>
  );
}
