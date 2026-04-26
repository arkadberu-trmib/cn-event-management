import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Loader2, Send, X } from 'lucide-react';
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

export function Testimonials() {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    event: '',
    message: '',
    permission: false,
  });

  const testimonials = [
    {
      quote: "Nina and Char turned our dream wedding into a breathtaking reality. Every detail was executed with such elegance — truly beyond what we imagined.",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const closeForm = () => {
    setIsOpen(false);
    setFormState('idle');
    setErrorMessage('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    const fullMessage = [
      'New testimonial submission',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Event: ${form.event || 'Not specified'}`,
      `Permission to feature publicly: ${form.permission ? 'Yes' : 'No'}`,
      '',
      'Testimonial:',
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
          event_type: 'testimonial',
          event_date: form.event || 'Not specified',
          subject: `New testimonial from ${form.name}`,
          message: fullMessage,
        },
        { publicKey: PUBLIC_KEY }
      );

      setFormState('success');
      setForm({ name: '', email: '', event: '', message: '', permission: false });
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
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.2 }}
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          Leave a Testimonial
          <Send className="h-4 w-4" />
        </motion.button>
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

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close testimonial form"
              onClick={closeForm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="testimonial-title"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed left-4 right-4 top-8 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto rounded-2xl border border-white/20 bg-slate-950 p-6 shadow-2xl md:left-1/2 md:right-auto md:w-full md:max-w-xl md:-translate-x-1/2"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 id="testimonial-title" className="font-heading text-3xl italic text-white">Leave a Testimonial</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Share a note about your experience with C&N Event Management.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                  aria-label="Close testimonial form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {formState === 'success' ? (
                <div className="py-10 text-center">
                  <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400" />
                  <h4 className="mb-2 font-heading text-2xl italic text-white">Thank you!</h4>
                  <p className="mb-8 text-white/70">Your testimonial has been sent.</p>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-full border border-white/30 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="testimonial-name" className="text-sm font-medium text-white/90">Name *</label>
                      <input
                        id="testimonial-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="testimonial-email" className="text-sm font-medium text-white/90">Email *</label>
                      <input
                        id="testimonial-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                        placeholder="jane@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="testimonial-event" className="text-sm font-medium text-white/90">Event or Occasion</label>
                    <input
                      id="testimonial-event"
                      name="event"
                      type="text"
                      value={form.event}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                      placeholder="Wedding, birthday, shower..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="testimonial-message" className="text-sm font-medium text-white/90">Your Testimonial *</label>
                    <textarea
                      id="testimonial-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50"
                      placeholder="Tell us what you loved about your event..."
                    />
                  </div>

                  <label className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-white/80">
                    <input
                      id="permission"
                      name="permission"
                      type="checkbox"
                      checked={form.permission}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent accent-primary"
                    />
                    C&N Event Management may feature this testimonial on the website or social media.
                  </label>

                  {formState === 'error' && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-950/40 px-4 py-3 text-sm leading-relaxed text-red-100">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                      <span>Something went wrong. {errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Testimonial
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
