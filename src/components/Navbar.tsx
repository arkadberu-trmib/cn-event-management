import { ArrowUpRight } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between pointer-events-none">
      {/* Left: Logo */}
      <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/10 backdrop-blur-md text-white font-heading italic text-2xl pointer-events-auto cursor-pointer">
        C&N
      </div>

      {/* Center: Links */}
      <div className="hidden md:flex items-center liquid-glass rounded-full px-2 py-1.5 pointer-events-auto">
        <ul className="flex items-center space-x-6 px-6 text-sm font-medium text-white/90 font-body">
          {['Home', 'Services', 'About', 'Portfolio', 'Testimonials'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
                {item}
              </a>
            </li>
          ))}
        </ul>
        {/* Right CTA inside the pill */}
        <a href="#quote" className="flex items-center gap-1 bg-primary text-white rounded-full px-3.5 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">
          Get a Quote
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Mobile Right: just the CTA or hamburger placeholder */}
      <div className="md:hidden pointer-events-auto">
        <button className="flex items-center gap-1 bg-primary text-white rounded-full px-3.5 py-1.5 text-sm font-medium hover:bg-primary/90 transition-colors">
          Get a Quote
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
