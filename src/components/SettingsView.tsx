import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Palette, 
  Image as ImageIcon, 
  Layout, 
  Check, 
  RefreshCw, 
  Save, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Type, 
  Info,
  History,
  Upload,
  Trash2
} from 'lucide-react';
import { WebsiteSettings } from '../types';
import { ASSETS } from '../data';

interface SettingsViewProps {
  settings: WebsiteSettings;
  onSaveSettings: (newSettings: WebsiteSettings) => Promise<void>;
}

// Preset Themes Definitions
const PRESET_THEMES = [
  {
    id: 'emerald',
    name: 'Smaragd / Emerald',
    description: 'Hijau Tua Elegansi Garda Bangsa (Default)',
    primary: '#022C16',
    secondary: '#FFD15C',
    accent: '#10B981',
    bgBadge: 'bg-emerald-500'
  },
  {
    id: 'sapphire',
    name: 'Sapphire / Ocean',
    description: 'Biru Modern & Kredibel',
    primary: '#0F172A', // Navy/Slate dark
    secondary: '#38BDF8', // Sky Blue
    accent: '#0284C7',
    bgBadge: 'bg-blue-600'
  },
  {
    id: 'amber',
    name: 'Amber / Gold',
    description: 'Mewah, Hangat & Kreatif',
    primary: '#78350F', // Dark Amber
    secondary: '#FBBF24', // Yellow Gold
    accent: '#D97706',
    bgBadge: 'bg-amber-500'
  },
  {
    id: 'rose',
    name: 'Crimson / Rose',
    description: 'Merah Berani, Tegas & Berjiwa Muda',
    primary: '#881337', // Dark Rose
    secondary: '#FDA4AF', // Light Rose
    accent: '#E11D48',
    bgBadge: 'bg-rose-500'
  },
  {
    id: 'slate',
    name: 'Charcoal / Slate',
    description: 'Elegansi Monokrom & Minimalis',
    primary: '#1E293B', // Slate Dark
    secondary: '#94A3B8', // Slate Silver
    accent: '#475569',
    bgBadge: 'bg-slate-700'
  },
  {
    id: 'gold',
    name: 'Nationalist Gold',
    description: 'Eksklusif Hijau & Emas Solid',
    primary: '#0B2E13', // Deep Forest
    secondary: '#D4AF37', // Gold Metallic
    accent: '#FFC107',
    bgBadge: 'bg-yellow-600'
  }
];

