import { motion } from 'framer-motion';

export function Testimonials() {
  const testimonials = [
    {
      quote: "Nina and Char made our dream wedding happen on a budget we didn't think was possible. The attention to detail was breathtaking.",
      author: "Sarah & Mike",
      event: "Rustic Modern Wedding"
    },
    {
      quote: "Absolutely phenomenal experience. The styling, the seamless coordination, and their calming presence made the day perfect.",
      author: "Jessica T.",
      event: "Bridal Shower"
    },
    {
      quote: "I can't recommend C&N enough. They perfectly captured the elegant, intimate vibe we wanted for our milestone celebration.",
      author: "David L.",
      event: "50th Anniversary Dinner"
    }
  ];

  return (
    <section id="testimonials" className="py-24 px-6 lg:px-16 container mx-auto relative overflow-hidden">
      <div className="text-center mb-16 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-heading italic text-white mb-4 drop-shadow-md"
        >
          Love Notes
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-white/80 max-w-2xl mx-auto drop-shadow"
        >
          Stories from the couples and families we've had the honor to celebrate with.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="relative liquid-glass p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
          >
            <div className="absolute -top-4 -left-2 text-white/20 text-6xl font-heading leading-none font-serif">"</div>
            <p className="text-white/90 text-lg leading-relaxed relative z-10 mb-8 italic drop-shadow-sm">
              {testimonial.quote}
            </p>
            <div className="mt-auto">
              <p className="font-heading text-xl text-white drop-shadow-sm">{testimonial.author}</p>
              <p className="text-white/70 text-sm font-medium tracking-wide uppercase mt-1">{testimonial.event}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
