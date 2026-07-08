import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldAlert, CheckCircle, Radio, Clock, Award } from 'lucide-react';
import { ContactMessage } from '../types';
import { ASSETS } from '../data';
import { OptimizedImage } from './OptimizedImage';

interface ContactViewProps {
  messages: ContactMessage[];
  onSendMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ messages, onSendMessage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Nama wajib diisi";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = "Format email tidak valid";
    if (!formData.subject.trim()) errors.subject = "Subjek pesan wajib diisi";
    if (!formData.message.trim()) errors.message = "Konten pesan tidak boleh kosong";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    // Simulate sending progress
    setTimeout(() => {
      onSendMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      setIsSubmitting(false);
      setShowSuccessToast(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Auto dismiss toast
      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* HEADER BAR */}
      <div>
        <h1 className="font-sans font-extrabold text-3xl text-slate-950 tracking-tight flex items-center gap-2">
          Hubungi Kami <Mail className="w-6.5 h-6.5 text-[#15803D]" />
        </h1>
        <p className="font-sans text-slate-500 text-sm mt-1">Hubungi Sekretariat Wilayah DKW Garda Bangsa Papua Barat untuk aspirasi pemuda, kemitraan program, atau bantuan pendaftaran KTA.</p>
      </div>

      {/* THREE PILLAR CARDS (ADDRESS, PHONE, EMAIL) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Address Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex gap-4 items-start text-left">
          <div className="w-10 h-10 bg-emerald-100 text-[#0E4A28] rounded-xl flex items-center justify-center flex-none">
            <MapPin className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-1.5 font-sans">
            <h4 className="font-bold text-slate-950 text-sm">Alamat Sekretariat</h4>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Kompleks Ruko Sanggeng Blok C No. 12,<br />
              Kabupaten Manokwari, Provinsi Papua Barat.
            </p>
          </div>
        </div>

        {/* Phone Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex gap-4 items-start text-left">
          <div className="w-10 h-10 bg-emerald-100 text-[#0E4A28] rounded-xl flex items-center justify-center flex-none">
            <Phone className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-1.5 font-sans">
            <h4 className="font-bold text-slate-950 text-sm">Telepon & WhatsApp</h4>
            <p className="text-slate-600 text-xs md:text-sm">
              Hotline: +62 812-4455-8811<br />
              Waktu Layanan: Senin - Sabtu (08.00 - 17.00 WIT)
            </p>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex gap-4 items-start text-left">
          <div className="w-10 h-10 bg-emerald-100 text-[#0E4A28] rounded-xl flex items-center justify-center flex-none">
            <Mail className="w-5.5 h-5.5" />
          </div>
          <div className="space-y-1.5 font-sans">
            <h4 className="font-bold text-slate-950 text-sm">Surat Elektronik (Email)</h4>
            <p className="text-slate-600 text-xs md:text-sm">
              Surat Resmi: dkw@garda.or.id<br />
              Saran & Pengaduan: sekretariat@garda.or.id
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* INTERACTIVE FORM BLOCK (7 Cols of 12) */}
        <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <MessageSquare className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="font-sans font-bold text-lg text-slate-950">Kirimkan Aspirasi / Pesan Anda</h3>
              <p className="text-xs text-slate-500">Pesan Anda akan langsung masuk ke database koordinasi kesekretariatan wilayah.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Nama Lengkap Anda</label>
                <input 
                  type="text" 
                  id="contact-name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="cth: Yafet Mandacan"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                {formErrors.name && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Alamat Email Aktif</label>
                <input 
                  type="email" 
                  id="contact-email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="cth: yafet@gmail.com"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
                {formErrors.email && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.email}</p>}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Subjek / Perihal Pesan</label>
              <input 
                type="text" 
                id="contact-subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="cth: Kerja Sama Program Pelatihan Digital di Desa"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.subject && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.subject}</p>}
            </div>

            {/* Message Body */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Isi Konten Pesan Serta Aspirasi</label>
              <textarea 
                rows={5}
                id="contact-message-body"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder="Ketikkan secara rinci aspirasi, aduan, atau proposal kemitraan Anda di sini..."
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.message && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.message}</p>}
            </div>