// Predefined Logo Options
const PREDEFINED_LOGOS = [
  {
    name: 'Hijau Tua Transparan (Modern - PNG)',
    url: '/src/assets/images/garda_bangsa_logo_transparent_1783525240906.jpg'
  },
  {
    name: 'Logo Bundar Garda Bangsa (Original)',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBycuV8po0TYdltTHGHClxvbwdBu7ogSL8siHOawHG18LCI0vCHvujvWKySxUxIT7CTXvNA63ehtOSPypxV2rba9PxmTLiIPzOj2VBiNnZ8VIN2mq6b7gd7CsZ39FwOxElImC9Fezdta7ITSXoLYdY12X2-ZESQb_J7lOxqpntItipVnFLqqTIS4pg6L8alK_gJTfz_HCU7fEIjllCgFi8G30QSpKhqIiWSU-kDp-fJS_lEYJh9Qf38m-KIh8-5PIfoC9JHeQVrmQ'
  },
  {
    name: 'Logo Awal Website',
    url: 'https://lh3.googleusercontent.com/aida/AP1WRLthVw3qtXoL842ABlhgxI_tGTsyAMvkVO47eFyNT6vM7Nd5YawEXfukQyf1Bh8Uxa_HNqlhkyRIGzw80fUgut_dpskcI46qlH4k9itgO3UjeFigR3KLUp8O-flpoPhjWv3DWuPDIj8O2xtwHAhZYTFMNnUe0bJuDhVuWdO0tODUBSgUhjiVw5RmVdhlAV6WJJrum1fZ-LB6XhIOSBpvVhMnBpGgWF07mB3jgKMAmH7RzdFPuDK9d-8X'
  }
];

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSaveSettings }) => {
  const [logoUrl, setLogoUrl] = useState(settings.logoUrl);
  const [primaryColor, setPrimaryColor] = useState(settings.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(settings.secondaryColor);
  const [themeName, setThemeName] = useState(settings.themeName);
  const [templateStyle, setTemplateStyle] = useState(settings.templateStyle || 'elegant');
  const [customTitle, setCustomTitle] = useState(settings.customTitle || 'DKW Garda Bangsa Papua Barat');
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  // File upload state
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setUploadError(null);
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar (PNG, JPG, SVG, dll).');
      return;
    }
    
    // Limit size to 2MB to keep Firestore document size within limits
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Ukuran file terlalu besar. Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setLogoUrl(e.target.result);
        setMessage({ type: 'success', text: 'Logo baru berhasil diunggah secara lokal! Pastikan klik "Terapkan & Simpan Perubahan" di bawah untuk menyimpannya ke database.' });
      } else {
        setUploadError('Gagal memproses file gambar.');
      }
    };
    reader.onerror = () => {
      setUploadError('Terjadi kesalahan saat membaca file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    // Sync local state when settings change from props
    setLogoUrl(settings.logoUrl);
    setPrimaryColor(settings.primaryColor);
    setSecondaryColor(settings.secondaryColor);
    setThemeName(settings.themeName);
    setTemplateStyle(settings.templateStyle || 'elegant');
    setCustomTitle(settings.customTitle || 'DKW Garda Bangsa Papua Barat');
  }, [settings]);

  const selectThemePreset = (preset: typeof PRESET_THEMES[0]) => {
    setThemeName(preset.id as any);
    setPrimaryColor(preset.primary);
    setSecondaryColor(preset.secondary);
  };

  const resetToDefault = () => {
    setLogoUrl('/src/assets/images/garda_bangsa_logo_transparent_1783525240906.jpg');
    setPrimaryColor('#022C16');
    setSecondaryColor('#FFD15C');
    setThemeName('emerald');
    setTemplateStyle('elegant');
    setCustomTitle('DKW Garda Bangsa Papua Barat');
    setMessage({ type: 'success', text: 'Setelan diatur ulang ke default. Silakan klik Simpan untuk menerapkan.' });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      const updated: WebsiteSettings = {
        ...settings,
        logoUrl: logoUrl.trim(),
        primaryColor,
        secondaryColor,
        themeName: themeName as any,
        templateStyle: templateStyle as any,
        customTitle: customTitle.trim(),
        updatedAt: new Date().toISOString(),
        updatedBy: 'Admin'
      };

      await onSaveSettings(updated);
      setMessage({ type: 'success', text: 'Konfigurasi website berhasil disimpan dan disematkan otomatis ke seluruh sistem!' });
    } catch (err: any) {
      console.error(err);
      setMessage({ type: 'error', text: 'Gagal menyimpan konfigurasi: ' + (err.message || 'Error internal') });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 font-sans space-y-8 animate-fade-in">
      
      {/* Settings Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
            <Settings className="w-5.5 h-5.5 text-primary" />
            <span>Kustomisasi & Pengaturan Website</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Sesuaikan branding, warna, logo dan tema website DKW Garda Bangsa Papua Barat secara real-time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetToDefault}
            className="border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      {/* Save Notification Alerts */}
      {message && (
        <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
          message.type === 'success' 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-900' 
            : 'bg-rose-50 border-rose-100 text-rose-900'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4.5 h-4.5 text-rose-500 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p className="font-bold">{message.type === 'success' ? 'Berhasil Disimpan' : 'Terjadi Kendala'}</p>
            <p className="mt-0.5">{message.text}</p>
          </div>
        </div>
      )}

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Form configuration (7 cols) */}
        <form onSubmit={handleSave} className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Brand & Logo */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Type className="w-4 h-4 text-slate-500" />
              <span>Identitas & Logo Website</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Nama / Judul Organisasi</label>
              <input
                type="text"
                required
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="Contoh: DKW Garda Bangsa Papua Barat"
                className="w-full px-3.5 py-2.5 bg-slate-50 text-slate-950 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white text-xs font-semibold rounded-xl transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Logo URL Website (PNG / Transparent)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="URL gambar logo"
                  className="flex-grow px-3.5 py-2.5 bg-slate-50 text-slate-950 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white text-xs font-semibold rounded-xl transition-all outline-none font-mono"
                />
              </div>

              {/* Local File Upload Section */}
              <div className="mt-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Atau Unggah Logo Kustom Anda:</span>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-5 transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
                    isDragging 
                      ? 'border-emerald-500 bg-emerald-50/20' 
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                  }`}
                  onClick={() => document.getElementById('logo-file-input')?.click()}
                >
                  <input
                    id="logo-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {logoUrl.startsWith('data:image/') ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 bg-white rounded-xl p-2 border border-slate-200/60 shadow-sm flex items-center justify-center relative group">
                        <img src={logoUrl} alt="Uploaded Logo" className="w-full h-full object-contain filter drop-shadow-sm" />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLogoUrl('/src/assets/images/garda_bangsa_logo_transparent_1783525240906.jpg');
                          }}
                          className="absolute -top-1.5 -right-1.5 bg-rose-500 hover:bg-rose-600 text-white p-1 rounded-full shadow-md transition-colors"
                          title="Hapus logo kustom"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xxs text-emerald-700 font-bold">Logo Kustom Berhasil Dimuat</p>
                      <p className="text-[10px] text-slate-400">Klik atau seret file lain untuk mengganti</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <p className="text-xs font-bold text-slate-700">Pilih atau seret berkas logo ke sini</p>
                      <p className="text-[10px] text-slate-400">Mendukung PNG, JPG, JPEG, SVG (Maks. 2MB)</p>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <p className="text-[11px] text-rose-600 font-bold mt-1.5 flex items-center gap-1 justify-center">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{uploadError}</span>
                  </p>
                )}
              </div>

              {/* Predefined Logos Cluster */}
              <div className="mt-2.5 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gunakan Logo Rekomendasi:</span>
                <div className="grid grid-cols-1 gap-2">
                  {PREDEFINED_LOGOS.map((logo, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setLogoUrl(logo.url)}
                      className={`text-left p-2 border rounded-xl text-xxs font-medium flex items-center gap-2.5 transition-colors cursor-pointer ${
                        logoUrl === logo.url 
                          ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 font-bold' 
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                      }`}
                    >
                      <div className="w-8 h-8 bg-slate-50 rounded-lg p-1 border border-slate-200/50 flex items-center justify-center">
                        <img src={logo.url} alt={logo.name} className="w-full h-full object-contain filter drop-shadow-sm" />
                      </div>
                      <span>{logo.name}</span>
                      {logoUrl === logo.url && <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Colors & Presets */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Palette className="w-4 h-4 text-slate-500" />
              <span>Tema Warna & Palet Visual</span>
            </h3>

            {/* Presets Grid */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Pilihan Palet Tema Instan:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRESET_THEMES.map((preset) => {
                  const isSelected = themeName === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => selectThemePreset(preset)}
                      className={`p-3 border rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected 
                          ? 'border-primary bg-primary/5 text-slate-900 ring-2 ring-primary/20' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      {/* Theme Indicator Badges */}
                      <div className="flex -space-x-1.5">
                        <span style={{ backgroundColor: preset.primary }} className="w-5 h-5 rounded-full border border-white shadow-sm" />
                        <span style={{ backgroundColor: preset.secondary }} className="w-5 h-5 rounded-full border border-white shadow-sm" />
                      </div>
                      
                      <div className="text-left">
                        <p className="text-xs font-bold text-slate-900">{preset.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{preset.description}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-primary ml-auto flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Palette Editor */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Warna Utama (Primary)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      setThemeName('custom' as any);
                    }}
                    className="w-10 h-10 border border-slate-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => {
                      setPrimaryColor(e.target.value);
                      setThemeName('custom' as any);
                    }}
                    className="flex-grow px-3 py-1.5 bg-white text-slate-950 border border-slate-200 rounded-lg text-xs font-mono font-bold uppercase focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">Warna Aksen (Secondary)</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                      setThemeName('custom' as any);
                    }}
                    className="w-10 h-10 border border-slate-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={secondaryColor}
                    onChange={(e) => {
                      setSecondaryColor(e.target.value);
                      setThemeName('custom' as any);
                    }}
                    className="flex-grow px-3 py-1.5 bg-white text-slate-950 border border-slate-200 rounded-lg text-xs font-mono font-bold uppercase focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Section 3: Layout Style */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
              <Layout className="w-4 h-4 text-slate-500" />
              <span>Gaya Desain & Template Tata Letak</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Pilih Gaya Template Otomatis</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'elegant', label: 'Classic Elegant', desc: 'Borders & bayangan lembut' },
                  { id: 'modern', label: 'Modern Minimalis', desc: 'Sederhana & bersahaja' },
                  { id: 'patriotic', label: 'Patriotic Bold', desc: 'Kontras & bersemangat' },
                  { id: 'tech', label: 'Technical Mono', desc: 'Futuristik & modern' }
                ].map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => setTemplateStyle(tpl.id as any)}
                    className={`p-2.5 border rounded-xl text-left transition-all cursor-pointer ${
                      templateStyle === tpl.id
                        ? 'border-emerald-500 bg-emerald-50/30 text-slate-900 font-bold'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    <p className="text-xs">{tpl.label}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 leading-none">{tpl.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit Action Block */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#022C16] hover:bg-[#074021] text-white py-2.5 px-6 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Terapkan & Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>

        </form>

        {/* Right column: Interactive Real-time Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Live Preview Tampilan</span>
              </h3>
              <span className="bg-emerald-100 text-[#0E4A28] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Real-time
              </span>
            </div>

            {/* Container Simulation Box */}
            <div className="border border-slate-200 rounded-2xl shadow-xl overflow-hidden bg-slate-100">
              
              {/* Header mockup */}
              <div className="bg-white border-b border-slate-150 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg p-0.5 flex items-center justify-center">
                    <img 
                      src={logoUrl || ASSETS.LOGO} 
                      alt="Logo Preview" 
                      className="w-full h-full object-contain filter drop-shadow-sm" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ASSETS.LOGO;
                      }}
                    />
                  </div>
                  <span className="text-xxs font-extrabold text-slate-900 truncate max-w-[120px]">
                    {customTitle}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                </div>
              </div>

              {/* Body mockup simulating selected theme */}
              <div className="p-5 space-y-4 bg-white min-h-[220px] flex flex-col justify-between">
                
                {/* Simulated Hero Banner */}
                <div 
                  style={{ backgroundColor: primaryColor }} 
                  className="rounded-xl p-4 text-white relative overflow-hidden flex flex-col justify-between h-[120px]"
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
                    <img src={ASSETS.LOGO} alt="BG" className="w-full h-full object-contain" />
                  </div>
                  
                  <div className="space-y-1">
                    <span 
                      style={{ backgroundColor: secondaryColor, color: primaryColor }} 
                      className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider"
                    >
                      Kaderisasi Garda Bangsa
                    </span>
                    <h4 className="text-xs font-bold leading-tight line-clamp-2 mt-1">
                      Membangun Kepemimpinan Pemuda Baru Papua Barat
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[8px] opacity-75">Terapkan Perubahan</span>
                    <button 
                      type="button"
                      style={{ backgroundColor: secondaryColor, color: primaryColor }}
                      className="text-[9px] font-extrabold px-3 py-1 rounded-lg shadow-sm hover:scale-105 transition-all"
                    >
                      Gabung Kader
                    </button>
                  </div>
                </div>

                {/* Subcontent preview */}
                <div className="grid grid-cols-2 gap-3 text-left">
                  <div className="border border-slate-150 p-3 rounded-xl bg-slate-50 space-y-1">
                    <div className="w-5 h-5 rounded bg-emerald-50 flex items-center justify-center">
                      <Palette style={{ color: primaryColor }} className="w-3 h-3" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-800">Warna Utama</p>
                    <div className="flex items-center gap-1.5">
                      <span style={{ backgroundColor: primaryColor }} className="w-2.5 h-2.5 rounded-full border border-slate-300" />
                      <span className="text-[10px] font-mono text-slate-500">{primaryColor}</span>
                    </div>
                  </div>

                  <div className="border border-slate-150 p-3 rounded-xl bg-slate-50 space-y-1">
                    <div className="w-5 h-5 rounded bg-yellow-50 flex items-center justify-center">
                      <Check style={{ color: secondaryColor }} className="w-3 h-3" />
                    </div>
                    <p className="text-[10px] font-bold text-slate-800">Aksen Warna</p>
                    <div className="flex items-center gap-1.5">
                      <span style={{ backgroundColor: secondaryColor }} className="w-2.5 h-2.5 rounded-full border border-slate-300" />
                      <span className="text-[10px] font-mono text-slate-500">{secondaryColor}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Status info */}
              <div className="bg-slate-50 border-t border-slate-150 p-3 flex items-center gap-2 text-xxs text-slate-500">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span>
                  Gaya tata letak: <strong className="capitalize">{templateStyle}</strong> dengan tema <strong className="capitalize">{themeName}</strong>.
                </span>
              </div>

            </div>

            {/* Explanatory Info Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-600 flex gap-2.5 leading-relaxed">
              <History className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Penghematan Setelan</p>
                <p className="text-[11px] mt-0.5">
                  Setiap kali Anda menekan "Simpan", konfigurasi warna dan logo akan disinkronisasikan ke Firebase Firestore. Pengunjung lain yang sedang membuka website ini akan melihat perubahan tersebut secara langsung!
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
