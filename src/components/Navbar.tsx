import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { Menu, X, User, Phone, Globe, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-50">
      {/* Top Bar */}
      <div className="bg-[#0B2C5F] text-white py-2 px-8 hidden md:flex justify-between items-center text-[11px] font-medium">
        <div className="flex gap-6 opacity-90">
          <span className="flex items-center gap-1.5">
            <Phone size={13} /> 09044283426
          </span>
          <span className="flex items-center gap-1.5">
            <Globe size={13} /> SASHLEARNINGHUB@EMAIL.COM
          </span>
        </div>

        <div className="flex gap-6">
          <span className="opacity-70">
            News: 2026/2027 Admission into JUPEB & IJMB Now Open
          </span>

          <div className="flex gap-4 border-l border-white/20 pl-4">
            <Link to="/portal" className="hover:text-[#D4AF37] transition-colors">
              Portal Login
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 py-4 px-8 flex justify-between items-center bg-white border-b border-gray-100 ${
          isScrolled ? 'shadow-md py-3' : 'shadow-sm'
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="SASH-LEARNING-HUB" className="h-10 w-auto" />

          <div>
            <h1 className="text-[#0B2C5F] font-bold text-lg uppercase tracking-tight">
              SASH-LEARNING-HUB
            </h1>
            <p className="text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase mt-1">
              Empowering minds for excellence
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 font-bold text-slate-600 text-[13px]">
          <Link to="/" className="text-[#0B2C5F]">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/academics">Academics</Link>
          <Link to="/faculties">Faculties</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/contact">Contact</Link>
          
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to={user.role === 'admin' ? '/admin' : '/dashboard'}
                className="flex items-center gap-2 bg-[#0B2C5F]/5 px-4 py-2 rounded-full text-[#0B2C5F] hover:bg-[#0B2C5F]/10 transition"
              >
                <User size={18} />
                <span className="text-sm font-bold uppercase tracking-tight">
                  {user.fullName?.split(' ')?.[0] || 'User'}
                </span>
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="text-slate-400 hover:text-red-500 transition"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/signup')}
              className="hidden sm:block bg-[#D4AF37] text-[#0B2C5F] px-6 py-2.5 rounded font-bold text-xs uppercase tracking-wider hover:bg-[#c4a022] transition"
            >
              Apply Now
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-[#0B2C5F]"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 origin-top overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6 font-bold text-slate-800 text-sm">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/academics" onClick={() => setIsOpen(false)}>Academics</Link>
              <Link to="/admissions" onClick={() => setIsOpen(false)}>Admissions</Link>

              {!user && (
                <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="text-center py-3 border border-[#0B2C5F] rounded-md font-bold uppercase text-xs"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#0B2C5F] text-white text-center py-3 rounded-md font-bold uppercase text-xs"
                  >
                    Apply Now
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}