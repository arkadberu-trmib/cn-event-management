import { FormEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowUpRight, CheckCircle, ChevronLeft, ChevronRight, Loader2, Send, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TO_EMAIL = 'eventmanagement.cn@gmail.com';

type FormState = 'idle' | 'loading' | 'success' | 'error';
type Testimonial = {
  excerpt: string;
  fullNote: string;
  author: string;
  event: string;
};

const isEmailJsConfigured =
  SERVICE_ID &&
  TEMPLATE_ID &&
  PUBLIC_KEY &&
  SERVICE_ID !== 'your_service_id' &&
  TEMPLATE_ID !== 'your_template_id' &&
  PUBLIC_KEY !== 'your_public_key';

const testimonials: Testimonial[] = [
  {
    excerpt: "From keeping things organized to bringing warmth, energy and laughter to our day, you both made the day feel joyful and truly unforgettable.",
    fullNote: "Thank you for being such an incredible part of our day!\n\nFrom keeping things organized to bringing warmth, energy and laughter to our day, you both made the day feel joyful & truly unforgettable. Thank you for being there during my momentary freak outs! Thank you for caring about our day like its your own. Your support, kindness and dedication meant more to us than words can express. We love you!!",
    author: "Arianne T",
    event: "Wedding"
  },
  {
    excerpt: "From day-of coordination, to emceeing, to the decor setup, every detail was executed flawlessly. We were able to be fully present and enjoy every moment.",
    fullNote: "Our wedding day was absolutely perfect, and we owe so much of that to this incredible team. From day-of coordination, to emceeing, to the decor setup, every detail was executed flawlessly.\n\nThey took the time to truly listen to our vision, understand what was important to us, and then somehow exceeded every expectation we had. Not only did they bring our ideas to life, but they also added their own creative touches that elevated everything beyond what we could have imagined.\n\nThroughout the entire process, they were professional, organized, attentive, and genuinely invested in making our day special. On the wedding day itself, we were able to be fully present and enjoy every moment because we knew everything was in capable hands. Any stress or concerns we had simply disappeared as they seamlessly managed every detail behind the scenes.\n\nOur guests continuously commented on how beautiful everything looked, how smoothly the event flowed, and how warm and engaging the atmosphere felt. Their dedication, hard work, and passion were evident in every aspect of the celebration.\n\nWe are incredibly grateful for everything they did to make our wedding unforgettable. If you're looking for a team that is reliable, talented, creative, and truly cares about making your vision come to life, we cannot recommend them highly enough. Thank you for helping create memories that we will cherish for the rest of our lives!!",
    author: "Maeann & Jonathan",
    event: "Wedding"
  },
  {
    excerpt: "C&N was easy to communicate with and very understanding of what we wanted. They listened to our vision and requests carefully.",
    fullNote: "C&N was easy to communicate with and very understanding of what we wanted. They listened to our vision and requests carefully, and the overall experience was great from start to finish!",
    author: "Francesca & Jon",
    event: "Baby Shower"
  },
  {
    excerpt: "Because of Nina and Char, my husband and I were able to fully enjoy and be present in every moment of our wedding without any worries.",
    fullNote: "From the moment we hired CN Event Management, Nina was with us every step of the way. She made sure every detail was thoughtfully planned and covered before our big day, especially when we incorporated Filipino traditions into our wedding. We truly appreciated their guidance, expertise, and attention to cultural details throughout the process.\n\nBecause of Nina and Char, my husband and I were able to fully enjoy and be present in every moment of our wedding without any worries. They are incredibly organized, proactive, and excellent problem-solvers. We're so grateful for all their hard work and would absolutely love to work with them again in the future!",
    author: "Matthew and Camille",
    event: "Wedding"
  }
];

export function Testimonials() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [carouselDirection, setCarouselDirection] = useState<'left' | 'right'>('right');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    event: '',
    message: '',
    permission: false,
  });

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    setActiveIndex(prev => Math.min(prev, Math.max(testimonials.length - visibleCount, 0)));
  }, [visibleCount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type, value } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const rotateTestimonials = (direction: 'left' | 'right') => {
    const maxIndex = Math.max(testimonials.length - visibleCount, 0);

    setCarouselDirection(direction);
    setActiveIndex(prev => {
      if (maxIndex === 0) return 0;
      if (direction === 'left') return prev === 0 ? maxIndex : prev - 1;
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const visibleTestimonials = testimonials.slice(activeIndex, activeIndex + visibleCount);

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
      'New love note submission',
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Event: ${form.event || 'Not specified'}`,
      `Permission to feature publicly: ${form.permission ? 'Yes' : 'No'}`,
      '',
      'Love Note:',
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
          event_type: 'love note',
          event_date: form.event || 'Not specified',
          subject: `New love note from ${form.name}`,
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
          className="mb-4 text-4xl font-heading italic text-white drop-shadow-md md:text-5xl"
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

      <div className="relative z-10 mb-6 flex justify-center gap-3 md:justify-end">
        <button
          type="button"
          onClick={() => rotateTestimonials('left')}
          aria-label="Previous love notes"
          title="Previous love notes"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => rotateTestimonials('right')}
          aria-label="Next love notes"
          title="Next love notes"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${activeIndex}-${visibleCount}`}
          initial={{ opacity: 0, x: carouselDirection === 'right' ? 28 : -28 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: carouselDirection === 'right' ? -28 : 28 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
        {visibleTestimonials.map((testimonial) => (
          <article
            key={testimonial.author}
            className="relative flex min-h-[390px] flex-col rounded-2xl border border-white/20 bg-[#314b5f]/20 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-[#314b5f]/28 hover:shadow-2xl lg:p-10"
          >
            <div className="absolute -top-4 -left-2 text-white/20 text-6xl font-heading leading-none font-serif">"</div>
            <div className="relative z-10 mb-8 min-h-[190px]">
              <p className="text-white/90 text-lg leading-relaxed italic drop-shadow-sm">
                {testimonial.excerpt}
              </p>
            </div>
            <div className="mt-auto">
              <p className="font-heading text-xl text-white drop-shadow-sm">{testimonial.author}</p>
              <p className="text-white/70 text-sm font-medium tracking-wide uppercase mt-1">{testimonial.event}</p>
              <button
                type="button"
                onClick={() => setSelectedTestimonial(testimonial)}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                Read full note
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.2 }}
        className="relative z-10 mt-12 flex justify-center"
      >
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm font-medium text-white shadow-lg transition-colors hover:bg-white/15"
        >
          Leave a Love Note
          <Send className="h-4 w-4" />
        </button>
      </motion.div>

      <AnimatePresence>
        {selectedTestimonial && (
          <>
            <motion.button
              type="button"
              aria-label="Close full love note"
              onClick={() => setSelectedTestimonial(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-x-4 top-6 z-[60] md:inset-0 md:grid md:place-items-center md:p-8">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="full-love-note-title"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-white/30 bg-[#314b5f]/70 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl md:w-full md:max-w-2xl md:max-h-[calc(100vh-4rem)] md:p-8"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                      {selectedTestimonial.event}
                    </p>
                    <h3 id="full-love-note-title" className="font-heading text-3xl italic text-white md:text-4xl">
                      {selectedTestimonial.author}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTestimonial(null)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                    aria-label="Close full love note"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="whitespace-pre-line text-base leading-relaxed text-white/85 md:text-lg">
                  {selectedTestimonial.fullNote}
                </p>
              </motion.div>
            </div>
          </>
        )}

        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close love note form"
              onClick={closeForm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <div className="fixed inset-x-4 top-6 z-50 md:inset-0 md:grid md:place-items-center md:p-8">
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="testimonial-title"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl border border-white/30 bg-[#314b5f]/50 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl md:w-full md:max-w-xl md:max-h-[calc(100vh-4rem)]"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 id="testimonial-title" className="font-heading text-3xl italic text-white">Leave a Love Note</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    Share a note about your experience with C&N Event Management.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
                  aria-label="Close love note form"
                >
                  <X className="h-5 w-5" />
                </button>
                </div>

                {formState === 'success' ? (
                <div className="py-10 text-center">
                  <CheckCircle className="mx-auto mb-4 h-14 w-14 text-green-400" />
                  <h4 className="mb-2 font-heading text-2xl italic text-white">Thank you!</h4>
                  <p className="mb-8 text-white/70">Your love note has been sent.</p>
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
                    <label htmlFor="testimonial-message" className="text-sm font-medium text-white/90">Your Note *</label>
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
                    C&N Event Management may feature this note on the website or social media.
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
                        Send Note
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
                )}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
