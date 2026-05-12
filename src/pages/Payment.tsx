import { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import api from '../api/axios';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Info
} from 'lucide-react';

export default function Payment() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { setUser } = useAuth();

  const navigate = useNavigate();

  const handlePayment = async () => {

    setLoading(true);

    try {

      // =========================
      // CALL BACKEND PAYMENT API
      // =========================
      const response = await api.post('/api/payments/initialize');

      console.log("PAYMENT RESPONSE:", response.data);

      // success animation
      setSuccess(true);

      // =========================
      // UPDATE USER STATE
      // =========================
      const userStr = localStorage.getItem('user');

      const savedUser =
        userStr && userStr !== 'undefined'
          ? JSON.parse(userStr)
          : {};

      const updatedUser = {
        ...savedUser,
        hasPurchasedForm: true,
      };

      setUser(updatedUser);

      localStorage.setItem(
        'user',
        JSON.stringify(updatedUser)
      );

      // =========================
      // REDIRECT
      // =========================
      setTimeout(() => {
        navigate('/apply');
      }, 2500);

    } catch (error: any) {

      console.log("PAYMENT ERROR:", error);

      alert(
        error.response?.data?.message ||
        "Payment initialization failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center">

      {/* HEADER */}
      <div className="text-center mb-16">

        <span className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.3em] mb-4 block">
          Required Next Step
        </span>

        <h2 className="text-4xl lg:text-5xl font-black text-[#0B2C5F]">
          Payment Initialization
        </h2>

      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

        {/* LEFT SIDE */}
        <div className="lg:col-span-3">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-[#0B2C5F]/5"
          >

            <h3 className="text-2xl font-black text-[#0B2C5F] mb-8">
              Admission Form Fee
            </h3>

            <div className="space-y-6 mb-10">

              <div className="flex justify-between items-center p-6 bg-slate-50 rounded-3xl">

                <div>
                  <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">
                    Fee Description
                  </p>

                  <p className="font-bold text-[#0B2C5F]">
                    Undergraduate Admission Form
                  </p>
                </div>

                <div className="text-right">

                  <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">
                    Amount
                  </p>

                  <p className="font-black text-2xl text-[#0B2C5F]">
                    ₦5,500.00
                  </p>

                </div>

              </div>

              {/* INFO BOX */}
              <div className="flex gap-4 p-5 bg-blue-50 text-blue-700 rounded-2xl text-sm font-medium">

                <Info size={20} className="shrink-0" />

                <p>
                  This fee unlocks access to the complete admission application portal.
                </p>

              </div>

            </div>

            {/* BUTTON */}
            {!success ? (

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-[#0B2C5F] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-[#0B2C5F]/30 hover:-translate-y-1 transition-all disabled:opacity-50"
              >

                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CreditCard size={20} />
                )}

                {loading
                  ? "Processing..."
                  : "Pay Using Paystack"}

              </button>

            ) : (

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-full bg-green-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3"
              >

                <CheckCircle2 size={24} />

                Payment Successful!

              </motion.div>

            )}

            {/* SECURITY */}
            <div className="mt-8 flex items-center justify-center gap-4 text-slate-400">

              <ShieldCheck size={20} />

              <span className="text-xs font-bold uppercase tracking-widest">
                Secure Bank Grade Encryption
              </span>

            </div>

          </motion.div>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          <div className="bg-[#0B2C5F] text-white p-8 rounded-[2rem] shadow-xl">

            <h4 className="text-lg font-black mb-4 text-[#D4AF37]">
              Why Pay?
            </h4>

            <ul className="space-y-4 text-sm font-medium text-slate-300">

              <li className="flex gap-3">
                <CheckCircle2
                  size={16}
                  className="text-[#D4AF37] shrink-0"
                />
                Generates unique Application Number
              </li>

              <li className="flex gap-3">
                <CheckCircle2
                  size={16}
                  className="text-[#D4AF37] shrink-0"
                />
                Unlocks Document Upload Section
              </li>

              <li className="flex gap-3">
                <CheckCircle2
                  size={16}
                  className="text-[#D4AF37] shrink-0"
                />
                Initiates Academic Result Verification
              </li>

              <li className="flex gap-3">
                <CheckCircle2
                  size={16}
                  className="text-[#D4AF37] shrink-0"
                />
                24/7 Technical Portal Support
              </li>

            </ul>

          </div>

          {/* SUPPORT */}
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-center">

            <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-2">
              Support Hotline
            </p>

            <p className="text-[#0B2C5F] font-black underline">
              09044283426
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}