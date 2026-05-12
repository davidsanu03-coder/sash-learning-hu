import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import axios from 'axios';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      login(data.token, data.user);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center px-6">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none overflow-hidden">
         <div className="absolute top-0 left-0 w-96 h-96 bg-[#0B2C5F] rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[#0B2C5F] mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 font-medium text-sm">Access your SASH-LEARNING-HUB portal</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
          {error}
        </div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#0B2C5F]/20 focus:border-[#0B2C5F] transition-all outline-none font-medium"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-3 pl-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-[#0B2C5F]/20 focus:border-[#0B2C5F] transition-all outline-none font-medium"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Link to="#" className="text-xs font-bold text-[#0B2C5F] hover:underline">Forgot password?</Link>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0B2C5F] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#0B2C5F]/30 hover:translate-y-[-2px] transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          New applicant? <Link to="/signup" className="text-[#0B2C5F] font-black hover:underline">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}
