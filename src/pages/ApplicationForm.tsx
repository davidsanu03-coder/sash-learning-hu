import { useState, useCallback } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import axios from 'axios';
import { Save, CheckCircle, ChevronRight, ChevronLeft, Upload, Book, Award, User, MapPin, Loader2, FileText, X, Files } from 'lucide-react';

const STEPS = [
  { id: 'personal', title: 'Personal Information', icon: User },
  { id: 'academic', title: 'Academic Results', icon: Award },
  { id: 'course', title: 'Course & Documents', icon: Book },
  { id: 'review', title: 'Final Review', icon: CheckCircle }
];

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [supportingDocs, setSupportingDocs] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState<{ passport: boolean; docs: boolean }>({ passport: false, docs: false });
  const [formData, setFormData] = useState({
    surname: '', firstName: '', middleName: '', gender: '', dateOfBirth: '',
    state: '', address: '', phone: '', email: '',
    faculty: '', department: '', jambScore: '',
    selectedSubjects: [] as string[],
    extraCurriculars: [] as string[],
    oLevelResults: [{ subject: '', grade: '' }, { subject: '', grade: '' }, { subject: '', grade: '' }, { subject: '', grade: '' }, { subject: '', grade: '' }]
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResultChange = (index: number, field: string, value: string) => {
    const results = [...formData.oLevelResults];
    results[index] = { ...results[index], [field]: value };
    setFormData({ ...formData, oLevelResults: results });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'passport' | 'docs') => {
    if (e.target.files) {
      if (type === 'passport') {
        setPassportPhoto(e.target.files[0]);
      } else {
        setSupportingDocs(prev => [...prev, ...Array.from(e.target.files!)]);
      }
    }
  };

  const removeDoc = (index: number) => {
    setSupportingDocs(prev => prev.filter((_, i) => i !== index));
  };

  const onDrag = useCallback((e: React.DragEvent, type: 'passport' | 'docs', active: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(prev => ({ ...prev, [type]: active }));
  }, []);

  const onDrop = useCallback((e: React.DragEvent, type: 'passport' | 'docs') => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(prev => ({ ...prev, [type]: false }));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      if (type === 'passport') {
        setPassportPhoto(files[0]);
      } else {
        setSupportingDocs(prev => [...prev, ...files]);
      }
    }
  }, []);

  const handleCheckboxChange = (field: 'selectedSubjects' | 'extraCurriculars', value: string) => {
    const current = [...formData[field]];
    const index = current.indexOf(value);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(value);
    }
    setFormData({ ...formData, [field]: current });
  };

  const JUPEB_SUBJECTS = {
    "Arts": ["Christian Religious Studies", "French", "History", "Igbo", "Islamic Religious Studies", "Literature-in-English", "Music", "Visual Arts", "Yoruba"],
    "Sciences": ["Biology", "Chemistry", "Physics", "Agricultural Science", "Mathematics"],
    "Social Sciences": ["Economics", "Geography", "Government", "Sociology"],
    "Management": ["Accounting", "Business Management"]
  };

  const EXTRA_CURRICULARS = [
    "content creation", "vocal training", "Ai automation", "Graphic design", 
    "Video editing", "Google automation", "Dance", "Tailoring", "Website developer"
  ];

  const handleSubmit = async () => {
    if (!passportPhoto) {
      alert("Please upload your passport photo.");
      return;
    }
    if (formData.faculty === 'JUPEB' && formData.selectedSubjects.length === 0) {
      alert("Please select at least one JUPEB subject.");
      return;
    }
    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'oLevelResults') {
          data.append(key, JSON.stringify(value));
        } else {
          data.append(key, value as string);
        }
      });
      
      data.append('passportPhoto', passportPhoto);
      data.append('selectedSubjects', JSON.stringify(formData.selectedSubjects));
      data.append('extraCurriculars', JSON.stringify(formData.extraCurriculars));
      supportingDocs.forEach(doc => {
        data.append('uploadedDocuments', doc);
      });
      
      await axios.post('/api/applications/submit', data, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          setUploadProgress(progress);
        }
      });
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert("Submission failed. Check all fields.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-[#D4AF37] font-black text-xs uppercase tracking-[0.3em] mb-4 block">Session 2026/2027</span>
        <h2 className="text-4xl lg:text-5xl font-black text-[#0B2C5F]">Admission Form</h2>
      </div>

      {/* Progress Bar */}
      <div className="mb-12 flex justify-between relative px-2">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full"></div>
        {STEPS.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${i <= currentStep ? 'bg-[#0B2C5F] text-white' : 'bg-white text-slate-400 border-2 border-slate-200'}`}>
              <step.icon size={20} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest mt-3 ${i <= currentStep ? 'text-[#0B2C5F]' : 'text-slate-400'}`}>{step.title}</span>
          </div>
        ))}
        <motion.div 
          initial={false}
          animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          className="absolute top-1/2 left-0 h-1 bg-[#0B2C5F] -z-10 -translate-y-1/2 rounded-full transition-all"
        ></motion.div>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-14 min-h-[500px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            {currentStep === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Surname</label>
                  <input name="surname" onChange={handleChange} value={formData.surname} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm" placeholder="Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">First Name</label>
                  <input name="firstName" onChange={handleChange} value={formData.firstName} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm" placeholder="John" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Gender</label>
                  <select name="gender" onChange={handleChange} value={formData.gender} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Date of Birth</label>
                  <input type="date" name="dateOfBirth" onChange={handleChange} value={formData.dateOfBirth} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Home Address</label>
                  <textarea name="address" onChange={handleChange} value={formData.address} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm" rows={3}></textarea>
                </div>
                 <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Phone Number</label>
                  <input name="phone" onChange={handleChange} value={formData.phone} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm" />
                </div>
                 <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">State of Origin</label>
                  <input name="state" onChange={handleChange} value={formData.state} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm" />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-8">
                 <div className="max-w-xs">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">JAMB Score (Aggregate)</label>
                  <input name="jambScore" type="number" onChange={handleChange} value={formData.jambScore} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-black text-xl text-[#0B2C5F]" placeholder="000" />
                </div>
                
                <div className="bg-slate-50 p-8 rounded-[2rem]">
                  <h4 className="text-sm font-black text-[#0B2C5F] mb-6 tracking-tight uppercase">O'Level Results (WAEC/NECO)</h4>
                  <div className="space-y-4">
                    {formData.oLevelResults.map((res, i) => (
                      <div key={i} className="grid grid-cols-3 gap-4">
                        <input className="col-span-2 bg-white border border-slate-100 rounded-[1rem] p-3 text-sm font-medium" placeholder={`Subject ${i+1}`} value={res.subject} onChange={(e) => handleResultChange(i, 'subject', e.target.value)} />
                        <select className="bg-white border border-slate-100 rounded-[1rem] p-3 text-sm font-black text-[#0B2C5F]" value={res.grade} onChange={(e) => handleResultChange(i, 'grade', e.target.value)}>
                          <option value="">Grade</option>
                          {['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9'].map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Programme Type</label>
                    <select name="faculty" onChange={handleChange} value={formData.faculty} className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 outline-none font-medium text-lg">
                      <option value="">Select Programme</option>
                      <option value="JUPEB">JUPEB (Joint Universities Preliminary Examinations Board)</option>
                      <option value="IJMB">IJMB (Interim Joint Matriculation Board)</option>
                      <option value="WAEC">WAEC (WASSCE)</option>
                      <option value="NECO">NECO (SSCE)</option>
                      <option value="JAMB">JAMB (UTME)</option>
                      <option value="TECH">TECH (Technical Courses)</option>
                      <option value="VOCATIONS">VOCATIONS (Skill Acquisition)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Specific Course / Subjects</label>
                    <input 
                      name="department" 
                      onChange={handleChange} 
                      value={formData.department} 
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 outline-none font-medium text-lg"
                      placeholder="e.g. Science, Arts, Web Design, etc."
                    />
                  </div>
                </div>

                {formData.faculty === 'JUPEB' && (
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                    <h4 className="text-sm font-black text-[#0B2C5F] mb-8 uppercase tracking-widest flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0B2C5F] text-white rounded-lg flex items-center justify-center text-[10px]">19</div>
                      JUPEB Subjects Selection (Pick 3)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      {Object.entries(JUPEB_SUBJECTS).map(([category, subjects]) => (
                        <div key={category}>
                          <h5 className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37] mb-4">{category}</h5>
                          <div className="space-y-3">
                            {subjects.map(subject => (
                              <label key={subject} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                  <input 
                                    type="checkbox" 
                                    className="peer h-5 w-5 bg-white border border-slate-200 rounded-md checked:bg-[#0B2C5F] checked:border-[#0B2C5F] appearance-none transition-all"
                                    checked={formData.selectedSubjects.includes(subject)}
                                    onChange={() => handleCheckboxChange('selectedSubjects', subject)}
                                  />
                                  <CheckCircle size={12} className="absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                                </div>
                                <span className="text-xs font-bold text-slate-600 group-hover:text-[#0B2C5F] transition-colors">{subject}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-[#0B2C5F]/5 p-10 rounded-[3rem] border border-[#0B2C5F]/5">
                  <h4 className="text-sm font-black text-[#0B2C5F] mb-8 uppercase tracking-widest flex items-center gap-3">
                    <Award size={20} className="text-[#D4AF37]" />
                    Extra Curricular Activities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {EXTRA_CURRICULARS.map(activity => (
                      <label key={activity} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${formData.extraCurriculars.includes(activity) ? 'bg-white border-[#0B2C5F] shadow-lg text-[#0B2C5F]' : 'bg-transparent border-transparent text-slate-400 hover:bg-white/50'}`}>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${formData.extraCurriculars.includes(activity) ? 'bg-[#0B2C5F] text-white' : 'bg-slate-200 text-slate-400'}`}>
                          {formData.extraCurriculars.includes(activity) ? <CheckCircle size={16} /> : <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-tight">{activity}</span>
                        <input 
                          type="checkbox" 
                          className="hidden"
                          checked={formData.extraCurriculars.includes(activity)}
                          onChange={() => handleCheckboxChange('extraCurriculars', activity)}
                        />
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Passport Photo */}
                  <div 
                    onDragOver={(e) => onDrag(e, 'passport', true)}
                    onDragLeave={(e) => onDrag(e, 'passport', false)}
                    onDrop={(e) => onDrop(e, 'passport')}
                    className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${isDragActive.passport ? 'border-[#D4AF37] bg-amber-50' : passportPhoto ? 'border-green-500 bg-green-50' : 'border-[#0B2C5F]/10 bg-[#0B2C5F]/5'}`}
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg ${passportPhoto ? 'bg-green-500 text-white' : 'bg-white text-[#0B2C5F]'}`}>
                         {passportPhoto ? <CheckCircle size={32} /> : <Upload size={32} />}
                       </div>
                       <h4 className={`font-black uppercase tracking-tight mb-2 ${passportPhoto ? 'text-green-800' : 'text-[#0B2C5F]'}`}>
                         {passportPhoto ? 'Passport Uploaded' : 'Passport Photo'}
                       </h4>
                       <p className="text-xs text-slate-400 font-medium max-w-[200px]">
                         {passportPhoto ? passportPhoto.name : 'Drag & drop or Click to upload passport. Max 2MB.'}
                       </p>
                       <input type="file" className="hidden" id="passport" accept="image/*" onChange={(e) => handleFileChange(e, 'passport')} />
                       <label htmlFor="passport" className="mt-6 px-8 py-3 bg-[#0B2C5F] text-white rounded-full text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-[#D4AF37] transition-all">
                         {passportPhoto ? 'Change Image' : 'Select Image'}
                       </label>
                    </div>
                  </div>

                  {/* Supporting Documents */}
                  <div 
                    onDragOver={(e) => onDrag(e, 'docs', true)}
                    onDragLeave={(e) => onDrag(e, 'docs', false)}
                    onDrop={(e) => onDrop(e, 'docs')}
                    className={`p-8 rounded-[2rem] border-2 border-dashed transition-all ${isDragActive.docs ? 'border-[#0B2C5F] bg-slate-100' : 'border-slate-200 bg-slate-50'}`}
                  >
                    <div className="flex flex-col items-center justify-center text-center h-full">
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-400 mb-4 shadow-lg">
                         <Files size={32} />
                       </div>
                       <h4 className="font-black text-[#0B2C5F] mb-2 uppercase tracking-tight text-center">Supporting Documents</h4>
                       <p className="text-xs text-slate-400 font-medium max-w-[200px]">Drag & drop certificates, transcripts (PDF/JPG/PNG).</p>
                       
                       <div className="mt-4 w-full space-y-2">
                         {supportingDocs.map((doc, i) => (
                           <div key={i} className="bg-white p-2 rounded-xl border border-slate-100 flex items-center justify-between">
                             <div className="flex items-center gap-2 truncate">
                               <FileText size={14} className="text-[#0B2C5F] shrink-0" />
                               <span className="text-[10px] font-bold text-slate-600 truncate">{doc.name}</span>
                             </div>
                             <button onClick={() => removeDoc(i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
                           </div>
                         ))}
                       </div>

                       <input type="file" className="hidden" id="docs" multiple onChange={(e) => handleFileChange(e, 'docs')} />
                       <label htmlFor="docs" className="mt-6 px-8 py-3 border-2 border-[#0B2C5F] text-[#0B2C5F] rounded-full text-xs font-black uppercase tracking-widest cursor-pointer hover:bg-[#0B2C5F] hover:text-white transition-all">
                         Add Documents
                       </label>
                    </div>
                  </div>
                </div>

                {uploadProgress > 0 && (
                   <div className="mt-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[#0B2C5F] mb-2">
                         <span>Uploading Documents...</span>
                         <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                         <motion.div initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} className="h-full bg-[#D4AF37]" />
                      </div>
                   </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-10">
                <div className="bg-green-50 p-8 rounded-[2rem] border border-green-100 flex items-start gap-4">
                  <CheckCircle className="text-green-600 shrink-0" size={24} />
                  <div>
                    <h4 className="font-black text-green-800 uppercase tracking-tight text-sm mb-1">Ready for Submission</h4>
                    <p className="text-green-700/70 text-sm font-medium leading-relaxed">Review your information carefully. After submission, you will be unable to edit certain fields without administrative approval.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="p-6 bg-slate-50 rounded-3xl">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Candidate</p>
                     <p className="font-bold text-[#0B2C5F] uppercase text-sm">{formData.surname} {formData.firstName}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">JAMB Score</p>
                     <p className="font-black text-[#0B2C5F] text-xl">{formData.jambScore}</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl col-span-2">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Programme Choice</p>
                     <p className="font-bold text-[#0B2C5F] text-sm">{formData.faculty}: {formData.department}</p>
                     {formData.selectedSubjects.length > 0 && (
                       <p className="text-[10px] font-bold text-slate-500 mt-2">Subjects: {formData.selectedSubjects.join(', ')}</p>
                     )}
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl col-span-full">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Extra Curriculars</p>
                     <p className="font-bold text-[#0B2C5F] text-xs leading-relaxed">
                        {formData.extraCurriculars.length > 0 ? formData.extraCurriculars.join(' • ') : 'None selected'}
                     </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-16 pt-10 border-t border-slate-100 flex justify-between">
          <button 
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl transition-all ${currentStep === 0 ? 'text-slate-200' : 'text-slate-400 hover:bg-slate-50'}`}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          
          {currentStep === STEPS.length - 1 ? (
             <button 
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:shadow-2xl hover:shadow-green-600/30 transition-all"
             >
                {loading ? <Loader2 className="animate-spin" /> : <Save size={16} />}
                Submit Application
             </button>
          ) : (
             <button 
              onClick={nextStep}
              className="bg-[#0B2C5F] text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:shadow-2xl hover:shadow-[#0B2C5F]/30 transition-all group"
             >
                Continue 
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </button>
          )}
        </div>
      </div>
    </div>
  );
}
