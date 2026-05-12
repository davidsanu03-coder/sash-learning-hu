import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  CreditCard,
  ClipboardCheck,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const actions = [
    {
      icon: ClipboardCheck,
      title: 'Apply for Admission',
      step: 'Step 1: Registration',
      color: 'bg-blue-50 text-[#0B2C5F]',
      link: '/signup'
    },
    {
      icon: CreditCard,
      title: 'Buy Admission Form',
      step: '₦5,000 Application Fee',
      color: 'bg-amber-50 text-[#D4AF37]',
      link: '/buy-form'
    },
    {
      icon: GraduationCap,
      title: 'Admission Status',
      step: 'Track Application',
      color: 'bg-green-50 text-green-600',
      link: '/dashboard'
    },
    {
      icon: User,
      title: 'Portal Login',
      step: 'Student Access Only',
      color: 'bg-purple-50 text-purple-600',
      link: '/login'
    }
  ];

  return (
    <div className="overflow-hidden bg-[#F8FAFC]">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col lg:flex-row pt-20">

        <div className="w-full lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-[0.2em] rounded mb-6 border border-red-100">
              Admissions 2026/2027 Now Open
            </div>

            <h1 className="text-[56px] lg:text-[72px] font-black text-[#0B2C5F] leading-[1.05] mb-8">
              Your Journey to <span className="text-[#D4AF37]">Excellence</span>
            </h1>

            <p className="text-slate-500 text-lg mb-12 max-w-md">
              Join SASH Learning Hub for WAEC, JAMB, IJMB, JUPEB and vocational training.
            </p>

            <div className="flex gap-5">
              <Link to="/signup" className="bg-[#0B2C5F] text-white px-8 py-4 rounded-lg font-bold flex items-center gap-2">
                Register Now <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* IMAGE */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] bg-slate-200">
          <img
            src="https://images.unsplash.com/photo-1523050335109-d56477d85c33?auto=format&fit=crop&w=2670"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Learning"
          />
        </div>
      </section>

      {/* ACTIONS */}
      <section className="px-8 lg:px-24 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {actions.map((item, i) => {
          const Icon = item.icon;

          return (
            <Link
              key={i}
              to={item.link}
              className="bg-white p-8 rounded-2xl border hover:shadow-xl transition flex flex-col items-center text-center"
            >
              <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mb-6`}>
                <Icon size={26} />
              </div>

              <h3 className="font-bold text-[#0B2C5F] mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400 uppercase">{item.step}</p>
            </Link>
          );
        })}
      </section>

    </div>
  );
}