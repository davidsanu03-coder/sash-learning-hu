import { motion } from "framer-motion";
import { BookOpen, GraduationCap, PenTool, Wrench, Laptop } from "lucide-react";

export default function Academics() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 px-6 lg:px-24">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-black text-[#0B2C5F] mb-4">
          Academic Programmes
        </h1>
        <p className="text-slate-500 text-lg">
          Structured learning paths designed to prepare students for university admission,
          professional exams, and career success.
        </p>
      </motion.div>

      {/* PROGRAMMES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* JUPEB */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
          <GraduationCap className="text-[#0B2C5F] mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">JUPEB Programme</h3>
          <p className="text-slate-500 text-sm">
            Advanced Level programme for direct entry into 200 level in Nigerian universities.
          </p>
        </div>

        {/* IJMB */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
          <BookOpen className="text-[#D4AF37] mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">IJMB Programme</h3>
          <p className="text-slate-500 text-sm">
            A direct entry pathway into universities across Nigeria with strong academic grounding.
          </p>
        </div>

        {/* WAEC / NECO */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
          <PenTool className="text-green-600 mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">WAEC / NECO</h3>
          <p className="text-slate-500 text-sm">
            Intensive preparation classes for senior secondary certificate examinations.
          </p>
        </div>

        {/* JAMB */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
          <Laptop className="text-purple-600 mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">JAMB Preparation</h3>
          <p className="text-slate-500 text-sm">
            Computer-based training and practice for UTME success.
          </p>
        </div>

        {/* TECH SKILLS */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
          <Wrench className="text-orange-500 mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">Technical Skills</h3>
          <p className="text-slate-500 text-sm">
            Practical ICT and vocational training including coding, design, and digital skills.
          </p>
        </div>

        {/* VOCATIONAL */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition">
          <BookOpen className="text-indigo-500 mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">Vocational Training</h3>
          <p className="text-slate-500 text-sm">
            Hands-on training for entrepreneurship and self-reliance development.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-[#0B2C5F] mb-4">
          Ready to Start Learning?
        </h2>

        <a
          href="/signup"
          className="inline-block bg-[#0B2C5F] text-white px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-black transition"
        >
          Apply Now
        </a>
      </div>
    </div>
  );
}