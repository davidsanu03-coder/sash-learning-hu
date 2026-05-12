import { motion } from "framer-motion";
import { Waves, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B2C5F] pt-20">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-12 flex flex-col lg:flex-row justify-between items-start gap-12 border-b border-white/5">
        <div className="max-w-xs">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="/logo.png" 
              alt="SASH-LEARNING-HUB" 
              className="h-8 w-auto brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <h2 className="text-white font-bold text-lg leading-none tracking-tight uppercase">SASH-LEARNING-HUB</h2>
          </div>
          <p className="text-slate-400 text-[13px] leading-relaxed font-medium">
            Empowering minds for excellence. SASH-LEARNING-HUB is your gateway to world-class education through JUPEB, IJMB, WAEC, NECO, JAMB, TECH, and VOCATIONS.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-[13px] font-bold uppercase tracking-widest">
           <div className="space-y-4">
              <h4 className="text-[#D4AF37] mb-1">Admissions</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="#" className="hover:text-white transition-colors">How to Apply</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Post UTME</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Direct Entry</Link></li>
              </ul>
           </div>
           <div className="space-y-4">
              <h4 className="text-[#D4AF37] mb-1">Portals</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="#" className="hover:text-white transition-colors">Students</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Staff</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Libraray</Link></li>
              </ul>
           </div>
           <div className="space-y-4">
              <h4 className="text-[#D4AF37] mb-1">University</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Calendar</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
           </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-white/40">
        <p>© 2026 SASH-LEARNING-HUB Portal. Empowering minds for excellence.</p>
        <div className="flex gap-8">
          <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-white transition-colors">Help Desk</Link>
        </div>
      </div>
    </footer>
  );
}
