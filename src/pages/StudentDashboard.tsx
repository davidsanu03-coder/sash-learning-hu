import { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import axios from 'axios';
import { 
  FileText, Download, CheckCircle, Clock, AlertCircle, 
  CreditCard, User as UserIcon, LogOut, ChevronRight, GraduationCap, Bell, Inbox, Trash2, MailOpen
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, logout } = useAuth();
  const [application, setApplication] = useState<any>(null);
  const [payment, setPayment] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const [appRes, payRes, notifRes] = await Promise.all([
          axios.get('/api/applications/my-application'),
          axios.get('/api/payments/status'),
          axios.get('/api/notifications')
        ]);
        setApplication(appRes.data);
        setPayment(payRes.data);
        setNotifications(notifRes.data);
      } catch (err) {
        console.error("Dashboard failed to load data");
      } finally {
        setLoading(false);
      }
    };
    loadStudentData();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await axios.patch(`/api/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-[#0B2C5F]">Syncing Records...</div>;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h2 className="text-4xl font-black text-[#0B2C5F] mb-2">Student Portal</h2>
          <p className="text-slate-400 font-medium">Welcome back, <span className="text-[#D4AF37] font-bold">{user?.fullName}</span></p>
        </div>
        <div className="flex gap-4">
           {payment ? (
             <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-full flex items-center gap-3">
               <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-[10px] font-black uppercase tracking-widest text-[#0B2C5F]">Reg Number: {payment.formNumber}</span>
             </div>
           ) : (
             <Link to="/buy-form" className="bg-[#D4AF37] text-[#0B2C5F] px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg">Buy Admission Form</Link>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats & Status */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-[#0B2C5F]/5">
              <h3 className="text-lg font-black text-[#0B2C5F] mb-8 uppercase tracking-tight">Admission Status</h3>
              <div className={`p-8 rounded-[2rem] border flex flex-col items-center text-center ${application ? getStatusColor(application.applicationStatus) : 'bg-slate-50 border-slate-100'}`}>
                 {application ? (
                   <>
                     {application.applicationStatus === 'pending' && <Clock size={48} className="mb-4" />}
                     {application.applicationStatus === 'approved' && <CheckCircle size={48} className="mb-4" />}
                     {application.applicationStatus === 'rejected' && <AlertCircle size={48} className="mb-4" />}
                     <h4 className="text-xl font-black uppercase mb-2">{application.applicationStatus}</h4>
                     <p className="text-xs font-medium opacity-80">
                       {application.applicationStatus === 'pending' ? 'Your credentials are being reviewed by the administrative board.' : 'Check the notifications for your admission letter.'}
                     </p>
                   </>
                 ) : (
                   <>
                     <AlertCircle size={48} className="text-slate-300 mb-4" />
                     <h4 className="text-xl font-black uppercase mb-2 text-slate-300">Not Submitted</h4>
                     <p className="text-xs font-medium text-slate-400">Complete your application to see your current status.</p>
                     <Link to="/apply" className="mt-8 bg-[#0B2C5F] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] transition-colors">Apply Now</Link>
                   </>
                 )}
              </div>
           </div>

           <div className="bg-[#0B2C5F] text-white rounded-[2.5rem] shadow-2xl p-10">
              <h3 className="text-lg font-black mb-8 border-b border-white/10 pb-4">Profile Details</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><UserIcon size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</p>
                    <p className="font-bold text-sm">{user?.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><GraduationCap size={20} /></div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</p>
                    <p className="font-bold text-sm truncate max-w-[200px]">{user?.email}</p>
                  </div>
                </div>
                {payment && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center"><CreditCard size={20} /></div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Form Receipt</p>
                      <p className="font-bold text-sm">#SASH-77281 (Paid)</p>
                    </div>
                  </div>
                )}
              </div>
           </div>
        </div>

        {/* Right Column: Actions & Notifications */}
        <div className="lg:col-span-8 space-y-8">
           <div className="bg-white rounded-[3rem] shadow-2xl p-12 border border-[#0B2C5F]/5">
              <h3 className="text-2xl font-black text-[#0B2C5F] mb-12 flex justify-between items-center">
                Portal Services
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full">Active session</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: FileText, title: 'Download Slip', desc: 'Acknowledgement & Clearance slip', active: !!application },
                  { icon: Download, title: 'Admission Letter', desc: 'Official provisional admission letter', active: application?.applicationStatus === 'approved' },
                  { icon: CreditCard, title: 'Fee Schedules', desc: 'Detailed mandatory university fees', active: true },
                  { icon: Clock, title: 'Calendar', desc: 'Academic session dates & deadlines', active: true }
                ].map((action, i) => (
                  <div 
                    key={i} 
                    className={`group p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer ${action.active ? 'border-slate-50 bg-slate-50/50 hover:bg-[#0B2C5F] hover:border-[#0B2C5F] shadow-xl hover:shadow-[#0B2C5F]/20' : 'border-slate-100 opacity-40 cursor-not-allowed'}`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${action.active ? 'bg-white text-[#0B2C5F] group-hover:bg-white/10 group-hover:text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <action.icon size={26} />
                    </div>
                    <h4 className={`font-black uppercase tracking-tight mb-2 transition-colors ${action.active ? 'text-[#0B2C5F] group-hover:text-white' : 'text-slate-400'}`}>{action.title}</h4>
                    <p className={`text-xs font-medium leading-relaxed transition-colors ${action.active ? 'text-slate-500 group-hover:text-slate-300' : 'text-slate-300'}`}>{action.desc}</p>
                    {action.active && <ChevronRight size={16} className="mt-8 text-[#D4AF37] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />}
                  </div>
                ))}
              </div>
           </div>

            <div className="bg-white rounded-[3rem] shadow-2xl p-12 border border-[#0B2C5F]/5">
              <h3 className="text-2xl font-black text-[#0B2C5F] mb-12 flex justify-between items-center">
                Notifications
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] bg-[#D4AF37]/10 px-4 py-1.5 rounded-full">
                       {notifications.filter(n => !n.isRead).length} Unread
                    </span>
                </div>
              </h3>
              
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-300">
                     <Inbox size={48} className="mb-4 opacity-20" />
                     <p className="text-xs font-black uppercase tracking-widest">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif._id} 
                      onClick={() => !notif.isRead && markAsRead(notif._id)}
                      className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex gap-5 ${notif.isRead ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-[#0B2C5F]/10 shadow-lg hover:shadow-xl hover:translate-y-[-2px]'}`}
                    >
                       <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${notif.isRead ? 'bg-white text-slate-400' : 'bg-[#0B2C5F] text-white shadow-lg shadow-[#0B2C5F]/20'}`}>
                          {notif.isRead ? <MailOpen size={20} /> : <Bell size={20} className="animate-bounce" />}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                             <h4 className={`text-sm font-black uppercase tracking-tight ${notif.isRead ? 'text-slate-500' : 'text-[#0B2C5F]'}`}>{notif.title}</h4>
                             <span className="text-[10px] font-bold text-slate-400">{new Date(notif.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className={`text-xs font-medium leading-relaxed ${notif.isRead ? 'text-slate-400' : 'text-slate-600'}`}>{notif.message}</p>
                       </div>
                    </div>
                  ))
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