            {/* Submit Row with success banner indicator */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                {showSuccessToast && (
                  <div className="flex items-center gap-1.5 text-xs font-sans font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-1.5 animate-bounce">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Pesan Terkirim Ke Server!</span>
                  </div>
                )}
              </div>
              <button
                type="submit"
                id="btn-submit-contact"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-[#0E4A28] hover:from-emerald-500 text-white font-sans font-bold text-sm py-2.5 px-6 rounded-lg shadow cursor-pointer transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'MENGIRIM PESAN...' : 'KIRIM PESAN'}</span>
              </button>
            </div>

          </form>
        </div>

        {/* TOPOGRAPHY MAP & LIVE LOG BLOCK (5 Cols of 12) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-8">
          
          {/* Topography Map Block with coordinates overlay */}
          <div className="bg-[#0A331C] rounded-3xl overflow-hidden relative shadow-md h-64 border border-slate-200/20">
            <OptimizedImage 
              src={ASSETS.MAP_BG} 
              alt="Peta Topografi Papua Barat" 
              className="w-full h-full object-cover opacity-30 select-none scale-102"
              widthSize={800}
            />
            {/* Dark green overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A331C] via-[#0A331C]/60 to-[#0A331C]/10" />

            {/* Glowing Coordinate Dot for Secretariat */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
              {/* Double wave rings */}
              <span className="absolute w-12 h-12 bg-yellow-400/20 rounded-full animate-ping pointer-events-none" />
              <span className="absolute w-6 h-6 bg-yellow-400/40 rounded-full animate-ping pointer-events-none" />
              {/* Solid core */}
              <span className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow flex items-center justify-center relative z-20">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              </span>
              {/* Location Tag */}
              <span className="bg-slate-900/95 backdrop-blur-md text-white border border-yellow-500/30 text-[10px] font-sans font-bold px-2 py-1 rounded-md shadow-lg mt-2 tracking-wider whitespace-nowrap">
                📌 SEKRETARIAT KOTA MANOKWARI
              </span>
            </div>

            {/* Coordinate display text in corner */}
            <div className="absolute bottom-4 left-4 text-[10px] font-mono text-green-300">
              <p>Coords: 0°52'11.8"S 134°04'12.4"E</p>
              <p>Elev: 12 m.a.s.l</p>
            </div>
          </div>

          {/* REAL TIME MESSAGE MONITOR INBOX WIDGET */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4 flex-1 flex flex-col justify-between" id="inbox-logs-widget">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                <h4 className="font-sans font-bold text-sm text-slate-950">Aktivitas Kontak Terbaru (Inbound)</h4>
              </div>
              <span className="bg-slate-100 text-slate-600 font-mono text-xxs font-semibold px-2 py-0.5 rounded-full">
                Sistem Online
              </span>
            </div>

            {/* List of messages submitted in the session */}
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {messages.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-6">Belum ada aktivitas kontak masuk saat ini.</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex gap-2.5 items-start text-left animate-fade-in">
                    <div className="w-6.5 h-6.5 rounded-full bg-[#15803D] text-white text-xs font-bold font-sans flex items-center justify-center flex-none">
                      {msg.name[0].toUpperCase()}
                    </div>
                    <div className="space-y-1 flex-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-sans font-bold text-slate-900 truncate max-w-[120px]">{msg.name}</span>
                        <span className="font-mono text-[9px] text-slate-400 flex items-center gap-0.5"><Clock className="w-3 h-3" /> {msg.date}</span>
                      </div>
                      <p className="font-sans font-semibold text-slate-700 truncate">{msg.subject}</p>
                      <p className="font-sans text-slate-500 line-clamp-2">{msg.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-[11px] font-sans flex gap-2 items-start text-left leading-relaxed">
              <ShieldAlert className="w-4.5 h-4.5 text-amber-500 flex-none" />
              <span>Seluruh pesan di atas disinkronisasi dalam memori lokal sesi browser Anda untuk keamanan dan privasi.</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
