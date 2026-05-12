import { useEffect, useState } from 'react';
import React from 'react';
import { motion } from "framer-motion";
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import axios from 'axios';
import { 
  LayoutDashboard, Users, CreditCard, Newspaper, Settings, 
  Menu, X, Search, Bell, LogOut, TrendingUp, Check, XCircle, Info, Send, User as UserIcon, Megaphone, Loader2, Files
} from 'lucide-react';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalApplicants: 0, completedApplications: 0, totalRevenue: 0 });
  const [applicants, setApplicants] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showApplicantModal, setShowApplicantModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);
  const [announcement, setAnnouncement] = useState({ title: '', message: '', recipientType: 'all', recipientId: '' });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsRes, appRes, studentsRes] = await Promise.all([
          axios.get('/api/admin/stats'),
          axios.get('/api/admin/applicants'),
          axios.get('/api/admin/students')
        ]);
        setStats(statsRes.data);
        setApplicants(appRes.data);
        setStudents(studentsRes.data);
      } catch (err) {
        console.error("Admin dashboard failed to load");
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/admin/application/${id}`, { status });
      setApplicants((prev: any) => prev.map((app: any) => app._id === id ? { ...app, applicationStatus: status } : app));
    } catch (err) {
      alert("Status update failed");
    }
  };

  const handleSendAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post('/api/admin/announcement', announcement);
      alert("Announcement sent successfully!");
      setShowAnnouncementModal(false);
      setAnnouncement({ title: '', message: '', recipientType: 'all', recipientId: '' });
    } catch (err) {
      alert("Failed to send announcement");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-[#0B2C5F]">Loading Admin Center...</div>;

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-80 bg-[#0B2C5F] text-white flex flex-col p-8 fixed h-full z-20">
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#0B2C5F] font-bold text-xl">S</div>
          <div>
            <h1 className="font-black text-lg tracking-tight uppercase leading-none">Admin</h1>
            <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mt-1">SASH Hub</p>
          </div>
        </div>

        <nav className="space-y-4 flex-1">
          {[
            { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
            { icon: Users, label: 'Applicants', path: '/admin/applicants' },
            { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
            { 
              icon: Megaphone, 
              label: 'Announcements', 
              path: '#',
              onClick: (e: any) => { e.preventDefault(); setShowAnnouncementModal(true); } 
            },
          ].map((item, i) => (
            <Link 
              key={i} 
              to={item.path} 
              onClick={item.onClick}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-colors group"
            >
              <item.icon size={20} className="text-slate-400 group-hover:text-[#D4AF37]" />
              <span className="font-bold text-sm uppercase tracking-widest">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button onClick={() => { logout(); navigate('/login'); }} className="mt-auto flex items-center gap-4 p-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
          <LogOut size={20} />
          <span className="font-bold text-sm uppercase tracking-widest">Logout</span>
        </button>
      </aside>

      {/* Announcement Modal */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 bg-[#0B2C5F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] w-full max-w-xl max-h-[90vh] overflow-y-auto p-10 relative shadow-2xl"
          >
            <button onClick={() => setShowAnnouncementModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-[#0B2C5F] transition-colors">
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 bg-amber-50 text-[#D4AF37] rounded-2xl flex items-center justify-center">
                  <Megaphone size={24} />
               </div>
               <div>
                  <h3 className="text-xl font-black text-[#0B2C5F] uppercase tracking-tight">New Announcement</h3>
                  <p className="text-xs text-slate-400 font-medium">Broadcast news to students</p>
               </div>
            </div>

            <form onSubmit={handleSendAnnouncement} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Recipient Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setAnnouncement({...announcement, recipientType: 'all', recipientId: ''})}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${announcement.recipientType === 'all' ? 'border-[#0B2C5F] bg-[#0B2C5F]/5 text-[#0B2C5F]' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
                  >
                    <Users size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">All Students</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAnnouncement({...announcement, recipientType: 'individual'})}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${announcement.recipientType === 'individual' ? 'border-[#0B2C5F] bg-[#0B2C5F]/5 text-[#0B2C5F]' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
                  >
                    <UserIcon size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Specific Student</span>
                  </button>
                </div>
              </div>

              {announcement.recipientType === 'individual' && (
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Target Student</label>
                  <select 
                    required={announcement.recipientType === 'individual'}
                    value={announcement.recipientId} 
                    onChange={(e) => setAnnouncement({...announcement, recipientId: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm"
                  >
                    <option value="">Select a student...</option>
                    {students.map((student: any) => (
                      <option key={student._id} value={student._id}>
                        {student.fullName} ({student.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Title</label>
                <input 
                  required
                  placeholder="e.g. Admission List Update" 
                  value={announcement.title}
                  onChange={(e) => setAnnouncement({...announcement, title: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Message Content</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Type your message here..."
                  value={announcement.message}
                  onChange={(e) => setAnnouncement({...announcement, message: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none font-medium text-sm resize-none focus:ring-2 focus:ring-[#0B2C5F]/20 focus:border-[#0B2C5F] transition-all"
                ></textarea>
              </div>

              <div className="pt-4 border-t border-slate-50">
                <button 
                  type="submit" 
                  disabled={sending}
                  className="w-full bg-[#0B2C5F] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#D4AF37] transition-all shadow-xl shadow-[#0B2C5F]/20"
                >
                  {sending ? <Loader2 className="animate-spin" /> : <Send size={16} />}
                  Send Announcement
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Applicant Detail Modal */}
      {showApplicantModal && selectedApplicant && (
        <div className="fixed inset-0 bg-[#0B2C5F]/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto p-12 relative"
          >
            <button onClick={() => setShowApplicantModal(false)} className="absolute top-8 right-8 text-slate-400 hover:text-[#0B2C5F] transition-colors">
              <X size={24} />
            </button>

            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <div className="w-full aspect-square bg-slate-100 rounded-[2.5rem] overflow-hidden mb-8 border-4 border-slate-50">
                   {selectedApplicant.passportPhoto ? (
                     <img 
                       src={`/api/files/${selectedApplicant.passportPhoto.split('/').pop()}`} 
                       className="w-full h-full object-cover" 
                       onError={(e: any) => (e.target.src = 'https://ui-avatars.com/api/?name=' + selectedApplicant.surname)}
                     />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center text-slate-300"><UserIcon size={64} /></div>
                   )}
                </div>
                <h3 className="text-2xl font-black text-[#0B2C5F] uppercase tracking-tight text-center">{selectedApplicant.surname} {selectedApplicant.firstName}</h3>
                <p className="text-sm font-bold text-[#D4AF37] uppercase tracking-widest text-center mt-2">{selectedApplicant.faculty}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-10">
                   <button onClick={() => handleStatusUpdate(selectedApplicant._id, 'approved')} className="bg-green-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-green-600 transition-all">Approve</button>
                   <button onClick={() => handleStatusUpdate(selectedApplicant._id, 'rejected')} className="bg-red-500 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all">Reject</button>
                   <button 
                     onClick={() => {
                        setAnnouncement({...announcement, recipientType: 'individual', recipientId: selectedApplicant.userId?._id});
                        setShowApplicantModal(false);
                        setShowAnnouncementModal(true);
                     }}
                     className="col-span-2 bg-[#0B2C5F] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2 mt-2"
                   >
                     <Send size={14} /> Send Announcement
                   </button>
                </div>
              </div>

              <div className="flex-1 space-y-12">
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-slate-200"></span> Personal Bio
                  </h4>
                  <div className="grid grid-cols-2 gap-8">
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">State of Origin</p>
                        <p className="font-bold text-[#0B2C5F]">{selectedApplicant.state}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                        <p className="font-bold text-[#0B2C5F]">{selectedApplicant.phone}</p>
                     </div>
                     <div className="col-span-2">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Home Address</p>
                        <p className="font-bold text-[#0B2C5F] text-sm">{selectedApplicant.address}</p>
                     </div>
                  </div>
                </section>

                <section>
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-slate-200"></span> Supporting Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     {selectedApplicant.uploadedDocuments?.map((docPath: string, i: number) => {
                       const filename = docPath.split('/').pop();
                       return (
                         <a 
                           key={i} 
                           href={`/api/files/${filename}`} 
                           target="_blank" 
                           rel="noreferrer"
                           className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#0B2C5F] transition-all group"
                         >
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#0B2C5F] group-hover:bg-[#0B2C5F] group-hover:text-white transition-all shadow-sm">
                              <Files size={18} />
                           </div>
                           <div className="truncate">
                              <p className="text-[10px] font-black text-[#0B2C5F] uppercase truncate">Document {i + 1}</p>
                              <p className="text-[9px] font-bold text-slate-400 truncate">{filename}</p>
                           </div>
                         </a>
                       );
                     })}
                     {(!selectedApplicant.uploadedDocuments || selectedApplicant.uploadedDocuments.length === 0) && (
                       <p className="text-xs font-bold text-slate-300 bg-slate-50 p-6 rounded-2xl text-center col-span-full border-2 border-dashed border-slate-100">No additional documents provided</p>
                     )}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 ml-80 p-12">
        <header className="flex justify-between items-center mb-16">
          <div className="relative w-96">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input className="w-full bg-white rounded-full py-4 pl-14 pr-6 focus:ring-2 focus:ring-[#0B2C5F]/10 outline-none shadow-sm font-medium" placeholder="Search applications, names..." />
          </div>
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0B2C5F] shadow-sm cursor-pointer relative">
               <Bell size={20} />
               <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-black text-xs text-[#0B2C5F] uppercase tracking-tighter">SASH Admin</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Superuser</p>
              </div>
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full"></div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { label: 'Total Applicants', value: stats.totalApplicants, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Completed Forms', value: stats.completedApplications, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Total Revenue', value: `₦${stats.totalRevenue.toLocaleString()}`, icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                <stat.icon size={26} />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{stat.label}</p>
              <h3 className="text-3xl font-black text-[#0B2C5F]">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Applicants Table */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex justify-between items-center">
            <h3 className="text-xl font-black text-[#0B2C5F] uppercase tracking-tight">Recent Applicants</h3>
            <button className="text-xs font-black uppercase text-[#0B2C5F] underline tracking-widest">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <th className="px-10 py-6">Applicant</th>
                  <th className="px-6 py-6">Course</th>
                  <th className="px-6 py-6">JAMB</th>
                  <th className="px-6 py-6">Status</th>
                  <th className="px-10 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applicants.map((app: any, i) => (
                  <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#0B2C5F]/10 rounded-full flex items-center justify-center font-bold text-[#0B2C5F] text-xs">
                          {app.surname?.[0]}{app.firstName?.[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#0B2C5F] text-sm">{app.surname} {app.firstName}</p>
                          <p className="text-xs text-slate-400 font-medium">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-sm font-bold text-slate-700">{app.department}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{app.faculty}</p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="font-black text-sm text-[#0B2C5F]">{app.jambScore}</span>
                    </td>
                    <td className="px-6 py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border ${
                        app.applicationStatus === 'approved' ? 'bg-green-50 text-green-600 border-green-100' : 
                        app.applicationStatus === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {app.applicationStatus}
                      </span>
                    </td>
                    <td className="px-10 py-6 text-right">
                       <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleStatusUpdate(app._id, 'approved')} className="w-9 h-9 rounded-xl bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all"><Check size={18} /></button>
                          <button onClick={() => handleStatusUpdate(app._id, 'rejected')} className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><XCircle size={18} /></button>
                          <button 
                            onClick={() => { setSelectedApplicant(app); setShowApplicantModal(true); }}
                            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-[#0B2C5F] hover:text-white transition-all"
                          >
                            <Info size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
