import { motion } from "framer-motion";
import { ClipboardCheck, CreditCard, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Admissions() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 px-6 lg:px-24">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-black text-[#0B2C5F] mb-4">
          Admissions Portal
        </h1>
        <p className="text-slate-500 text-lg">
          Apply for JUPEB, IJMB, WAEC, NECO, JAMB, TECH & Vocational programmes at SASH Learning Hub.
        </p>
      </motion.div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Step 1 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        >
          <ClipboardCheck className="text-[#0B2C5F] mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-[#0B2C5F]">
            Step 1: Create Account
          </h3>
          <p className="text-slate-500 text-sm">
            Start by registering an account on our portal using your email and personal details.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        >
          <CreditCard className="text-[#D4AF37] mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-[#0B2C5F]">
            Step 2: Pay Application Fee
          </h3>
          <p className="text-slate-500 text-sm">
            Secure your admission by paying the application fee through the portal.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
        >
          <FileText className="text-green-600 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2 text-[#0B2C5F]">
            Step 3: Fill Application Form
          </h3>
          <p className="text-slate-500 text-sm">
            Complete your admission form and submit your academic information.
          </p>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-bold text-[#0B2C5F] mb-4">
          Ready to Begin Your Journey?
        </h2>

        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-[#0B2C5F] text-white px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-black transition"
        >
          Start Application <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}