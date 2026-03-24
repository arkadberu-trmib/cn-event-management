import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export function Contact() {
  return (
    <section id="quote" className="py-24 px-6 lg:px-16 container mx-auto">
      <div className="max-w-4xl mx-auto liquid-glass rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
        {/* Soft decorative glow inside container */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -z-10"></div>
        
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-heading italic text-white mb-4 drop-shadow-md"
          >
            Get a Quote
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-white/80 max-w-2xl mx-auto drop-shadow"
          >
            Ready to start planning? Tell us a little about your event, and we'll be in touch to discuss how we can bring your vision to life beautifully and affordably.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6 relative z-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-white/90">First & Last Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/90">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                placeholder="jane@example.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-white/90">Event Type</label>
              <select 
                id="type" 
                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors appearance-none"
              >
                <option value="wedding" className="bg-gray-800">Wedding</option>
                <option value="party" className="bg-gray-800">Private Party</option>
                <option value="corporate" className="bg-gray-800">Corporate Event</option>
                <option value="other" className="bg-gray-800">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-white/90">Estimated Date (Optional)</label>
              <input 
                type="text" 
                id="date" 
                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                placeholder="Fall 2026"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-white/90">Tell us about your event details</label>
            <textarea 
              id="message" 
              rows={4}
              className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors resize-none"
              placeholder="Guest count, estimated budget, location ideas, Pinterest vision..."
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full md:w-auto liquid-glass border border-white/30 rounded-full px-10 py-3.5 flex items-center justify-center gap-2 text-white font-medium hover:bg-white/20 transition-colors mx-auto">
              Send Inquiry
              <Send className="w-4 h-4 ml-1" />
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
