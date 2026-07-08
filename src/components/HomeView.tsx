import React, { useState } from 'react';
import { Award, ShieldAlert, ArrowRight, BookOpen, Target, Briefcase, Eye, ChevronRight, User, Compass, Users } from 'lucide-react';
import { ASSETS, HISTORICAL_TIMELINE, PROGRAMS, ORGANOGRAM } from '../data';
import { ProgramKerja, OrganogramNode } from '../types';
import { OptimizedImage } from './OptimizedImage';

interface HomeViewProps {
  setView?: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setView }) => {
  const [selectedOfficer, setSelectedOfficer] = useState<OrganogramNode>(ORGANOGRAM);
  const [activeProgramTab, setActiveProgramTab] = useState<'Semua' | 'Ekonomi' | 'Sosial & Lingkungan' | 'Kaderisasi' | 'Teknologi & Media'>('Semua');

  const filteredPrograms = activeProgramTab === 'Semua' 
    ? PROGRAMS 
    : PROGRAMS.filter(p => p.category === activeProgramTab);

  const stats = [
    { label: "DPC Terdaftar", value: "7 Daerah" },
    { label: "Total Kader Aktif", value: "10.000+" },
    { label: "Keterwakilan Perempuan", value: "32.4%" },
    { label: "Program Kerja", value: "4 Utama" }
  ];

  const visionMission = {
    vision: "Mewujudkan generasi muda Papua Barat yang berintegritas, mandiri, berdaya saing global, dan berdiri kokoh di garda terdepan dalam menjaga keutuhan bangsa serta keberlanjutan kelestarian tanah Papua.",
    missions: [
      "Mengakselerasi peningkatan kompetensi digital dan literasi teknologi informasi bagi seluruh pemuda se-Papua Barat.",
      "Mendorong kemandirian ekonomi kader melalui inkubasi bisnis kreatif dan program stimulasi Garda Preneur.",
      "Melestarikan ekologi dan lingkungan alam tanah Papua melalui inisiatif restorasi pesisir dan gerakan pemuda peduli sampah.",
      "Membangun jejaring pengkaderan yang solid, terbuka, berlandaskan Pancasila, pluralitas, dan kearifan lokal Papua.",
      "Memperkuat pendampingan tata kelola kampung/desa guna mengawal pemerataan dana pembangunan desa."
    ]
  };

  return (
    <div className="space-y-20 pb-24 font-sans bg-white">
      
      {/* 1. HERO BANNER - EXACT MATCH TO IMAGE MOCKUP */}
      <section id="home-hero" className="relative min-h-[640px] overflow-hidden flex items-center justify-center py-24 px-6 md:px-12 bg-[#02180B]">
        {/* Mountain Landscape Background */}
        <div className="absolute inset-0">
          <OptimizedImage 
            src={ASSETS.HERO_BG} 
            widthSize={1600}
            priority={true}
            alt="Papua Landscape Background" 
            className="w-full h-full object-cover opacity-50 scale-100"
          />
          {/* Exact color-graded atmospheric overlays to match mockup image */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-950/70 to-white/95 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,24,11,0.25)_0%,rgba(2,24,11,0.85)_100%)] z-10" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center space-y-6 z-20 pt-6">
          
          <div className="space-y-1.5 max-w-3xl mx-auto">
            <h3 className="font-sans font-bold text-xs md:text-sm tracking-[0.25em] text-white uppercase drop-shadow-sm leading-normal">
              SELAMAT DATANG DI BERANDA GARDA BANGSA PAPUA BARAT
            </h3>
            <p className="font-sans font-normal text-[10px] md:text-[11px] tracking-[0.15em] text-slate-200/90 uppercase">
              BERSAMA MEMBANGUN PAPUA BARAT YANG MAJU, ADIL, DAN MAKMUR
            </p>
          </div>

          <div className="space-y-2">
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-white max-w-5xl mx-auto">
              Garda Bangsa Papua Barat:
            </h1>
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none text-[#FFD15C] max-w-5xl mx-auto">
              Patriotik, Modern, Berdaulat
            </h1>
          </div>

          <p className="font-sans text-slate-100 text-sm md:text-base max-w-3xl mx-auto leading-relaxed font-medium">
            Bersama membangun Papua Barat yang unggul, berintegritas, dan sejahtera melalui aksi nyata dan pemberdayaan masyarakat.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => setView?.('kader')}
              className="bg-[#FFD15C] hover:bg-[#F3C044] text-slate-950 font-sans font-bold text-base py-3.5 px-10 rounded-lg shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Gabung Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* 2. KATA SAMBUTAN KETUA - EXACT MATCH TO IMAGE MOCKUP */}
      <section id="sambutan-ketua" className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="bg-white flex flex-col md:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Chairman Portrait Photo */}
          <div className="w-full md:w-[42%] relative flex-shrink-0">
            {/* The outer box/offset shadow decorative borders */}
            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-4 border-l-4 border-[#FFD15C] rounded-tl-xl z-0" />
            
            {/* Image Box */}
            <div className="relative z-10 w-full aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-slate-200">
              <OptimizedImage 
                src={ASSETS.CHAIRMAN_PHOTO} 
                widthSize={600}
                alt="Fadhlurrahman Anshari, S.Pd, S.H" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.01]"
              />
            </div>

            {/* Float badge at bottom-right of photo */}
            <div className="absolute -bottom-3 -right-3 z-20 bg-[#E8ECEF] px-4 py-3.5 rounded-lg border border-slate-300/80 shadow-md text-left font-sans max-w-[210px]">
              <p className="font-bold text-slate-950 text-xs">Ketua Wilayah</p>
              <p className="text-[10px] text-slate-600 font-medium mt-0.5">Garda Bangsa Papua Barat</p>
            </div>
          </div>

          {/* Right Column: Title and Speech Text */}
          <div className="w-full md:w-[58%] text-left space-y-6">
            
            {/* Title with quote mark decoration */}
            <div className="flex items-start gap-1">
              <span className="text-4xl font-serif text-[#FFD15C] leading-none font-bold -mt-1 select-none">”</span>
              <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight leading-none">
                Sambutan Ketua
              </h2>
            </div>
            
            {/* Quote Speech text (Exact content from mockup image) */}
            <p className="font-sans text-slate-700 text-sm md:text-base leading-relaxed">
              "Selamat datang di portal resmi Garda Bangsa Papua Barat. Kami hadir sebagai wadah perjuangan generasi muda yang patriotik, berwawasan modern, dan menjunjung tinggi kedaulatan bangsa. Melalui sinergi dan kolaborasi, kita wujudkan Papua Barat yang lebih baik."
            </p>

            {/* Signature Area with Yellow Border (Exact match to mockup) */}
            <div className="border-l-4 border-[#FFD15C] pl-4 mt-8 space-y-1">
              <p className="font-sans font-bold text-slate-900 text-base">
                Fadhlurrahman Anshari, S.Pd, S.H
              </p>
              <p className="text-xs text-slate-500 font-medium font-sans uppercase tracking-wider">
                Ketua Wilayah Garda Bangsa PB
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. VISI & MISI UTAMA - STYLISH LIGHT LAYOUT */}
      <section id="visi-misi" className="bg-[#FAFBFB] py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">Visi & Misi Utama</h2>
            <p className="font-sans text-slate-500 text-sm md:text-base">Arah perjuangan organisasi dalam mewujudkan kedaulatan, kemandirian pemuda, dan pemeliharaan tanah adat.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Visi Card - Premium Gradient */}
            <div className="bg-[#022C16] text-white p-8 md:p-10 rounded-2xl shadow-lg flex flex-col justify-between relative overflow-hidden group border border-[#16803D]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10" />
              <div className="space-y-6 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <Compass className="w-6 h-6 text-[#FFD15C]" />
                </div>
                <h3 className="font-sans font-bold text-xl tracking-tight text-[#FFD15C] uppercase">VISI</h3>
                <p className="font-sans text-base md:text-lg leading-relaxed font-normal italic text-slate-100">
                  "{visionMission.vision}"
                </p>
              </div>
              <div className="pt-8 border-t border-white/10 text-xxs tracking-wider text-green-300 font-mono flex items-center justify-between">
                <span>DKW GARDA BANGSA PAPUA BARAT</span>
                <span>EST. 2023</span>
              </div>
            </div>

            {/* Misi Card - Clean Light */}
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md border border-slate-100 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#EFF6FF] text-emerald-800 rounded-xl flex items-center justify-center border border-[#DBEAFE]">
                  <Target className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-sans font-bold text-xl text-slate-900 tracking-tight">MISI KAMI</h3>
              </div>
              <div className="space-y-4">
                {visionMission.missions.map((m, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="flex-none w-7 h-7 bg-emerald-50 text-emerald-800 font-mono text-xs font-bold flex items-center justify-center rounded-lg border border-emerald-100">
                      {idx + 1}
                    </span>
                    <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed pt-0.5">{m}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. STRUKTUR ORGANISASI (Interactive Organogram) */}
      <section id="struktur-organisasi" className="max-w-7xl mx-auto px-8 md:px-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
          <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">Struktur Kepengurusan</h2>
          <p className="font-sans text-slate-500 text-sm md:text-base">Klik salah satu pengurus di bagan hirarki untuk melihat informasi detail mengenai peran & tanggung jawabnya secara komprehensif.</p>
        </div>

        <div className="bg-[#FAFBFB] rounded-2xl shadow-sm p-6 md:p-10 border border-slate-100 space-y-10">
          
          {/* Organogram Tree Graphic representation */}
          <div className="flex flex-col items-center">
            
            {/* Top Node: Ketua Umum */}
            <div className="flex flex-col items-center">
              <button 
                id="officer-node-chairman"
                onClick={() => setSelectedOfficer(ORGANOGRAM)}
                className={`group flex flex-col items-center p-4 rounded-xl transition-all duration-300 border cursor-pointer ${
                  selectedOfficer.id === ORGANOGRAM.id 
                    ? 'bg-[#022C16] text-white border-[#FFD15C] shadow-md ring-4 ring-emerald-800/10 scale-105' 
                    : 'bg-white text-slate-800 border-slate-200 shadow hover:border-emerald-800 hover:-translate-y-1'
                }`}
              >
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#FFD15C] flex items-center justify-center bg-gray-100 mb-3 shadow-inner">
                  <OptimizedImage 
                    src={ORGANOGRAM.photoUrl || ''} 
                    widthSize={150}
                    alt={ORGANOGRAM.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-sans font-bold text-sm tracking-tight">{ORGANOGRAM.name}</h4>
                <p className={`font-mono text-[9px] tracking-wider mt-0.5 uppercase ${selectedOfficer.id === ORGANOGRAM.id ? 'text-[#FFD15C]' : 'text-emerald-800'}`}>
                  {ORGANOGRAM.title}
                </p>
                <span className={`text-[9px] px-2.5 py-0.5 rounded-full mt-2 font-sans font-semibold ${selectedOfficer.id === ORGANOGRAM.id ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  Ketua Umum DKW
                </span>
              </button>

              {/* Connector line down */}
              <div className="w-0.5 h-8 bg-slate-300" />
            </div>

            {/* Horizontal branch line */}
            <div className="w-full max-w-4xl flex items-center justify-between">
              <div className="w-1/2 h-0.5 bg-slate-300" />
              <div className="w-0.5 h-0.5 bg-slate-300" />
              <div className="w-1/2 h-0.5 bg-slate-300" />
            </div>

            {/* Downward branches for assistants */}
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 justify-items-center pt-2">
              
              {ORGANOGRAM.subNodes?.map((subNode) => {
                const isSelected = selectedOfficer.id === subNode.id;
                return (
                  <div key={subNode.id} className="flex flex-col items-center w-full">
                    <div className="w-0.5 h-6 bg-slate-300 hidden md:block" />
                    <button
                      id={`officer-node-${subNode.id}`}
                      onClick={() => setSelectedOfficer(subNode)}
                      className={`group flex flex-col items-center p-4 rounded-xl w-full max-w-[240px] transition-all duration-300 border cursor-pointer ${
                        isSelected 
                          ? 'bg-[#022C16] text-white border-[#FFD15C] shadow-md ring-4 ring-emerald-800/10 scale-105' 
                          : 'bg-white text-slate-800 border-slate-200 shadow hover:border-emerald-800 hover:-translate-y-1'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#FFD15C]/60 flex items-center justify-center bg-gray-100 mb-3 shadow-inner">
                        <OptimizedImage 
                          src={subNode.photoUrl || ''} 
                          widthSize={150}
                          alt={subNode.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-sans font-bold text-xs tracking-tight text-center truncate w-full">{subNode.name}</h4>
                      <p className={`font-mono text-[9px] tracking-wider mt-0.5 uppercase ${isSelected ? 'text-[#FFD15C]' : 'text-emerald-800'}`}>
                        {subNode.title}
                      </p>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full mt-2 font-sans font-semibold ${isSelected ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {subNode.role.split('Dewan')[0]}
                      </span>
                    </button>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Active Node Detail Card */}
          <div id="active-officer-detail" className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 flex flex-col md:flex-row gap-6 items-center md:items-start animate-fade-in">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-md flex-none border-2 border-white bg-slate-100">
              <OptimizedImage 
                src={selectedOfficer.photoUrl || ''} 
                widthSize={300}
                alt={selectedOfficer.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4 text-center md:text-left flex-1">
              <div>
                <span className="font-mono text-[9px] font-extrabold uppercase tracking-widest bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-100">
                  {selectedOfficer.role}
                </span>
                <h3 className="font-sans font-extrabold text-xl text-slate-900 tracking-tight mt-3">{selectedOfficer.name}</h3>
                <p className="text-xs font-mono text-yellow-600 font-semibold uppercase tracking-wider mt-0.5">{selectedOfficer.title} se-Provinsi Papua Barat</p>
              </div>
              
              <div className="text-slate-600 text-sm md:text-base leading-relaxed">
                <p>{selectedOfficer.description || "Bertanggung jawab penuh atas pengelolaan administrasi program, sinkronisasi kebijakan partai, dan pemeliharaan hubungan baik se-Kabupaten/Kota Papua Barat."}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 justify-center md:justify-start">
                <span className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-sans px-2.5 py-1 rounded-lg">
                  💼 Anggota Sejak 2023
                </span>
                <span className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-sans px-2.5 py-1 rounded-lg">
                  📍 Sekretariat Manokwari
                </span>
                <span className="bg-slate-50 border border-slate-200 text-slate-600 text-xs font-sans px-2.5 py-1 rounded-lg">
                  ✅ Akun Terverifikasi
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. JEJAK SEJARAH TIMELINE */}
      <section id="sejarah-kami" className="bg-[#FAFBFB] py-16 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-14">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">Jejak Sejarah Kami</h2>
            <p className="font-sans text-slate-500 text-sm md:text-base">Melihat kembali perjalanan rintisan perjuangan DKW Garda Bangsa Provinsi Papua Barat dari pembentukan hingga era digital.</p>
          </div>

          <div className="relative border-l-2 border-emerald-800/20 max-w-4xl mx-auto pl-6 md:pl-10 space-y-12">
            {HISTORICAL_TIMELINE.map((item, idx) => (
              <div key={idx} className="relative group animate-fade-in" id={`timeline-item-${item.year}`}>
                
                {/* Bullet */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-emerald-800 flex items-center justify-center shadow transition-all duration-300 group-hover:bg-[#FFD15C] group-hover:scale-110" />
                
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                  
                  {/* Photo content */}
                  <div className="md:w-1/3 h-40 rounded-xl overflow-hidden bg-slate-100 flex-none relative">
                    <OptimizedImage 
                      src={item.image} 
                      widthSize={400}
                      alt={item.title} 
                      className="w-full h-full transition-transform duration-500 group-hover:scale-101 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#022C16] text-[#FFD15C] font-mono text-xxs font-extrabold px-3 py-1 rounded-full border border-emerald-800">
                      Tahun {item.year}
                    </span>
                  </div>

                  {/* Words Content */}
                  <div className="md:w-2/3 space-y-3 flex flex-col justify-center">
                    <h3 className="font-sans font-extrabold text-base md:text-lg text-slate-900 tracking-tight leading-snug group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-slate-600 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PROGRAM KERJA UTAMA - BEAUTIFUL ACCENTS */}
      <section id="program-kerja" className="max-w-7xl mx-auto px-8 md:px-12">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-left">
            <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">Program Kerja Utama</h2>
            <p className="font-sans text-slate-500 text-sm md:text-base">Mewujudkan visi organisasi melalui serangkaian program aksi nyata yang didorong oleh integrasi anak muda di Papua Barat.</p>
          </div>
          
          {/* Tabs Filter */}
          <div className="flex flex-wrap gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 flex-none self-start md:self-auto">
            {['Semua', 'Ekonomi', 'Sosial & Lingkungan', 'Kaderisasi', 'Teknologi & Media'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveProgramTab(tab as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-sans font-bold cursor-pointer transition-all ${
                  activeProgramTab === tab 
                    ? 'bg-[#022C16] text-white shadow' 
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {filteredPrograms.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col group hover:shadow-md transition-all" id={`program-card-${p.id}`}>
              
              {/* Image banner */}
              <div className="h-56 relative bg-slate-100 overflow-hidden">
                <OptimizedImage 
                  src={p.imageUrl} 
                  widthSize={600}
                  alt={p.name} 
                  className="w-full h-full transition-transform duration-700 group-hover:scale-101 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                {/* Category tag */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-slate-900 font-sans text-[10px] font-extrabold px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/50">
                  {p.category}
                </span>

                {/* Status tag */}
                <span className={`absolute top-4 right-4 text-white font-mono text-[9px] font-extrabold px-3 py-1 rounded-full border shadow-sm ${
                  p.status === 'Berjalan' ? 'bg-emerald-800 border-emerald-700' :
                  p.status === 'Selesai' ? 'bg-sky-700 border-sky-600' : 'bg-amber-700 border-amber-600'
                }`}>
                  ● {p.status}
                </span>

                {/* Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <h3 className="font-sans font-extrabold text-white text-base md:text-lg tracking-tight leading-snug">
                    {p.name}
                  </h3>
                </div>
              </div>

              {/* Card content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="font-sans text-slate-600 text-xs md:text-sm leading-relaxed">
                  {p.description}
                </p>

                {/* Highlight Checklist */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                  <p className="font-sans text-[#022C16] font-bold text-xxs tracking-wider uppercase mb-1">Sorotan Utama Program:</p>
                  {p.highlights.map((h, i) => (
                    <div key={i} className="flex gap-2 items-center text-slate-700 text-xs font-sans">
                      <span className="text-emerald-700 flex-none font-bold">✓</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
