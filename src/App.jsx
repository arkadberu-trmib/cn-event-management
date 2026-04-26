import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';

function App() {
  const contactEmail = 'eventmanagement.cn@gmail.com';
  const instagramUrl = 'https://www.instagram.com/eventmanagement.cn?igsh=Z3d3djlocGthNTI5';
  const facebookUrl = 'https://www.facebook.com/share/1CppSJWD8E/?mibextid=wwXIfr';

  return (
    <div className="font-body text-white relative min-h-screen overflow-x-hidden">
      {/* Global Fixed Video Background */}
      <div className="fixed inset-0 z-[-10]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260306_115329_5e00c9c5-4d69-49b7-94c3-9c31c60bb644.mp4" type="video/mp4" />
        </video>
        {/* Global Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <Navbar />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
      
      <footer className="bg-black/30 backdrop-blur-lg py-16 border-t border-white/10 mt-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading italic text-3xl lg:text-4xl text-white mb-4">C&N Event Management</h2>
          <p className="text-white/80 mb-3">Beautiful Events, Effortlessly Planned</p>
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-8"
          >
            {contactEmail}
          </a>
          <div className="flex justify-center space-x-8 text-sm text-white/70 mb-12 mt-6">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a>
            <a href="#quote" className="hover:text-white transition-colors">Get a Quote</a>
          </div>
          <p className="text-xs text-white/40">© 2026 C&N Event Management. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
