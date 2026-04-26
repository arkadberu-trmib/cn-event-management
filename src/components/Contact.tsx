import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TO_EMAIL = 'eventmanagement.cn@gmail.com';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const isEmailJsConfigured =
  SERVICE_ID &&
  TEMPLATE_ID &&
  PUBLIC_KEY &&
  SERVICE_ID !== 'your_service_id' &&
  TEMPLATE_ID !== 'your_template_id' &&
  PUBLIC_KEY !== 'your_public_key';

export function Contact() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'wedding',
    date: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');
    const eventDate = form.date || 'Not specified';
    const fullMessage = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Event Type: ${form.type}`,
      `Estimated Date: ${eventDate}`,
      '',
      'Event Details:',
      form.message,
    ].join('\n');

    try {
      if (!isEmailJsConfigured) {
        throw new Error('Email service is not configured yet.');
      }

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          to_email: TO_EMAIL,
          from_name: form.name,
          from_email: form.email,
          reply_to: form.email,
          event_type: form.type,
          event_date: eventDate,
          subject: `New ${form.type} inquiry from ${form.name}`,
          message: fullMessage,
        },
        { publicKey: PUBLIC_KEY }
      );
      setFormState('success');
      setForm({ name: '', email: '', type: 'wedding', date: '', message: '' });
    } catch (error) {
      const statusText =
        error && typeof error === 'object' && 'text' in error
          ? String(error.text)
          : error instanceof Error
            ? error.message
            : '';

      setErrorMessage(statusText || `Please email us directly at ${TO_EMAIL}.`);
      setFormState('error');
    }
  };

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
          <motion.a
            href="mailto:eventmanagement.cn@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mt-4 text-white/60 hover:text-white transition-colors text-sm"
          >
            <Mail className="w-4 h-4" />
            eventmanagement.cn@gmail.com
          </motion.a>
        </div>

        {formState === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
            <h3 className="text-2xl font-heading italic text-white mb-2">Message Sent!</h3>
            <p className="text-white/70 mb-8">We'll be in touch within 24–48 hours.</p>
            <button
              onClick={() => setFormState('idle')}
              className="liquid-glass border border-white/30 rounded-full px-8 py-3 text-white text-sm hover:bg-white/20 transition-colors"
            >
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-6 relative z-10"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-white/90">First & Last Name *</label>
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white/90">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  required
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
                  value={form.type}
                  onChange={handleChange}
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
                  value={form.date}
                  onChange={handleChange}
                  className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors"
                  placeholder="Fall 2026"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-white/90">Tell us about your event details *</label>
              <textarea
                id="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-colors resize-none"
                placeholder="Guest count, estimated budget, location ideas, Pinterest vision..."
              />
            </div>

            {formState === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm leading-relaxed text-red-100"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                <span>
                  Something went wrong. {errorMessage}
                </span>
              </motion.div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full md:w-auto liquid-glass border border-white/30 rounded-full px-10 py-3.5 flex items-center justify-center gap-2 text-white font-medium hover:bg-white/20 transition-colors mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <Send className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
