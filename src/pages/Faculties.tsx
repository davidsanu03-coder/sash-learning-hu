import { motion } from "framer-motion";
import { Users, Code, Briefcase, FlaskConical, BookOpen } from "lucide-react";

export default function Faculties() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 px-6 lg:px-24">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-black text-[#0B2C5F] mb-4">
          Faculties & Departments
        </h1>
        <p className="text-slate-500 text-lg">
          Our academic structure is organized into specialized faculties designed to deliver focused learning and excellence.
        </p>
      </motion.div>

      {/* FACULTIES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* SCIENCE */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <FlaskConical className="text-[#0B2C5F] mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">Faculty of Science</h3>
          <p className="text-slate-500 text-sm">
            Mathematics, Physics, Chemistry, Biology and foundational sciences for university preparation.
          </p>
        </div>

        {/* ARTS */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <BookOpen className="text-[#D4AF37] mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">Faculty of Arts</h3>
          <p className="text-slate-500 text-sm">
            Literature, Languages, Government, History and communication studies.
          </p>
        </div>

        {/* COMMERCIAL */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <Briefcase className="text-green-600 mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">Faculty of Commercial Studies</h3>
          <p className="text-slate-500 text-sm">
            Accounting, Economics, Business Studies and Entrepreneurship education.
          </p>
        </div>

        {/* ICT */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <Code className="text-purple-600 mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">Faculty of ICT & Technology</h3>
          <p className="text-slate-500 text-sm">
            Software development, web design, networking and digital skills training.
          </p>
        </div>

        {/* GENERAL STUDIES */}
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <Users className="text-orange-500 mb-4" size={32} />
          <h3 className="font-bold text-xl mb-2">General Studies</h3>
          <p className="text-slate-500 text-sm">
            Communication skills, ethics, leadership and foundational education.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold text-[#0B2C5F] mb-4">
          Choose Your Academic Path
        </h2>

        <a
          href="/admissions"
          className="inline-block bg-[#D4AF37] text-[#0B2C5F] px-8 py-4 rounded-lg font-bold uppercase text-xs tracking-widest hover:bg-yellow-400 transition"
        >
          Start Admission
        </a>
      </div>
    </div>
  );
}