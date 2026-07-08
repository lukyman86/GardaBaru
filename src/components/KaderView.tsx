import React, { useState } from 'react';
import { Search, UserPlus, CheckCircle, XCircle, Printer, Filter, ShieldCheck, ChevronLeft, ChevronRight, Download, Upload, CreditCard, Key, AlertTriangle } from 'lucide-react';
import { Kader, DpcStatus } from '../types';
import { ASSETS } from '../data';
import { OptimizedImage } from './OptimizedImage';

interface KaderViewProps {
  kaderList: Kader[];
  dpcList: DpcStatus[];
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
  onAddKader: (kader: Omit<Kader, 'id' | 'joinedDate'>) => void;
}

export const KaderView: React.FC<KaderViewProps> = ({ kaderList, dpcList, onVerify, onReject, onAddKader }) => {
  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDpc, setSelectedDpc] = useState('Semua');
  const [selectedStatus, setSelectedStatus] = useState('Semua');
  const [selectedGender, setSelectedGender] = useState('Semua');

  // Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    email: '',
    phone: '',
    dpc: 'Manokwari',
    address: '',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    age: 25
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // KTA Modal State
  const [activeKtaKader, setActiveKtaKader] = useState<Kader | null>(null);
  const [isPrintingKta, setIsPrintingKta] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Pagination State (5 items per page for clean view)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Filter Logic
  const filteredKader = kaderList.filter(kader => {
    const matchesSearch = kader.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          kader.nik.includes(searchTerm) || 
                          kader.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDpc = selectedDpc === 'Semua' || kader.dpc === selectedDpc;
    const matchesStatus = selectedStatus === 'Semua' || kader.status === selectedStatus;
    const matchesGender = selectedGender === 'Semua' || kader.gender === selectedGender;
    return matchesSearch && matchesDpc && matchesStatus && matchesGender;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredKader.length / itemsPerPage);
  const paginatedKader = filteredKader.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 2. Add Kader Form Submission Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Nama lengkap wajib diisi";
    if (formData.nik.length !== 16 || !/^\d+$/.test(formData.nik)) errors.nik = "NIK harus terdiri dari 16 digit angka";
    if (!formData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = "Format email tidak valid";
    if (!formData.phone.match(/^\d{10,13}$/)) errors.phone = "Nomor telepon harus 10-13 digit angka";
    if (!formData.address.trim()) errors.address = "Alamat lengkap wajib diisi";
    if (formData.age < 17 || formData.age > 40) errors.age = "Usia kader Garda Bangsa harus di rentang 17-40 tahun";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    onAddKader({
      name: formData.name,
      nik: formData.nik,
      email: formData.email,
      phone: formData.phone,
      dpc: formData.dpc,
      address: formData.address,
      gender: formData.gender,
      age: formData.age,
      status: 'Pending',
      isVerified: false
    });

    // Reset Form
    setFormData({
      name: '',
      nik: '',
      email: '',
      phone: '',
      dpc: 'Manokwari',
      address: '',
      gender: 'Laki-laki',
      age: 25
    });
    setFormErrors({});
    setShowAddForm(false);
    triggerToast("Data kader berhasil diajukan! Status awal adalah Pending menunggu verifikasi admin.");
  };

  // 3. Print KTA Simulator
  const triggerKtaPrint = () => {
    setIsPrintingKta(true);
    setTimeout(() => {
      setIsPrintingKta(false);
      triggerToast(`Kartu Tanda Anggota (KTA) atas nama ${activeKtaKader?.name} berhasil dikirim ke printer!`);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-20">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-sans text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-extrabold text-3xl text-slate-950 tracking-tight flex items-center gap-2">
            Manajemen Basis Data Anggota <ShieldCheck className="w-6.5 h-6.5 text-[#15803D]" />
          </h1>
          <p className="font-sans text-slate-500 text-sm mt-1">Lakukan verifikasi berkas NIK kader baru, kelola status keaktifan, dan cetak Kartu Tanda Anggota (KTA) digital resmi.</p>
        </div>

        <div>
          <button
            id="btn-toggle-add-form"
            onClick={() => setShowAddForm(!showAddForm)}
            className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-[#0E4A28] hover:from-emerald-500 text-white font-sans font-bold text-sm py-2.5 px-5 rounded-lg shadow-md border border-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>{showAddForm ? 'TUTUP FORM' : 'DAFTAR KADER BARU'}</span>
          </button>
        </div>
      </div>

      {/* ADD MEMBER FORM DRAWER/CARD */}
      {showAddForm && (
        <div id="add-kader-form-container" className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-6 md:p-8 animate-fade-in space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <UserPlus className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="font-sans font-bold text-lg text-slate-950">Formulir Pendaftaran Kader Baru</h3>
              <p className="text-xs text-slate-500">Silakan isi formulir di bawah ini dengan valid sesuai kartu identitas KTP yang berlaku.</p>
            </div>
          </div>

          <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Nama Lengkap Sesuai KTP</label>
              <input 
                type="text" 
                id="form-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="cth: Marten Mandacan"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.name && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.name}</p>}
            </div>

            {/* NIK */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Nomor Induk Kependudukan (NIK)</label>
              <input 
                type="text" 
                id="form-nik"
                maxLength={16}
                value={formData.nik}
                onChange={(e) => setFormData({...formData, nik: e.target.value})}
                placeholder="cth: 9201021503950002"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono"
              />
              {formErrors.nik && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.nik}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Alamat Email</label>
              <input 
                type="email" 
                id="form-email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="cth: marten.m@garda.or.id"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.email && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Nomor Telepon/WA</label>
              <input 
                type="text" 
                id="form-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="cth: 081244558811"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.phone && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.phone}</p>}
            </div>

            {/* DPC */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Kabupaten/Kota DPC Domisili</label>
              <select 
                id="form-dpc"
                value={formData.dpc}
                onChange={(e) => setFormData({...formData, dpc: e.target.value})}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
              >
                {dpcList.map(dpc => (
                  <option key={dpc.id} value={dpc.name}>DPC {dpc.name}</option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Alamat Rumah Lengkap</label>
              <input 
                type="text" 
                id="form-address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="cth: Jl. Merdeka No. 12, Sanggeng, Manokwari"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.address && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.address}</p>}
            </div>

            {/* Gender */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Jenis Kelamin</label>
              <div className="flex items-center gap-4 pt-1.5">
                <label className="flex items-center gap-2 text-sm font-sans font-medium text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    checked={formData.gender === 'Laki-laki'} 
                    onChange={() => setFormData({...formData, gender: 'Laki-laki'})}
                    className="text-emerald-600 focus:ring-emerald-600"
                  />
                  <span>Laki-laki</span>
                </label>
                <label className="flex items-center gap-2 text-sm font-sans font-medium text-slate-700 cursor-pointer">
                  <input 
                    type="radio" 
                    name="gender" 
                    checked={formData.gender === 'Perempuan'} 
                    onChange={() => setFormData({...formData, gender: 'Perempuan'})}
                    className="text-emerald-600 focus:ring-emerald-600"
                  />
                  <span>Perempuan</span>
                </label>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-bold text-slate-700 uppercase tracking-wide">Usia (Tahun)</label>
              <input 
                type="number" 
                id="form-age"
                min={17}
                max={40}
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value) || 25})}
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              {formErrors.age && <p className="text-xs text-red-500 font-sans font-semibold">{formErrors.age}</p>}
            </div>

            {/* Form actions */}
            <div className="md:col-span-2 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-sans font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                BATAL
              </button>
              <button
                type="submit"
                id="btn-submit-kader"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-bold text-xs py-2 px-6 rounded-lg shadow cursor-pointer transition-all"
              >
                KIRIM PENGAJUAN
              </button>
            </div>

          </form>
        </div>
      )}

      {/* FILTER & SEARCH CONTROL CLUSTER */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              id="kader-search-input"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Cari anggota berdasarkan Nama, ID, atau 16-digit NIK..."
              className="w-full bg-slate-50 hover:bg-slate-100/60 transition-colors border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          {/* Quick Stats Summary labels */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans font-bold text-slate-600">
            <span className="bg-slate-100 border border-slate-200/60 px-3 py-1.5 rounded-lg">
              Total Hasil: {filteredKader.length} Orang
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/50 px-3 py-1.5 rounded-lg">
              Aktif: {filteredKader.filter(k => k.status === 'Aktif').length}
            </span>
            <span className="bg-amber-50 text-amber-800 border border-amber-200/50 px-3 py-1.5 rounded-lg">
              Pending: {filteredKader.filter(k => k.status === 'Pending').length}
            </span>
          </div>

        </div>

        {/* Dropdown Select Filters row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
          
          {/* DPC Filter */}
          <div className="space-y-1">
            <span className="text-xxs font-sans font-bold text-slate-500 uppercase tracking-wider">Saring Sesuai DPC</span>
            <select
              id="filter-dpc-select"
              value={selectedDpc}
              onChange={(e) => { setSelectedDpc(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-sans text-slate-700 focus:outline-none"
            >
              <option value="Semua">Semua Kabupaten/Kota</option>
              {dpcList.map(d => (
                <option key={d.id} value={d.name}>DPC {d.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="space-y-1">
            <span className="text-xxs font-sans font-bold text-slate-500 uppercase tracking-wider">Status Verifikasi</span>
            <select
              id="filter-status-select"
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-sans text-slate-700 focus:outline-none"
            >
              <option value="Semua">Semua Status</option>
              <option value="Aktif">Terverifikasi (Aktif)</option>
              <option value="Pending">Menunggu Verifikasi (Pending)</option>
              <option value="Ditolak">Pengajuan Ditolak</option>
            </select>
          </div>

          {/* Gender Filter */}
          <div className="space-y-1">
            <span className="text-xxs font-sans font-bold text-slate-500 uppercase tracking-wider">Saring Jenis Kelamin</span>
            <select
              id="filter-gender-select"
              value={selectedGender}
              onChange={(e) => { setSelectedGender(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-sans text-slate-700 focus:outline-none"
            >
              <option value="Semua">Semua Jenis Kelamin</option>
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </select>
          </div>

        </div>

      </div>

      {/* DATABASE KADER TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 font-sans text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">ID & Nama Kader</th>
                <th className="px-6 py-4">NIK (KTP)</th>
                <th className="px-6 py-4">DPC Wilayah</th>
                <th className="px-6 py-4 text-center">Profil</th>
                <th className="px-6 py-4">Kontak</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans text-sm text-slate-700">
              {paginatedKader.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-sans italic">
                    Tidak ditemukan data kader yang sesuai dengan kriteria penyaringan Anda.
                  </td>
                </tr>
              ) : (
                paginatedKader.map((kader) => (
                  <tr key={kader.id} className="hover:bg-slate-50/50 transition-colors" id={`kader-row-${kader.id}`}>
                    
                    {/* ID & Name */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className="font-mono text-xxs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/40">
                          {kader.id}
                        </span>
                        <h4 className="font-sans font-bold text-slate-950 text-base pt-1">
                          {kader.name}
                        </h4>
                        <p className="text-xxs text-slate-400">Terdaftar: {kader.joinedDate}</p>
                      </div>
                    </td>

                    {/* NIK */}
                    <td className="px-6 py-4 font-mono font-medium text-slate-800">
                      {kader.nik}
                    </td>

                    {/* DPC */}
                    <td className="px-6 py-4 font-sans font-semibold text-slate-900">
                      DPC {kader.dpc}
                    </td>

                    {/* Gender & Age */}
                    <td className="px-6 py-4 text-center">
                      <div className="text-xs space-y-0.5">
                        <p className="font-semibold text-slate-800">{kader.gender}</p>
                        <p className="text-slate-400">{kader.age} Tahun</p>
                      </div>
                    </td>

                    {/* Phone / Email */}
                    <td className="px-6 py-4">
                      <div className="text-xs space-y-0.5">
                        <p className="font-medium text-slate-800">{kader.phone}</p>
                        <p className="text-slate-400 font-mono text-[11px] truncate max-w-[150px]" title={kader.email}>{kader.email}</p>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        kader.status === 'Aktif' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        kader.status === 'Pending' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                        'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          kader.status === 'Aktif' ? 'bg-emerald-500 animate-pulse' :
                          kader.status === 'Pending' ? 'bg-amber-500 animate-bounce' : 'bg-red-500'
                        }`} />
                        {kader.status}
                      </span>
                    </td>

                    {/* ACTIONS ROW */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* KTA Print Trigger */}
                        <button
                          id={`btn-cta-kta-${kader.id}`}
                          onClick={() => setActiveKtaKader(kader)}
                          disabled={kader.status !== 'Aktif'}
                          title="Tampilkan & Cetak KTA Digital"
                          className={`p-2 rounded-lg border transition-all cursor-pointer ${
                            kader.status === 'Aktif'
                              ? 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800 hover:border-slate-300'
                              : 'bg-slate-100 border-slate-100 text-slate-300 cursor-not-allowed'
                          }`}
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>

                        {/* Verify Button */}
                        {kader.status === 'Pending' && (
                          <>
                            <button
                              id={`btn-verify-${kader.id}`}
                              onClick={() => onVerify(kader.id)}
                              title="Setujui Verifikasi Berkas"
                              className="p-2 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-800 rounded-lg cursor-pointer transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              id={`btn-reject-${kader.id}`}
                              onClick={() => onReject(kader.id)}
                              title="Tolak Verifikasi"
                              className="p-2 bg-red-50 border border-red-200 hover:bg-red-100 text-red-800 rounded-lg cursor-pointer transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {/* Non-Pending details visualizer */}
                        {kader.status !== 'Pending' && (
                          <span className="text-xxs font-mono text-slate-400 font-semibold uppercase italic bg-slate-50 px-2 py-1 rounded">
                            Selesai diproses
                          </span>
                        )}

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION NAVIGATION FOOTER */}
        {totalPages > 1 && (
          <div className="p-5 border-t border-slate-100 flex items-center justify-between font-sans">
            <span className="text-xs text-slate-500 font-medium">
              Menampilkan Halaman <span className="font-bold text-slate-800">{currentPage}</span> dari <span className="font-bold text-slate-800">{totalPages}</span> ({filteredKader.length} Total Kader)
            </span>

            <div className="flex items-center gap-2">
              <button
                id="btn-page-prev"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                  currentPage === 1 ? 'border-slate-100 text-slate-300' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {/* Individual page chips */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
                    currentPage === pageNum 
                      ? 'bg-[#0E4A28] text-white' 
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                id="btn-page-next"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                  currentPage === totalPages ? 'border-slate-100 text-slate-300' : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* KTA DIGITAL CARD MODAL PREVIEW */}
      {activeKtaKader && (
        <div id="kta-preview-modal" className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-scale-up">
            
            {/* Header detail */}
            <div className="bg-gradient-to-r from-[#0E4A28] to-[#15803D] text-white p-5 flex items-center justify-between border-b border-yellow-500/15">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-yellow-400" />
                <h3 className="font-sans font-bold text-base">Kartu Tanda Anggota (KTA) Digital</h3>
              </div>
              <button 
                onClick={() => setActiveKtaKader(null)}
                className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-xs transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* CARD FRONT DESIGN */}
            <div className="p-6 bg-slate-50 flex flex-col items-center border-b border-slate-100">
              
              <div id="kta-card-physical" className="relative w-full max-w-[380px] h-[220px] rounded-2xl overflow-hidden text-white shadow-lg border border-yellow-400/20">
                {/* Background template design */}
                <div className="absolute inset-0 bg-[#0E4A28]">
                  {/* Watermark Logo */}
                  <OptimizedImage 
                    src={ASSETS.CIRCULAR_LOGO} 
                    widthSize={300}
                    alt="Logo Watermark" 
                    className="absolute right-[-30px] bottom-[-20px] w-64 h-64 opacity-10 pointer-events-none bg-transparent"
                  />
                  {/* Gold abstract corner wave */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-yellow-400/20 to-transparent rounded-bl-full" />
                </div>

                {/* Card front grid content */}
                <div className="relative h-full p-4 flex flex-col justify-between z-10">
                  
                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-white/15 pb-2">
                    <div className="flex items-center gap-2">
                      <OptimizedImage 
                        src={ASSETS.LOGO} 
                        widthSize={96}
                        alt="Logo Mini" 
                        className="w-10 h-10 bg-white/10 rounded-full p-0.5"
                      />
                      <div>
                        <h4 className="font-sans font-extrabold text-[10px] tracking-wider text-yellow-300 leading-none">GARDA BANGSA</h4>
                        <p className="font-mono text-[7px] text-white tracking-widest mt-0.5">DKW PAPUA BARAT</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[8px] font-extrabold text-yellow-400">KARTU TANDA ANGGOTA</p>
                      <p className="font-sans text-[6px] tracking-widest text-slate-300">INDONESIAN YOUTH MOVEMENT</p>
                    </div>
                  </div>

                  {/* Body Content row */}
                  <div className="flex gap-3.5 my-2">
                    {/* Member photo container */}
                    <div className="w-16 h-20 bg-slate-100 rounded border border-white/20 flex items-center justify-center overflow-hidden">
                      <OptimizedImage 
                        src={ASSETS.ADMIN_PHOTO} 
                        widthSize={150}
                        alt="Foto Profil KTA" 
                        className="w-full h-full"
                      />
                    </div>

                    {/* Member specs */}
                    <div className="flex-1 space-y-1 text-left">
                      <div className="space-y-0.5">
                        <span className="font-sans text-[7px] font-bold text-yellow-400 uppercase tracking-widest">ID ANGGOTA</span>
                        <p className="font-mono text-xxs font-extrabold tracking-wider leading-none">{activeKtaKader.id}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-sans text-[7px] font-bold text-yellow-400 uppercase tracking-widest">NAMA LENGKAP</span>
                        <p className="font-sans text-xs font-bold leading-tight uppercase truncate max-w-[180px]">{activeKtaKader.name}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-sans text-[7px] font-bold text-yellow-400 uppercase tracking-widest">NIK KTP</span>
                        <p className="font-mono text-[10px] leading-none">{activeKtaKader.nik}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="font-sans text-[7px] font-bold text-yellow-400 uppercase tracking-widest">DPC DOMISILI</span>
                        <p className="font-sans text-[9px] font-semibold leading-none">DPC KAB. {activeKtaKader.dpc.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Footer Bar */}
                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[6px] font-mono text-slate-300">
                    <span>Masa Berlaku: Seumur Hidup</span>
                    <span className="text-[7px] text-yellow-300 font-bold">TERVERIFIKASI SISTEM DIGITAL</span>
                  </div>

                </div>

              </div>

              <p className="text-xxs font-sans text-slate-400 mt-3 text-center italic">Kartu ini diterbitkan secara sah oleh DKW Garda Bangsa Provinsi Papua Barat dan dapat digunakan sebagai tanda pengenal keanggotaan formal.</p>
            </div>

            {/* Signature & Barcode representation */}
            <div className="p-6 space-y-6">
              
              {/* Metadata rows */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans text-slate-700">
                <div className="space-y-1">
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Tanda Tangan Ketua Umum</p>
                  <p className="font-bold text-slate-900 pt-3 border-b border-slate-200">Fadhlurrahman Anshari, S.Pd, S.H</p>
                  <p className="text-xxs text-slate-400">Ketua Umum DKW Papua Barat</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px] text-right">Sertifikat Barcode</p>
                  <div className="inline-block bg-slate-100 p-1.5 rounded border border-slate-200 mt-1">
                    {/* Mock barcode */}
                    <div className="w-24 h-6 bg-gradient-to-r from-slate-950 via-white to-slate-950 flex items-center justify-between px-1 pointer-events-none">
                      <div className="w-1 h-full bg-slate-950" />
                      <div className="w-0.5 h-full bg-slate-950" />
                      <div className="w-1.5 h-full bg-slate-950" />
                      <div className="w-2 h-full bg-slate-950" />
                      <div className="w-0.5 h-full bg-slate-950" />
                      <div className="w-1 h-full bg-slate-950" />
                    </div>
                  </div>
                  <p className="text-[9px] font-mono text-slate-400 text-right mt-0.5">SECURE-ID-{activeKtaKader.id}</p>
                </div>
              </div>

              {/* Action trigger */}
              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button
                  onClick={() => setActiveKtaKader(null)}
                  className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-sans font-bold text-xs py-2.5 rounded-lg text-center cursor-pointer transition-colors"
                >
                  TUTUP PRATINJAU
                </button>
                <button
                  onClick={triggerKtaPrint}
                  disabled={isPrintingKta}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-[#0E4A28] hover:from-emerald-500 text-white font-sans font-bold text-xs py-2.5 rounded-lg shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isPrintingKta ? 'MENCETAK KARTU...' : 'CETAK SEKARANG'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* VERIFICATION GUIDELINES ACCORDION */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4" id="guidelines-accordion">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-none" />
          <h3 className="font-sans font-bold text-base text-slate-950">Panduan Verifikasi Berkas Kader (Standard Operating Procedure)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-sm text-slate-600 leading-relaxed">
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-[#0E4A28] text-white rounded-full flex items-center justify-center font-mono text-xs font-bold">1</span>
              Validasi NIK KTP
            </h4>
            <p className="text-xs">Pastikan nomor NIK berjumlah tepat 16 digit dan berawalan kode administrasi provinsi Papua Barat (92xx). Periksa kesesuaian format angka.</p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-[#0E4A28] text-white rounded-full flex items-center justify-center font-mono text-xs font-bold">2</span>
              Verifikasi Usia Pemuda
            </h4>
            <p className="text-xs">Merujuk pada Undang-Undang Kepemudaan, kader Garda Bangsa wajib berusia antara 17 hingga maksimal 40 tahun pada saat tanggal pengajuan.</p>
          </div>
          <div className="space-y-1.5">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <span className="w-5 h-5 bg-[#0E4A28] text-white rounded-full flex items-center justify-center font-mono text-xs font-bold">3</span>
              Konfirmasi Kepengurusan DPC
            </h4>
            <p className="text-xs">Pastikan koordinasi DPC di wilayah terkait aktif sehingga kader yang baru bergabung bisa segera didaftarkan ke kelompok pembinaan ranting.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
