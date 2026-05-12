import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Users, Target, Award } from "lucide-react";

export default function About() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 px-6 lg:px-24">

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto mb-20"
      >
        <h1 className="text-4xl lg:text-6xl font-black text-[#0B2C5F] mb-4">
          About SASH Learning Hub
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          A modern academic institution dedicated to excellence in education,
          skill development, and career readiness through structured learning programs.
        </p>
      </motion.div>

      {/* WHO WE ARE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">

        <div>
          <h2 className="text-3xl font-black text-[#0B2C5F] mb-4">
            Who We Are
          </h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            SASH Learning Hub is a forward-thinking educational platform committed to
            preparing students for academic success and real-world excellence.
          </p>

          <p className="text-slate-600 leading-relaxed">
            We offer structured programs such as JUPEB, IJMB, WAEC, NECO, JAMB preparation,
            and vocational training designed to bridge the gap between education and opportunity.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
            alt="Students learning"
            className="rounded-xl"
          />
        </div>
      </div>

      {/* CORE VALUES */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-[#0B2C5F] text-center mb-12">
          Our Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <Target className="text-[#0B2C5F] mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Excellence</h3>
            <p className="text-slate-500 text-sm">
              We aim for the highest academic and professional standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <Users className="text-[#D4AF37] mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-slate-500 text-sm">
              We build a supportive learning environment for all students.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border">
            <Award className="text-green-600 mb-4" size={32} />
            <h3 className="font-bold text-lg mb-2">Integrity</h3>
            <p className="text-slate-500 text-sm">
              We operate with transparency, honesty, and accountability.
            </p>
          </div>
        </div>
      </div>

      {/* WHAT WE OFFER */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-[#0B2C5F] text-center mb-12">
          What We Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="flex gap-4 bg-white p-6 rounded-xl border">
            <BookOpen className="text-[#0B2C5F]" />
            <div>
              <h4 className="font-bold">Academic Programs</h4>
              <p className="text-slate-500 text-sm">
                JUPEB, IJMB, WAEC, NECO, JAMB coaching and preparation.
              </p>
            </div>
          </div>

          <div className="flex gap-4 bg-white p-6 rounded-xl border">
            <GraduationCap className="text-[#D4AF37]" />
            <div>
              <h4 className="font-bold">Admission Support</h4>
              <p className="text-slate-500 text-sm">
                Smooth application and admission processing system.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* FINAL CTA */}
      <div className="text-center bg-[#0B2C5F] text-white p-12 rounded-2xl">
        <h2 className="text-3xl font-black mb-4">
          Start Your Academic Journey Today
        </h2>
        <p className="text-white/70 mb-6">
          Join thousands of students building their future with us.
        </p>

        <a
          href="/signup"
          className="inline-block bg-[#D4AF37] text-[#0B2C5F] px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-yellow-400 transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}