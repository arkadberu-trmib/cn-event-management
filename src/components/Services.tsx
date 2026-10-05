import { motion } from 'framer-motion';

export function Services() {
  const services = [
    {
      title: "Full Wedding Planning",
      description: "From concept to execution, we handle every detail so you can enjoy your day stress-free.",
      price: "Starting at $2,500"
    },
    {
      title: "Partial Planning & Coordination",
      description: "You have a few vendors selected and some details underway. We step in to complete the plan and bring it all together.",
      price: "Starting at $1,800"
    },
    {
      title: "Day-of Coordination",
      description: "You planned the details, we ensure your vision comes to life flawlessly on the big day.",
      price: "Starting at $1,000"
    },
    {
      title: "Wedding Emcee",
      description: "A confident, engaging host to guide your event from start to finish — keeping your guests entertained and your program running seamlessly.",
      price: "Starting at $600"
    },
    {
      title: "Decor Setup Add-On",
      description: "Share your decor plan and instructions, and we'll handle the setup so you can be fully present and enjoy the day.",
      price: "Starting at $300"
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
          Curated experiences crafted to bring your vision to life with uncompromising elegance.
        </motion.p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-6">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`liquid-glass flex h-full flex-col rounded-xl border border-white/20 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl xl:col-span-2 ${i === 3 ? 'xl:col-start-2' : ''}`}
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
