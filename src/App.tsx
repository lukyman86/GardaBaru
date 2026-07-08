import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { DashboardView } from './components/DashboardView';
import { KaderView } from './components/KaderView';
import { NewsView } from './components/NewsView';
import { ContactView } from './components/ContactView';
import { AuthView } from './components/AuthView';
import { 
  INITIAL_KADER, 
  INITIAL_NEWS, 
  INITIAL_DPC, 
  INITIAL_CONTACTS, 
  ASSETS 
} from './data';
import { Kader, NewsArticle, ContactMessage, DpcStatus, WebsiteSettings } from './types';
import { Landmark, Award, Shield, Users, Mail, Compass, ShieldCheck, MapPin, Phone, Instagram, Share2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { 
  auth, 
  db, 
  onAuthStateChanged, 
  loginWithGoogle, 
  signOut,
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  writeBatch,
  updateDoc
} from './lib/firebase';
import { User } from 'firebase/auth';
import { SettingsView } from './components/SettingsView';

const DEFAULT_SETTINGS: WebsiteSettings = {
  id: 'current',
  logoUrl: "/src/assets/images/garda_bangsa_logo_transparent_1783525240906.jpg",
  primaryColor: '#022C16',
  secondaryColor: '#FFD15C',
  themeName: 'emerald',
  updatedAt: new Date().toISOString(),
  updatedBy: 'Sistem',
  templateStyle: 'elegant',
  customTitle: 'Garda Bangsa PB'
};

function adjustColorBrightness(hex: string, percent: number): string {
  try {
    const color = hex.startsWith('#') ? hex.substring(1) : hex;
    let R = parseInt(color.substring(0, 2), 16);
    let G = parseInt(color.substring(2, 4), 16);
    let B = parseInt(color.substring(4, 6), 16);

    R = Math.max(0, Math.min(255, R + percent));
    G = Math.max(0, Math.min(255, G + percent));
    B = Math.max(0, Math.min(255, B + percent));

    const rHex = R.toString(16).padStart(2, '0');
    const gHex = G.toString(16).padStart(2, '0');
    const bHex = B.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  } catch (err) {
    return hex;
  }
}

export default function App() {
  const [currentView, setView] = useState<string>('home');

  // Website dynamic custom settings
  const [settings, setSettings] = useState<WebsiteSettings>(DEFAULT_SETTINGS);

  // Master State Management
  const [kaderList, setKaderList] = useState<Kader[]>([]);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [dpcList, setDpcList] = useState<DpcStatus[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);

  // Auth and Loading States
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Listen to Auth changes
  useEffect(() => {
    // Check for a saved local session first
    const savedLocalUser = localStorage.getItem('local_admin_user');
    let parsedLocalUser = null;
    if (savedLocalUser) {
      try {
        parsedLocalUser = JSON.parse(savedLocalUser);
      } catch (e) {
        console.error(e);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else if (parsedLocalUser) {
        setUser(parsedLocalUser as User);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch or Seed Data from/to Firestore
  useEffect(() => {
    const syncData = async () => {
      setDataLoading(true);
      setSyncStatus("Mengubungkan ke cloud database...");
      try {
        // 1. Sync DPC List
        const dpcSnapshot = await getDocs(collection(db, 'dpc'));
        let currentDpcs: DpcStatus[] = [];
        if (dpcSnapshot.empty) {
          setSyncStatus("Menyiapkan data awal DPC...");
          const batch = writeBatch(db);
          INITIAL_DPC.forEach((dpcItem) => {
            const dpcRef = doc(db, 'dpc', dpcItem.id);
            batch.set(dpcRef, dpcItem);
          });
          await batch.commit();
          currentDpcs = [...INITIAL_DPC];
        } else {
          currentDpcs = dpcSnapshot.docs.map(doc => doc.data() as DpcStatus);
        }
        setDpcList(currentDpcs.sort((a, b) => a.name.localeCompare(b.name)));

        // 2. Sync Kader List
        const kaderSnapshot = await getDocs(collection(db, 'kader'));
        let currentKaders: Kader[] = [];
        if (kaderSnapshot.empty) {
          setSyncStatus("Menyiapkan database kader...");
          const batch = writeBatch(db);
          INITIAL_KADER.forEach((kaderItem) => {
            const kaderRef = doc(db, 'kader', kaderItem.id);
            batch.set(kaderRef, kaderItem);
          });
          await batch.commit();
          currentKaders = [...INITIAL_KADER];
        } else {
          currentKaders = kaderSnapshot.docs.map(doc => doc.data() as Kader);
        }
        setKaderList(currentKaders.sort((a, b) => b.joinedDate.localeCompare(a.joinedDate)));

        // 3. Sync News Articles
        const newsSnapshot = await getDocs(collection(db, 'news'));
        let currentNews: NewsArticle[] = [];
        if (newsSnapshot.empty) {
          setSyncStatus("Menyiapkan portal berita...");
          const batch = writeBatch(db);
          INITIAL_NEWS.forEach((newsItem) => {
            const newsRef = doc(db, 'news', newsItem.id);
            batch.set(newsRef, newsItem);
          });
          await batch.commit();
          currentNews = [...INITIAL_NEWS];
        } else {
          currentNews = newsSnapshot.docs.map(doc => doc.data() as NewsArticle);
        }
        setNewsArticles(currentNews.sort((a, b) => b.date.localeCompare(a.date)));

        // 4. Sync Contact Messages
        const messagesSnapshot = await getDocs(collection(db, 'messages'));
        let currentMessages: ContactMessage[] = [];
        if (messagesSnapshot.empty) {
          setSyncStatus("Menyiapkan log pesan...");
          const batch = writeBatch(db);
          INITIAL_CONTACTS.forEach((msgItem) => {
            const msgRef = doc(db, 'messages', msgItem.id);
            batch.set(msgRef, msgItem);
          });
          await batch.commit();
          currentMessages = [...INITIAL_CONTACTS];
        } else {
          currentMessages = messagesSnapshot.docs.map(doc => doc.data() as ContactMessage);
        }
        setContactMessages(currentMessages.sort((a, b) => b.date.localeCompare(a.date)));

        // 5. Sync Website Settings
        setSyncStatus("Menyinkronkan konfigurasi website...");
        const settingsDoc = await getDoc(doc(db, 'settings', 'current'));
        if (settingsDoc.exists()) {
          setSettings(settingsDoc.data() as WebsiteSettings);
        } else {
          await setDoc(doc(db, 'settings', 'current'), DEFAULT_SETTINGS);
          setSettings(DEFAULT_SETTINGS);
        }

      } catch (error) {
        console.error("Error syncing with Firestore:", error);
        // Fallback to local initial data on failure
        setKaderList(INITIAL_KADER);
        setNewsArticles(INITIAL_NEWS);
        setDpcList(INITIAL_DPC);
        setContactMessages(INITIAL_CONTACTS);
        triggerToast("Database Cloud bermasalah. Menggunakan basis data lokal.");
      } finally {
        setDataLoading(false);
        setSyncStatus(null);
      }
    };

    syncData();
  }, []);

  const handleLogin = () => {
    setView('auth');
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('local_admin_user');
      await signOut(auth);
      setUser(null);
      triggerToast("Berhasil keluar.");
    } catch (err) {
      console.error(err);
      triggerToast("Gagal keluar.");
    }
  };

  // 1. Verify Member Action (Pending -> Aktif)
  const handleVerifyKader = async (id: string) => {
    // 1. Update local state instantly for snappy UI
    setKaderList(prevList => 
      prevList.map(kader => {
        if (kader.id === id) {
          // Increment associated DPC stats on successful verification
          setDpcList(prevDpcs => 
            prevDpcs.map(dpc => {
              if (dpc.name === kader.dpc) {
                const updatedDpc = {
                  ...dpc,
                  membersCount: dpc.membersCount + 1,
                  pendingCount: Math.max(0, dpc.pendingCount - 1),
                  activityLevel: Math.min(100, dpc.activityLevel + 2)
                };
                // Sync DPC change to Firestore
                updateDoc(doc(db, 'dpc', dpc.id), updatedDpc).catch(err => console.error(err));
                return updatedDpc;
              }
              return dpc;
            })
          );
          const updatedKader = { ...kader, status: 'Aktif' as const, isVerified: true };
          // Sync Kader change to Firestore
          updateDoc(doc(db, 'kader', kader.id), updatedKader).catch(err => console.error(err));
          return updatedKader;
        }
        return kader;
      })
    );
    triggerToast("Kader berhasil disetujui & diaktifkan!");
  };

  // 2. Reject Member Action (Pending -> Ditolak)
  const handleRejectKader = async (id: string) => {
    setKaderList(prevList => 
      prevList.map(kader => {
        if (kader.id === id) {
          // Decrement pending count on associated DPC
          setDpcList(prevDpcs => 
            prevDpcs.map(dpc => {
              if (dpc.name === kader.dpc) {
                const updatedDpc = {
                  ...dpc,
                  pendingCount: Math.max(0, dpc.pendingCount - 1)
                };
                // Sync DPC change to Firestore
                updateDoc(doc(db, 'dpc', dpc.id), updatedDpc).catch(err => console.error(err));
                return updatedDpc;
              }
              return dpc;
            })
          );
          const updatedKader = { ...kader, status: 'Ditolak' as const, isVerified: false };
          // Sync Kader change to Firestore
          updateDoc(doc(db, 'kader', kader.id), updatedKader).catch(err => console.error(err));
          return updatedKader;
        }
        return kader;
      })
    );
    triggerToast("Pendaftaran kader berhasil ditolak.");
  };

  // 3. Register New Member Action (Add to List as Pending)
  const handleAddKader = async (newKaderData: Omit<Kader, 'id' | 'joinedDate'>) => {
    const nextId = `KDR-0${kaderList.length + 1}`;
    const today = new Date().toISOString().split('T')[0];
    const newKader: Kader = {
      ...newKaderData,
      id: nextId,
      joinedDate: today
    };

    // 1. Update state
    setKaderList(prev => [newKader, ...prev]);

    setDpcList(prevDpcs => 
      prevDpcs.map(dpc => {
        if (dpc.name === newKader.dpc) {
          const updatedDpc = {
            ...dpc,
            pendingCount: dpc.pendingCount + 1
          };
          updateDoc(doc(db, 'dpc', dpc.id), updatedDpc).catch(err => console.error(err));
          return updatedDpc;
        }
        return dpc;
      })
    );

    try {
      // 2. Sync to Firestore
      await setDoc(doc(db, 'kader', newKader.id), newKader);
      triggerToast("Pendaftaran kader berhasil tersimpan secara cloud!");
    } catch (e) {
      console.error(e);
      triggerToast("Data tersimpan secara lokal (Gagal sync cloud).");
    }
  };

  // 4. Like News Article Action
  const handleLikeArticle = async (id: string) => {
    setNewsArticles(prev => 
      prev.map(art => {
        if (art.id === id) {
          const updatedArt = { ...art, likes: art.likes + 1 };
          updateDoc(doc(db, 'news', art.id), updatedArt).catch(err => console.error(err));
          return updatedArt;
        }
        return art;
      })
    );
  };

  // 5. Send Message Action (Add to Activity Log Monitor)
  const handleSendMessage = async (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const nextId = `MSG-0${contactMessages.length + 1}`;
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newMsg: ContactMessage = {
      ...msg,
      id: nextId,
      date: nowStr,
      status: 'Belum Dibaca' as const
    };

    setContactMessages(prev => [newMsg, ...prev]);

    try {
      await setDoc(doc(db, 'messages', newMsg.id), newMsg);
      triggerToast("Pesan aspirasi berhasil dikirim ke Cloud!");
    } catch (e) {
      console.error(e);
      triggerToast("Pesan aspirasi terkirim secara lokal.");
    }
  };

  const handleSaveSettings = async (newSettings: WebsiteSettings) => {
    try {
      setSettings(newSettings);
      await setDoc(doc(db, 'settings', 'current'), newSettings);
      triggerToast("Konfigurasi website berhasil disimpan ke Cloud!");
    } catch (e) {
      console.error(e);
      triggerToast("Setelan tersimpan secara lokal (Gagal sync cloud).");
    }
  };

  // Calculate global badge values
  const totalPendingBadges = kaderList.filter(k => k.status === 'Pending').length;

  const handleFooterLinkClick = (id: string) => {
    if (id === 'vision-mission') {
      setView('home');
      setTimeout(() => {
        document.getElementById('visi-misi')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'management') {
      setView('home');
      setTimeout(() => {
        document.getElementById('struktur-organisasi')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'programs') {
      setView('home');
      setTimeout(() => {
        document.getElementById('program-kerja')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'news') {
      setView('news');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'gallery') {
      setView('home');
      setTimeout(() => {
        document.getElementById('program-kerja')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'contact') {
      setView('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between" id="app-root-container">
      
      {/* Dynamic Style variables injected directly */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary-color: ${settings.primaryColor || '#022C16'};
          --primary-color-hover: ${adjustColorBrightness(settings.primaryColor || '#022C16', 15)};
          --secondary-color: ${settings.secondaryColor || '#FFD15C'};
          --accent-color: ${settings.accentColor || '#10B981'};
        }
      `}} />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-sans text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#FFD15C] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* NAVIGATION BAR WITH PORTAL LOGO AND BADGES */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        pendingCount={totalPendingBadges} 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        authLoading={authLoading}
        settings={settings}
      />

      {/* CORE CONTENT ROUTING AREA - Dynamic Fluid Width */}
      <main className="flex-grow w-full pt-0">
        {dataLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] gap-4 font-sans text-slate-700 bg-white">
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-12 h-12 text-emerald-800 animate-spin" />
              <Sparkles className="w-5 h-5 text-yellow-500 absolute animate-pulse" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-bold text-slate-900 text-sm">{syncStatus || "Sinkronisasi database..."}</p>
              <p className="text-xs text-slate-400">Harap tunggu beberapa detik saat sistem menyinkronkan data cloud Firebase.</p>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {currentView === 'home' && (
              <HomeView setView={setView} />
            )}

            {currentView === 'dashboard' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full pb-16">
                <DashboardView 
                  dpcList={dpcList} 
                  kaderList={kaderList} 
                  setView={setView}
                />
              </div>
            )}

            {currentView === 'settings' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full pb-16">
                {user ? (
                  <SettingsView 
                    settings={settings}
                    onSaveSettings={handleSaveSettings}
                  />
                ) : (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto my-12 shadow-sm font-sans">
                    <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto mb-5 text-amber-600">
                      <AlertCircle className="w-7 h-7" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-slate-900 mb-2">Login Diperlukan</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Hanya pengurus admin yang diotorisasi dapat mengonfigurasi dan menyesuaikan setelan atau tema website ini.
                    </p>
                    <button
                      onClick={handleLogin}
                      className="bg-[#022C16] hover:bg-[#0d4425] text-white font-sans font-bold text-sm py-3 px-8 rounded-lg shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Masuk ke Akun Pengurus</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentView === 'kader' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full pb-16">
                {user ? (
                  <KaderView 
                    kaderList={kaderList}
                    dpcList={dpcList}
                    onVerify={handleVerifyKader}
                    onReject={handleRejectKader}
                    onAddKader={handleAddKader}
                  />
                ) : (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto my-12 shadow-sm font-sans">
                    <div className="w-14 h-14 bg-amber-50 border border-amber-100 rounded-full flex items-center justify-center mx-auto mb-5 text-amber-600">
                      <AlertCircle className="w-7 h-7" />
                    </div>
                    <h3 className="font-sans font-bold text-lg text-slate-900 mb-2">Login Diperlukan</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      Untuk mengakses database keanggotaan dan mencetak Kartu Tanda Anggota (KTA) Garda Bangsa, Anda harus masuk terlebih dahulu menggunakan akun pengurus terverifikasi.
                    </p>
                    <button
                      onClick={handleLogin}
                      className="bg-[#022C16] hover:bg-[#0d4425] text-white font-sans font-bold text-sm py-3 px-8 rounded-lg shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Masuk ke Akun Pengurus</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {currentView === 'news' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full pb-16">
                <NewsView 
                  articles={newsArticles} 
                  onLikeArticle={handleLikeArticle} 
                />
              </div>
            )}

            {currentView === 'contact' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full pb-16">
                <ContactView 
                  messages={contactMessages} 
                  onSendMessage={handleSendMessage} 
                />
              </div>
            )}

            {currentView === 'auth' && (
              <AuthView 
                setView={setView} 
                triggerToast={triggerToast} 
                onLocalLogin={(localUser) => setUser(localUser)}
              />
            )}
          </div>
        )}
      </main>

      {/* INSTITUTIONAL ELEGANT FOOTER (EXACT MATCH TO MOCKUP) */}
      <footer className="bg-[#022C16] text-white pt-16 pb-12 font-sans" id="app-footer">
        <div className="max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 text-left pb-12 border-b border-white/10">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-lg text-white tracking-tight">Garda Bangsa PB</h4>
            <p className="font-sans text-xs text-slate-300 leading-relaxed max-w-xs">
              Membangun pemuda Papua Barat yang tangguh, berintegritas, dan berjiwa kebangsaan.
            </p>
          </div>

          {/* Tautan Cepat Column */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-sm text-white tracking-wider">Tautan Cepat</h4>
            <ul className="space-y-2 font-sans text-xs text-slate-300">
              <li>
                <button onClick={() => handleFooterLinkClick('vision-mission')} className="hover:text-yellow-400 transition-colors cursor-pointer text-left">
                  Vision-Mission
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('management')} className="hover:text-yellow-400 transition-colors cursor-pointer text-left">
                  Management
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('programs')} className="hover:text-yellow-400 transition-colors cursor-pointer text-left">
                  Programs
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('news')} className="hover:text-yellow-400 transition-colors cursor-pointer text-left">
                  News
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('gallery')} className="hover:text-yellow-400 transition-colors cursor-pointer text-left">
                  Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleFooterLinkClick('contact')} className="hover:text-yellow-400 transition-colors cursor-pointer text-left">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Kontak Column */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-sm text-white tracking-wider">Kontak</h4>
            <ul className="space-y-3 font-sans text-xs text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-300 mt-0.5 flex-shrink-0" />
                <span>Manokwari, Papua Barat</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>info@gardabangsapb.org</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-300 flex-shrink-0" />
                <span>+62 812 3456 7890</span>
              </li>
            </ul>
          </div>

          {/* Sosial Media Column */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-sm text-white tracking-wider">Sosial Media</h4>
            <div className="flex items-center gap-2.5">
              <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors cursor-pointer">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Center Copyright disclaimer */}
        <div className="pt-8 text-center text-xs font-sans text-slate-400">
          <p>© 2024 Garda Bangsa Papua Barat. Patriotik, Modern, Berdaulat.</p>
        </div>

      </footer>

    </div>
  );
}
