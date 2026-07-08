import React, { useState } from 'react';
import { Users, UserCheck, Radio, TrendingUp, Download, Printer, Filter, ChevronRight, HelpCircle, Activity, Award, Settings } from 'lucide-react';
import { DpcStatus, Kader } from '../types';

interface DashboardViewProps {
  dpcList: DpcStatus[];
  kaderList: Kader[];
  setView?: (view: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ dpcList, kaderList, setView }) => {
  const [selectedDpcFilter, setSelectedDpcFilter] = useState<string>('Semua');
  const [hoveredBarIdx, setHoveredBarIdx] = useState<number | null>(null);
  const [hoveredSlice, setHoveredSlice] = useState<'male' | 'female' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 1. Calculate General Metrics
  const totalKader = dpcList.reduce((sum, dpc) => sum + dpc.membersCount, 0) + kaderList.filter(k => k.status === 'Aktif').length;
  const pendingVerifikasi = dpcList.reduce((sum, dpc) => sum + dpc.pendingCount, 0) + kaderList.filter(k => k.status === 'Pending').length;
  const dpcCount = dpcList.length;
  const averageActivity = Math.round(dpcList.reduce((sum, dpc) => sum + dpc.activityLevel, 0) / dpcCount);

  // Filtered DPC List for Display Table
  const filteredDpcList = selectedDpcFilter === 'Semua' 
    ? dpcList 
    : dpcList.filter(dpc => dpc.name === selectedDpcFilter);

  // 2. Bar Chart Data: Sebaran Kader per Wilayah (Top 8)
  const barChartData = dpcList.slice(0, 8).map(dpc => ({
    label: dpc.name,
    value: dpc.membersCount
  }));
  const maxBarValue = Math.max(...barChartData.map(d => d.value));

  // 3. Donut Chart Data: Gender Proportion
  const genderStats = {
    male: { label: "Laki-laki", value: 6760, percentage: 67.6, color: "#10B981" }, // Emerald
    female: { label: "Perempuan", value: 3240, percentage: 32.4, color: "#F59E0B" } // Amber
  };

  // 4. Line Chart Data: Growth Trend (2024 - 2026 Q2)
  const growthData = [
    { period: "Jan 24", count: 1200 },
    { period: "Apr 24", count: 2400 },
    { period: "Jul 24", count: 3800 },
    { period: "Okt 24", count: 4900 },
    { period: "Jan 25", count: 6200 },
    { period: "Apr 25", count: 7400 },
    { period: "Jul 25", count: 8500 },
    { period: "Okt 25", count: 9100 },
    { period: "Jan 26", count: 9600 },
    { period: "Apr 26", count: 10000 }
  ];
  const maxTrendValue = 11000;

  // 5. Demographics Age Data (horizontal indicators)
  const ageDemographics = [
    { range: "17 - 21 Tahun (Pemilih Pemula)", percentage: 18, count: 1800, color: "bg-emerald-500" },
    { range: "22 - 26 Tahun (Mahasiswa & Freshgrad)", percentage: 35, count: 3500, color: "bg-[#15803D]" },
    { range: "27 - 31 Tahun (Profesional Muda)", percentage: 28, count: 2800, color: "bg-[#0E4A28]" },
    { range: "32 - 35 Tahun (Wirausaha Mandiri)", percentage: 14, count: 1400, color: "bg-amber-500" },
    { range: "35+ Tahun (Senior Advokat)", percentage: 5, count: 500, color: "bg-slate-400" }
  ];

  return (
    <div className="space-y-8 pb-20">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-sans text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-3xl text-slate-950 tracking-tight flex items-center gap-2">
            Dashboard Statistik Kader <Activity className="w-6 h-6 text-[#15803D]" />
          </h1>
          <p className="font-sans text-slate-500 text-sm mt-1">Real-time analisis kependudukan, sebaran wilayah, keterwakilan gender, dan grafik pertumbuhan organisasi.</p>
        </div>

        {/* Action Button cluster */}
        <div className="flex items-center gap-2.5">
          {setView && (
            <button 
              onClick={() => setView('settings')}
              className="bg-white hover:bg-slate-50 text-slate-700 font-sans font-semibold text-xs py-2 px-3.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Settings className="w-3.5 h-3.5 text-slate-500" />
              <span>Pengaturan Website</span>
            </button>
          )}
          <button 
            onClick={() => window.print()}
            className="bg-white hover:bg-slate-50 text-slate-700 font-sans font-semibold text-xs py-2 px-3.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak Laporan</span>
          </button>
          <button 
            onClick={() => triggerToast("Mengekspor database statistik dalam format Excel...")}
            className="bg-gradient-to-r from-emerald-600 to-[#0E4A28] hover:from-emerald-500 text-white font-sans font-semibold text-xs py-2 px-3.5 rounded-lg shadow-sm border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh CSV</span>
          </button>
        </div>
      </div>

      {/* METRIC CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-slate-500 text-xs font-sans tracking-wider uppercase font-semibold">Total Kader Terdaftar</p>
            <h3 className="text-3xl font-bold text-slate-950 font-sans tracking-tight">{totalKader.toLocaleString('id-ID')}</h3>
            <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+4.2% Pertumbuhan bulan ini</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-emerald-100 text-[#0E4A28] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-slate-500 text-xs font-sans tracking-wider uppercase font-semibold">Verifikasi Pending</p>
            <h3 className="text-3xl font-bold text-slate-950 font-sans tracking-tight">{pendingVerifikasi}</h3>
            <p className="text-xs text-amber-600 font-medium flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-pulse text-amber-500" />
              <span>Menunggu persetujuan admin</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-slate-500 text-xs font-sans tracking-wider uppercase font-semibold">DPC Kabupaten/Kota</p>
            <h3 className="text-3xl font-bold text-slate-950 font-sans tracking-tight">{dpcCount} / 13</h3>
            <p className="text-xs text-emerald-600 font-medium">
              <span>96.2% Jangkauan Terkonsolidasi</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-[#0E4A28]/10 text-[#0E4A28] rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
          <div className="space-y-2">
            <p className="text-slate-500 text-xs font-sans tracking-wider uppercase font-semibold">Rata-rata Keaktifan</p>
            <h3 className="text-3xl font-bold text-slate-950 font-sans tracking-tight">{averageActivity}%</h3>
            <p className="text-xs text-slate-500">
              <span>Kecepatan respons & konsolidasi</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
            <Activity className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* CHART CONTAINER SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHART 1: SEBARAN KADER PER WILAYAH (8 Cols of 12) */}
        <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-sans font-bold text-lg text-slate-950">Sebaran Kader per Wilayah</h3>
              <p className="text-xs text-slate-500">Perbandingan kuantitas keanggotaan aktif di 8 Kabupaten/Kota dengan kontribusi terbesar.</p>
            </div>
            <div className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help" title="Data diupdate berdasarkan sinkronisasi KTA nasional harian.">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="relative pt-6 h-[260px] flex items-end justify-between gap-2 border-b border-slate-200 px-4">
            
            {/* Guide lines background */}
            <div className="absolute inset-x-0 bottom-0 h-full flex flex-col justify-between pointer-events-none pb-2">
              <div className="w-full border-t border-slate-100 text-xxs text-slate-400 pt-1">1.800</div>
              <div className="w-full border-t border-slate-100 text-xxs text-slate-400 pt-1">1.200</div>
              <div className="w-full border-t border-slate-100 text-xxs text-slate-400 pt-1">600</div>
              <div className="w-full" />
            </div>

            {/* Individual Bars */}
            {barChartData.map((data, idx) => {
              const heightPercentage = Math.round((data.value / maxBarValue) * 80) + 10; // offset to keep visible
              const isHovered = hoveredBarIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="relative flex flex-col items-center flex-1 group"
                  onMouseEnter={() => setHoveredBarIdx(idx)}
                  onMouseLeave={() => setHoveredBarIdx(null)}
                >
                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -top-12 bg-slate-900 text-white text-xxs font-sans font-bold px-2.5 py-1.5 rounded-lg shadow-lg z-20 whitespace-nowrap animate-fade-in border border-slate-700">
                      <p>{data.label}: <span className="text-yellow-400">{data.value.toLocaleString('id-ID')} Kader</span></p>
                    </div>
                  )}

                  {/* Interactive Bar */}
                  <div 
                    style={{ height: `${heightPercentage}%` }} 
                    className={`w-10 sm:w-12 rounded-t-lg transition-all duration-300 cursor-pointer ${
                      isHovered 
                        ? 'bg-gradient-to-t from-emerald-700 to-emerald-500 shadow-md shadow-emerald-700/20' 
                        : 'bg-gradient-to-t from-[#0E4A28] to-[#15803D]'
                    }`}
                  />

                  {/* Value display inside bar on large screen */}
                  <span className="absolute bottom-2 text-white font-mono text-[10px] font-bold hidden md:block opacity-90">
                    {data.value}
                  </span>
                </div>
              );
            })}

          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between gap-2 px-4 text-center">
            {barChartData.map((data, idx) => (
              <span key={idx} className="flex-1 font-sans text-[10px] sm:text-xs text-slate-600 font-semibold truncate">
                {data.label}
              </span>
            ))}
          </div>

        </div>

        {/* CHART 2: GENDER PROPORTION (4 Cols of 12) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-950">Komposisi Gender</h3>
            <p className="text-xs text-slate-500">Persentase keterwakilan perempuan sesuai amanat konsolidasi nasional.</p>
          </div>

          {/* SVG Donut Chart */}
          <div className="relative flex items-center justify-center h-[180px]">
            <svg width="160" height="160" viewBox="0 0 160 160" className="transform -rotate-90">
              
              {/* Background circle */}
              <circle cx="80" cy="80" r="60" fill="transparent" stroke="#E2E8F0" strokeWidth="20" />
              
              {/* Female Slice (32.4%): dasharray is 32.4% of (2 * PI * r) -> 2 * 3.14 * 60 = 376.8. Dash: 32.4% of 376.8 = 122. */}
              <circle 
                cx="80" 
                cy="80" 
                r="60" 
                fill="transparent" 
                stroke={genderStats.female.color} 
                strokeWidth="20" 
                strokeDasharray="122 377" 
                strokeDashoffset="0"
                className="transition-all duration-500 cursor-pointer hover:stroke-[22px]"
                onMouseEnter={() => setHoveredSlice('female')}
                onMouseLeave={() => setHoveredSlice(null)}
              />

              {/* Male Slice (67.6%): offset by Female dash length 122. Dash length: 67.6% of 376.8 = 254.8. */}
              <circle 
                cx="80" 
                cy="80" 
                r="60" 
                fill="transparent" 
                stroke={genderStats.male.color} 
                strokeWidth="20" 
                strokeDasharray="254.8 377" 
                strokeDashoffset="-122"
                className="transition-all duration-500 cursor-pointer hover:stroke-[22px]"
                onMouseEnter={() => setHoveredSlice('male')}
                onMouseLeave={() => setHoveredSlice(null)}
              />

            </svg>

            {/* Center Absolute Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="font-sans font-extrabold text-2xl text-slate-950">
                {hoveredSlice === 'male' ? '67.6%' : hoveredSlice === 'female' ? '32.4%' : '32.4%'}
              </span>
              <span className="text-[10px] text-slate-500 font-sans tracking-wider uppercase font-semibold">
                {hoveredSlice === 'male' ? 'LAKI-LAKI' : hoveredSlice === 'female' ? 'PEREMPUAN' : 'PEREMPUAN'}
              </span>
            </div>
          </div>

          {/* Legend Table */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-slate-700">Laki-laki</span>
              </div>
              <span className="font-bold text-slate-950">6.760 Kader (67.6%)</span>
            </div>
            <div className="flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-slate-700">Perempuan</span>
              </div>
              <span className="font-bold text-slate-950">3.240 Kader (32.4%)</span>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CHART 3: GROWING TREND LINE/AREA CHART (6 Cols of 12) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-950">Grafik Akumulasi Kader (2024 - 2026)</h3>
            <p className="text-xs text-slate-500">Tren peningkatan jumlah pemuda yang memiliki KTA Garda Bangsa terverifikasi.</p>
          </div>

          {/* SVG Wave Line Area Chart */}
          <div className="relative pt-6 h-[180px] border-b border-l border-slate-200">
            <svg viewBox="0 0 500 120" className="w-full h-full" preserveAspectRatio="none">
              
              {/* Filled Wave Gradient */}
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area Path */}
              <path 
                d="M 10 110 
                   Q 50 90, 80 85 
                   T 150 70 
                   T 220 50 
                   T 300 35 
                   T 380 25 
                   T 450 15 
                   T 490 10 
                   L 490 110 Z" 
                fill="url(#areaGrad)" 
              />

              {/* Stroke Wave Line */}
              <path 
                d="M 10 110 
                   Q 50 90, 80 85 
                   T 150 70 
                   T 220 50 
                   T 300 35 
                   T 380 25 
                   T 450 15 
                   T 490 10" 
                fill="none" 
                stroke="#15803D" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
              />

              {/* Hotpoints */}
              <circle cx="10" cy="110" r="4.5" fill="#FFFFFF" stroke="#15803D" strokeWidth="2" />
              <circle cx="150" cy="70" r="4.5" fill="#FFFFFF" stroke="#15803D" strokeWidth="2" />
              <circle cx="300" cy="35" r="4.5" fill="#FFFFFF" stroke="#15803D" strokeWidth="2" />
              <circle cx="490" cy="10" r="4.5" fill="#FFFFFF" stroke="#15803D" strokeWidth="2" />
            </svg>
          </div>

          {/* Timeline labels beneath */}
          <div className="flex justify-between text-xxs font-sans font-semibold text-slate-500 px-1">
            <span>Jan 2024 (1,2rb)</span>
            <span>Jan 2025 (6,2rb)</span>
            <span>Mei 2026 (10rb)</span>
          </div>

        </div>

        {/* CHART 4: DEMOGRAPHICS AGE BRACKETS (6 Cols of 12) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-950">Demografi Rentang Usia Kader</h3>
            <p className="text-xs text-slate-500">Breakdown proporsi kelompok pemuda yang membuktikan dominasi rentang umur produktif.</p>
          </div>

          <div className="space-y-4">
            {ageDemographics.map((age, idx) => (
              <div key={idx} className="space-y-1.5" id={`age-bar-${idx}`}>
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-slate-700 font-medium">{age.range}</span>
                  <span className="font-bold text-slate-950">{age.percentage}% ({age.count} Kader)</span>
                </div>
                {/* Horizontal Bar container */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                  <div 
                    style={{ width: `${age.percentage}%` }} 
                    className={`h-full ${age.color} rounded-full transition-all duration-1000 ease-out`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* TABLE SECTION: STATUS AKTIVITAS DPC SE-PAPUA BARAT */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden" id="dpc-activities-table">
        
        {/* Table header filter cluster */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-sans font-bold text-lg text-slate-950">Keaktifan Pengurus DPC Kabupaten/Kota</h3>
            <p className="text-xs text-slate-500 mt-0.5">Daftar lengkap konsolidasi struktural kepengurusan di tingkat daerah (DPC).</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-sans font-semibold text-slate-600 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              Saring DPC:
            </span>
            <select
              id="dpc-table-filter"
              value={selectedDpcFilter}
              onChange={(e) => setSelectedDpcFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-sans text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#15803D]"
            >
              <option value="Semua">Tampilkan Semua DPC</option>
              {dpcList.map(dpc => (
                <option key={dpc.id} value={dpc.name}>{dpc.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Nama DPC</th>
                <th className="px-6 py-4">Ketua DPC</th>
                <th className="px-6 py-4 text-center">Jumlah Kader</th>
                <th className="px-6 py-4 text-center">Verifikasi Pending</th>
                <th className="px-6 py-4">Status Pengurus</th>
                <th className="px-6 py-4 text-center">Tingkat Aktivitas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-sm text-slate-700">
              {filteredDpcList.map((dpc) => (
                <tr key={dpc.id} className="hover:bg-slate-50/60 transition-colors" id={`table-row-${dpc.id}`}>
                  
                  {/* Name */}
                  <td className="px-6 py-4 font-bold text-slate-950">
                    DPC Garda Bangsa {dpc.name}
                  </td>

                  {/* Chairman */}
                  <td className="px-6 py-4 font-medium text-slate-800">
                    {dpc.chairman}
                  </td>

                  {/* Total Members */}
                  <td className="px-6 py-4 text-center font-mono font-bold text-slate-900">
                    {dpc.membersCount.toLocaleString('id-ID')}
                  </td>

                  {/* Pending */}
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center font-sans font-bold text-xs w-6 h-6 rounded-full ${
                      dpc.pendingCount > 0 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-400'
                    }`}>
                      {dpc.pendingCount}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      dpc.status === 'Aktif' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                      dpc.status === 'Konsolidasi' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        dpc.status === 'Aktif' ? 'bg-emerald-500 animate-pulse' :
                        dpc.status === 'Konsolidasi' ? 'bg-amber-500' : 'bg-slate-400'
                      }`} />
                      {dpc.status}
                    </span>
                  </td>

                  {/* Activity Level ProgressBar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-center">
                      <span className="font-mono text-xs font-bold w-8 text-right">{dpc.activityLevel}%</span>
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/30">
                        <div 
                          style={{ width: `${dpc.activityLevel}%` }} 
                          className={`h-full rounded-full ${
                            dpc.activityLevel >= 85 ? 'bg-emerald-500' :
                            dpc.activityLevel >= 65 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
