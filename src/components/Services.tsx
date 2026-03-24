import { motion } from 'framer-motion';

export function Services() {
  const services = [
    {
      title: "Full-Service Planning",
      description: "From concept to execution, we handle every detail so you can enjoy your day stress-free.",
      price: "Starting at $3,500"
    },
    {
      title: "Month-Of Coordination",
      description: "You planned the details, we ensure your vision comes to life flawlessly on the big day.",
      price: "Starting at $1,200"
    },
    {
      title: "Design & Styling",
      description: "Custom design boards, floral recommendations, and sourcing for a cohesive, beautiful aesthetic.",
      price: "Starting at $800"
    },
    {
      title: "Intimate Celebrations",
      description: "Perfect for micro-weddings, bridal showers, or milestone birthdays under 50 guests.",
      price: "Starting at $500"
    }
  ];

  return (
    <section id="services" className="py-24 px-6 lg:px-16 container mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-heading italic text-white mb-4 drop-shadow-md"
        >
          Our Offerings
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }}
          className="text-white/80 max-w-2xl mx-auto drop-shadow"
        >
          Curated packages designed to fit your unique needs, bringing elegance within reach.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="liquid-glass rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/20 flex flex-col h-full"
          >
            <h3 className="text-2xl font-heading text-white mb-3">{service.title}</h3>
            <p className="text-white/70 mb-6 flex-grow leading-relaxed">
              {service.description}
            </p>
            <div className="pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="font-medium text-white/90 text-sm">{service.price}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
