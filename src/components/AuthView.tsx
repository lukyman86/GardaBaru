import React, { useState } from 'react';
import { 
  auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  sendEmailVerification, 
  updateProfile,
  saveUserProfile
} from '../lib/firebase';
import { Mail, Lock, User, ArrowRight, ShieldCheck, HelpCircle, Loader2, AlertCircle, CheckCircle2, ChevronLeft, ShieldAlert } from 'lucide-react';
import { ASSETS } from '../data';
import { OptimizedImage } from './OptimizedImage';

interface AuthViewProps {
  setView: (view: string) => void;
  triggerToast: (msg: string) => void;
  onLocalLogin?: (user: any) => void;
}

type AuthMode = 'login' | 'register' | 'forgot';

export const AuthView: React.FC<AuthViewProps> = ({ setView, triggerToast, onLocalLogin }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  
  // Form values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  
  // Interaction states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const resetMessages = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleQuickAdminFill = () => {
    setEmail('okpipapuabarat@gmail.com');
    setPassword('admin123');
    resetMessages();
    triggerToast('Email & password admin berhasil dimasukkan.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    
    // Simple Validation
    if (!email.trim()) {
      setErrorMsg('Email wajib diisi.');
      return;
    }

    if (mode !== 'forgot' && !password) {
      setErrorMsg('Password wajib diisi.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        const targetEmail = email.trim();
        let loggedUser;
        
        try {
          // Attempt normal login
          const userCredential = await signInWithEmailAndPassword(auth, targetEmail, password);
          loggedUser = userCredential.user;
        } catch (signInErr: any) {
          // Fallback to local admin login if Firebase auth fails/is not configured
          if (targetEmail === 'okpipapuabarat@gmail.com' && password === 'admin123') {
            console.warn("Using local admin fallback because Firebase Auth returned error:", signInErr);
            const fallbackUser = {
              uid: 'admin-local-fallback',
              email: 'okpipapuabarat@gmail.com',
              displayName: 'Admin Garda Bangsa',
              emailVerified: true,
              photoURL: ''
            };
            localStorage.setItem('local_admin_user', JSON.stringify(fallbackUser));
            if (onLocalLogin) {
              onLocalLogin(fallbackUser);
            }
            triggerToast("Selamat datang kembali, Admin Garda Bangsa! (Sesi Lokal Aktif)");
            setView('home');
            setIsLoading(false);
            return;
          }

          // Special fallback: auto-register the admin account if it does not exist yet
          if (targetEmail === 'okpipapuabarat@gmail.com' && password === 'admin123' && 
              (signInErr.code === 'auth/user-not-found' || signInErr.code === 'auth/invalid-credential')) {
            try {
              const registerCred = await createUserWithEmailAndPassword(auth, targetEmail, password);
              loggedUser = registerCred.user;
              await updateProfile(loggedUser, {
                displayName: 'Admin Garda Bangsa'
              });
              // Send verified status or auto-verify email for pre-created admin
              if (!loggedUser.emailVerified) {
                // We proceed since it's the requested default admin
              }
            } catch (signUpErr: any) {
              console.error("Auto-register failed:", signUpErr);
              throw signInErr;
            }
          } else {
            throw signInErr;
          }
        }

        if (loggedUser) {
          await saveUserProfile(loggedUser);
          triggerToast(`Selamat datang kembali, ${loggedUser.displayName || 'Kader'}!`);
          setView('home');
        }
      } else if (mode === 'register') {
        if (!fullName.trim()) {
          setErrorMsg('Nama lengkap wajib diisi.');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setErrorMsg('Password minimal terdiri dari 6 karakter.');
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setErrorMsg('Konfirmasi password tidak cocok.');
          setIsLoading(false);
          return;
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        const registeredUser = userCredential.user;
        
        // Update auth profile display name
        await updateProfile(registeredUser, {
          displayName: fullName.trim()
        });

        // Send Email Verification
        await sendEmailVerification(registeredUser);
        
        // Save user profile in Firestore
        await saveUserProfile({
          ...registeredUser,
          displayName: fullName.trim()
        } as any);

        setSuccessMsg(`Pendaftaran berhasil! Email konfirmasi verifikasi telah dikirim ke ${email}. Silakan periksa kotak masuk/spam Anda.`);
        triggerToast('Pendaftaran berhasil! Silakan verifikasi email Anda.');
        
        // Clear registration inputs
        setFullName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setMode('login');
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email.trim());
        setSuccessMsg(`Tautan atur ulang password telah berhasil dikirim ke ${email}. Silakan ikuti instruksi pada email Anda.`);
        triggerToast('Tautan reset password terkirim!');
        setEmail('');
      }
    } catch (err: any) {
      console.error(err);
      let localizedError = 'Terjadi kesalahan sistem. Silakan coba beberapa saat lagi.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        localizedError = 'Email atau password yang Anda masukkan salah.';
      } else if (err.code === 'auth/wrong-password') {
        localizedError = 'Password yang Anda masukkan salah.';
      } else if (err.code === 'auth/email-already-in-use') {
        localizedError = 'Email sudah digunakan oleh akun lain.';
      } else if (err.code === 'auth/invalid-email') {
        localizedError = 'Format email tidak valid.';
      } else if (err.code === 'auth/weak-password') {
        localizedError = 'Password terlalu lemah.';
      }
      setErrorMsg(localizedError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden bg-slate-50 font-sans">
      
      {/* Background topography decoration elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <OptimizedImage 
          src={ASSETS.MAP_BG} 
          alt="Map Pattern" 
          className="w-full h-full object-cover"
          widthSize={1200}
        />
      </div>

      <div className="w-full max-w-md bg-white border border-slate-150 rounded-3xl shadow-xl p-8 md:p-10 z-10 relative transition-all duration-300">
        
        {/* Back To Home Button */}
        <button 
          onClick={() => setView('home')}
          className="absolute left-6 top-6 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Kembali</span>
        </button>

        {/* Brand Header */}
        <div className="text-center mt-4 mb-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center p-1.5 mx-auto mb-4 border border-emerald-100">
            <OptimizedImage 
              src={ASSETS.LOGO} 
              alt="Logo Garda Bangsa" 
              className="w-full h-full object-contain filter drop-shadow"
              widthSize={120}
            />
          </div>
          <h2 className="font-sans font-extrabold text-2xl tracking-tight text-slate-950">
            {mode === 'login' && 'Selamat Datang'}
            {mode === 'register' && 'Daftar Anggota'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5">
            {mode === 'login' && 'Masuk untuk mengelola database & KTA keanggotaan.'}
            {mode === 'register' && 'Buat akun kader Garda Bangsa baru.'}
            {mode === 'forgot' && 'Masukkan email terdaftar untuk menerima link konfirmasi.'}
          </p>
        </div>

        {/* Status / Alert Messages */}
        {errorMsg && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-800 text-xs animate-shake leading-relaxed">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 text-emerald-900 text-xs leading-relaxed">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'register' && (
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700 block">Nama Lengkap</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Nama sesuai KTP"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white text-xs font-medium rounded-xl transition-all outline-none"
                />
              </div>
            </div>
          )}

          <div className="space-y-1.5 text-left">
            <label className="text-xs font-bold text-slate-700 block">Alamat Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white text-xs font-medium rounded-xl transition-all outline-none"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 block">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { resetMessages(); setMode('forgot'); }}
                    className="text-[10px] font-bold text-emerald-700 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    Lupa Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white text-xs font-medium rounded-xl transition-all outline-none"
                />
              </div>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-700 block">Konfirmasi Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 text-slate-900 border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:bg-white text-xs font-medium rounded-xl transition-all outline-none"
                />
              </div>
            </div>
          )}

          {/* Action Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#022C16] hover:bg-[#074021] text-white py-3 px-4 rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-white" />
            ) : (
              <>
                <span>
                  {mode === 'login' && 'Masuk Akun'}
                  {mode === 'register' && 'Buat Akun Baru'}
                  {mode === 'forgot' && 'Kirim Link Konfirmasi'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>



        {/* Mode Toggler */}
        <div className="mt-6 text-center">
          {mode === 'login' ? (
            <p className="text-xs text-slate-500 font-medium">
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => { resetMessages(); setMode('register'); }}
                className="font-bold text-emerald-800 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Daftar Sekarang
              </button>
            </p>
          ) : (
            <p className="text-xs text-slate-500 font-medium">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => { resetMessages(); setMode('login'); }}
                className="font-bold text-emerald-800 hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Masuk di Sini
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
