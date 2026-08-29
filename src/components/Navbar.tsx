import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Transition from 0 (at top) to 1 (at 200px scroll)
      const currentScroll = window.scrollY;
      const progress = Math.min(1, Math.max(0, currentScroll / 200));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when side menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Beranda', path: '/' },
    { label: 'Events', path: '/events' },
    { label: 'Mission', path: '/mission' },
    { label: 'Services', path: '/services' },
    { label: 'Ministries', path: '/ministries' },
    { label: 'Campuses', path: '/campuses' },
    { label: 'Connect', path: '/connect' },
  ];

  // Dynamic values based on scroll ratio
  const bgOpacity = isOpen ? 0.96 : scrollProgress * 0.96;
  const blurAmount = isOpen ? 12 : scrollProgress * 12;
  const borderOpacity = isOpen ? 0.6 : scrollProgress * 0.6;
  const shadowOpacity = isOpen ? 0.4 : scrollProgress * 0.4;
  const pyPadding = isOpen ? 14 : Math.round(24 - scrollProgress * 10);

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full px-[5%] z-[1000] flex justify-between items-center transition-[padding] duration-200 ease-out"
        style={{
          backgroundColor: `rgba(46, 27, 10, ${bgOpacity})`,
          backdropFilter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : 'none',
          WebkitBackdropFilter: blurAmount > 0.5 ? `blur(${blurAmount}px)` : 'none',
          borderBottom: `1px solid rgba(77, 48, 22, ${borderOpacity})`,
          boxShadow: shadowOpacity > 0.05 ? `0 10px 30px -10px rgba(0, 0, 0, ${shadowOpacity})` : 'none',
          paddingTop: `${pyPadding}px`,
          paddingBottom: `${pyPadding}px`,
        }}
      >
        {/* Pure White Logo */}
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 no-underline text-2xl font-bold tracking-widest group text-white transition-opacity duration-300 hover:opacity-90"
        >
          <img
            src="/Icon.png"
            alt="GRI Icon"
            className="h-12 w-auto object-contain brightness-0 invert filter transition-all duration-300 group-hover:scale-105"
          />
          <span className="text-white drop-shadow-md font-bold tracking-widest text-2xl">
            GRI
          </span>
        </Link>

        {/* Hamburger / Close Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
          className="w-11 h-11 flex items-center justify-center text-white hover:text-amber-200 transition-colors duration-300 bg-transparent border-0 cursor-pointer focus:outline-none drop-shadow-md"
        >
          {isOpen ? (
            <X className="w-8 h-8 transition-transform duration-300 rotate-0 hover:scale-110" />
          ) : (
            <Menu className="w-8 h-8 transition-transform duration-300 hover:scale-110" />
          )}
        </button>
      </nav>

      {/* Backdrop Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[998] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      />

      {/* Side Menu Drawer in Elegant Warm Brown */}
      <aside
        className={`fixed top-0 right-0 w-full max-w-[380px] h-screen bg-[#2e1b0a] z-[999] flex flex-col justify-center items-center shadow-2xl transition-transform duration-300 ease-in-out border-l border-[#4d3016] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <ul className="list-none text-center w-full space-y-6 px-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-light tracking-widest transition-all duration-300 inline-block ${
                  location.pathname === link.path
                    ? 'text-amber-200 font-bold scale-105'
                    : 'text-amber-100/90 hover:text-amber-200 hover:translate-x-2'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};
