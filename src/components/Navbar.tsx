import React, { useState, useEffect } from 'react';
import { Menu, X, Landmark, Database, Newspaper, PhoneCall, LayoutDashboard, Award, LogOut, User as UserIcon, Settings as SettingsIcon } from 'lucide-react';
import { ASSETS } from '../data';
import { OptimizedImage } from './OptimizedImage';
import { User } from 'firebase/auth';
import { WebsiteSettings } from '../types';

interface NavbarProps {
  currentView: string;
  setView: (view: string) => void;
  pendingCount: number;
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  authLoading: boolean;
  settings: WebsiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  setView, 
  pendingCount, 
  user, 
  onLogin, 
  onLogout,
  authLoading,
  settings
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (currentView === 'news') {
      setActiveSection('news');
    } else if (currentView === 'contact') {
      setActiveSection('contact');
    } else if (currentView === 'home') {
      // Default to home if on home view, unless user specifically navigated to profile/gallery
      if (activeSection !== 'profile' && activeSection !== 'gallery') {
        setActiveSection('home');
      }
    } else {
      setActiveSection('');
    }
  }, [currentView]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    if (id === 'home') {
      setView('home');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    } else if (id === 'profile') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('sambutan-ketua');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (id === 'gallery') {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById('program-kerja');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else if (id === 'news') {
      setView('news');
    } else if (id === 'contact') {
      setView('contact');
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white text-slate-800 border-b border-slate-100 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
            id="navbar-logo-brand"
          >
            <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <OptimizedImage 
                src={settings.logoUrl || ASSETS.LOGO} 
                widthSize={120}
                alt="Logo Garda Bangsa" 
                className="w-full h-full object-contain filter drop-shadow bg-transparent"
              />
            </div>
            <span className="font-sans font-extrabold tracking-tight text-xl text-slate-900">
              {settings.customTitle || 'Garda Bangsa PB'}
            </span>
          </div>

          {/* Center Navigation Links (Exact Match with Image Mockup) */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-sm font-medium transition-all py-1.5 px-1 relative cursor-pointer ${
                activeSection === 'home'
                  ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className={`text-sm font-medium transition-all py-1.5 px-1 relative cursor-pointer ${
                activeSection === 'profile'
                  ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`text-sm font-medium transition-all py-1.5 px-1 relative cursor-pointer ${
                activeSection === 'gallery'
                  ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('news')}
              className={`text-sm font-medium transition-all py-1.5 px-1 relative cursor-pointer ${
                activeSection === 'news'
                  ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              News
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-medium transition-all py-1.5 px-1 relative cursor-pointer ${
                activeSection === 'contact'
                  ? 'text-slate-950 font-semibold border-b-2 border-slate-950'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Right Action Buttons: Auth & Login (Exact Match with Image Mockup but enhanced with Firebase Auth) */}
          <div className="hidden md:flex items-center gap-3 relative">
            {authLoading ? (
              <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-200 border-t-emerald-600 animate-spin" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-full py-1.5 pl-2 pr-4 transition-all duration-200 cursor-pointer shadow-sm"
                  id="user-profile-menu-button"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-xs">
                      {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-800 truncate max-w-[120px]">
                      {user.displayName || 'Kader'}
                    </p>
                    <p className="text-[10px] text-emerald-700 font-mono font-medium leading-none">
                      Logged In
                    </p>
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2.5 w-56 bg-white border border-slate-150 rounded-xl shadow-xl py-2 z-50 animate-fade-in font-sans">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-xs font-bold text-slate-800 truncate">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setView('dashboard');
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-slate-500" />
                      <span>Statistik Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setView('kader');
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-slate-500" />
                      <span>Database & KTA</span>
                    </button>

                    <button
                      onClick={() => {
                        setView('settings');
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
                    >
                      <SettingsIcon className="w-4 h-4 text-slate-500" />
                      <span>Pengaturan Website</span>
                    </button>

                    <hr className="my-1.5 border-slate-100" />

                    <button
                      onClick={() => {
                        onLogout();
                        setShowDropdown(false);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  id="navbar-login-btn"
                  onClick={onLogin}
                  className="border border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-50 font-sans font-medium text-sm py-2 px-6 rounded-md shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google Logo" />
                  <span>Sign In</span>
                </button>
                <button
                  id="navbar-register-btn"
                  onClick={() => setView('kader')}
                  className="bg-[#FFD15C] hover:bg-[#F3C044] text-slate-950 font-sans font-semibold text-sm py-2 px-6 rounded-md shadow-sm transition-all cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors duration-200 cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 animate-fade-in shadow-lg">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'home' ? 'bg-slate-50 text-slate-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('profile')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'profile' ? 'bg-slate-50 text-slate-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'gallery' ? 'bg-slate-50 text-slate-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavClick('news')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'news' ? 'bg-slate-50 text-slate-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              News
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeSection === 'contact' ? 'bg-slate-50 text-slate-950 font-semibold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-2">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-slate-200" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold text-sm">
                        {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-900 leading-tight">{user.displayName || 'Kader'}</p>
                      <p className="text-xs text-slate-500 leading-tight truncate max-w-[180px]">{user.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      setView('dashboard');
                      setIsOpen(false);
                    }}
                    className="w-full text-center border border-slate-300 text-slate-800 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Dashboard Statistik
                  </button>
                  <button
                    onClick={() => {
                      setView('kader');
                      setIsOpen(false);
                    }}
                    className="w-full text-center border border-slate-300 text-slate-800 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Database & KTA
                  </button>
                  <button
                    onClick={() => {
                      setView('settings');
                      setIsOpen(false);
                    }}
                    className="w-full text-center border border-slate-300 text-slate-800 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Pengaturan Website
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-center bg-rose-50 text-rose-600 py-2 rounded-lg font-bold text-sm hover:bg-rose-100 transition-all cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLogin();
                      setIsOpen(false);
                    }}
                    className="w-full text-center border border-slate-300 text-slate-800 py-2 rounded-lg font-medium text-sm hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google Logo" />
                    <span>Sign In with Google</span>
                  </button>
                  <button
                    onClick={() => {
                      setView('kader');
                      setIsOpen(false);
                    }}
                    className="w-full text-center bg-[#FFD15C] text-slate-950 py-2 rounded-lg font-semibold text-sm hover:bg-[#F3C044] transition-all cursor-pointer"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
