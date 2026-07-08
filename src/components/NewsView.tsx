import React, { useState } from 'react';
import { Search, Heart, Eye, Calendar, User, Share2, CornerDownRight, MessageSquare, ArrowLeft, Award, ThumbsUp } from 'lucide-react';
import { NewsArticle } from '../types';
import { OptimizedImage } from './OptimizedImage';

interface NewsViewProps {
  articles: NewsArticle[];
  onLikeArticle: (id: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ articles, onLikeArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'Semua' | 'Internal' | 'Event' | 'Opini' | 'Rilis Pers'>('Semua');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Local comments engine per article (id -> comment list)
  const [comments, setComments] = useState<Record<string, { author: string; text: string; date: string }[]>>({
    'NWS-001': [
      { author: "Yafet Mandacan", text: "Selamat atas terpilihnya Bung Fadhlurrahman Anshari! Pemimpin muda yang berani dan intelektual.", date: "2026-06-16 08:30" },
      { author: "Rony Wanggai", text: "Semoga rekomendasi digitalisasi pemuda segera terealisasi ke seluruh pelosok Papua Barat.", date: "2026-06-16 11:24" }
    ]
  });
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  // 1. Filter Logic
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredArticle = filteredArticles.length > 0 ? filteredArticles[0] : null;
  const secondaryArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : [];

  // Active reading article lookup
  const activeArticle = articles.find(a => a.id === activeArticleId);

  // Add Comment Handler
  const handleAddComment = (e: React.FormEvent, articleId: string) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) {
      triggerToast("Nama dan isi komentar wajib diisi!");
      return;
    }

    const newComment = {
      author: newCommentAuthor.trim(),
      text: newCommentText.trim(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setComments(prev => ({
      ...prev,
      [articleId]: [...(prev[articleId] || []), newComment]
    }));

    setNewCommentAuthor('');
    setNewCommentText('');
  };

  // Share Simulation
  const handleShare = (title: string) => {
    navigator.clipboard.writeText(window.location.href);
    triggerToast(`Link berita "${title}" telah disalin! Bagikan lewat WhatsApp atau Media Sosial.`);
  };

  return (
    <div className="space-y-10 pb-20">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white font-sans text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-2.5 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
      
      {/* RENDER ACTIVE FULL ARTICLE IF SELECTED */}
      {activeArticle ? (
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 animate-fade-in max-w-4xl mx-auto space-y-8" id="article-read-container">
          
          {/* Back Action Header */}
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveArticleId(null)}
              className="flex items-center gap-2 text-[#0E4A28] hover:text-[#15803D] font-sans font-bold text-xs cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>KEMBALI KE DAFTAR BERITA</span>
            </button>
            <span className="font-mono text-xxs bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200 font-bold uppercase">
              {activeArticle.category}
            </span>
          </div>

          {/* Article Main Visual */}
          <div className="h-96 relative bg-slate-200">
            <OptimizedImage 
              src={activeArticle.imageUrl} 
              widthSize={1000}
              alt={activeArticle.title} 
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-6 left-6 right-6 space-y-3 text-left">
              <h1 className="font-sans font-extrabold text-white text-2xl md:text-4xl tracking-tight leading-snug">
                {activeArticle.title}
              </h1>
              
              {/* Meta stats inside visual */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-yellow-400" /> {activeArticle.author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-yellow-400" /> {activeArticle.date}</span>
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4 text-yellow-400" /> {activeArticle.reads} Baca</span>
                <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-red-500 fill-red-500" /> {activeArticle.likes} Suka</span>
              </div>
            </div>
          </div>

          {/* Core Text Content */}
          <div className="px-6 md:px-12 py-4">
            <div className="font-sans text-slate-800 text-base leading-relaxed space-y-6 max-w-3xl mx-auto whitespace-pre-line border-b border-slate-100 pb-8">
              {activeArticle.content}
            </div>

            {/* Reaction Controls */}
            <div className="py-6 flex items-center justify-between border-b border-slate-100 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLikeArticle(activeArticle.id)}
                  id={`btn-like-active-${activeArticle.id}`}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-sans font-bold text-xs py-2 px-5 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>SUKAI BERITA ({activeArticle.likes})</span>
                </button>
                <button
                  onClick={() => handleShare(activeArticle.title)}
                  className="bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-sans font-semibold text-xs py-2 px-5 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>BAGIKAN</span>
                </button>
              </div>

              <span className="text-xs text-slate-400 font-sans">
                Garda Bangsa Papua Barat Media Center © 2026
              </span>
            </div>

            {/* COMMENTS SECTION */}
            <div className="pt-8 max-w-3xl mx-auto space-y-8" id="comments-container">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5.5 h-5.5 text-[#0E4A28]" />
                <h3 className="font-sans font-bold text-lg text-slate-950">
                  Kolom Komentar ({comments[activeArticle.id]?.length || 0})
                </h3>
              </div>

              {/* Comments list */}
              <div className="space-y-4">
                {(!comments[activeArticle.id] || comments[activeArticle.id].length === 0) ? (
                  <p className="text-sm text-slate-400 italic">Belum ada komentar di artikel ini. Jadilah yang pertama memberikan aspirasi!</p>
                ) : (
                  comments[activeArticle.id].map((comment, i) => (
                    <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex gap-3 items-start animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-[#0E4A28] text-yellow-300 font-sans font-bold text-xs flex items-center justify-center flex-none">
                        {comment.author[0].toUpperCase()}
                      </div>
                      <div className="space-y-1 flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-sans font-bold text-slate-950">{comment.author}</h5>
                          <span className="text-xxs text-slate-400 font-mono">{comment.date}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-sans leading-relaxed pt-0.5">{comment.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={(e) => handleAddComment(e, activeArticle.id)} className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
                <p className="font-sans font-bold text-xs text-slate-800 uppercase tracking-wider">Tulis Tanggapan / Aspirasi Anda:</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-1 space-y-1">
                    <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">Nama Anda</label>
                    <input 
                      type="text" 
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      placeholder="cth: Yafet Mandacan"
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none font-sans"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-sans font-bold text-slate-500 uppercase">Isi Komentar</label>
                    <input 
                      type="text" 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Tulis opini, dukungan, atau tanggapan konstruktif..."
                      className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:outline-none font-sans"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="bg-[#0E4A28] hover:bg-[#15803D] text-white font-sans font-bold text-xxs py-1.5 px-4 rounded-md shadow cursor-pointer transition-colors"
                  >
                    KIRIM KOMENTAR
                  </button>
                </div>
              </form>

            </div>

          </div>

        </div>
      ) : (
        /* RENDER DIRECTORY NEWS VIEW */
        <>
          {/* SEARCH & FILTER TABS BAR */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-sans font-extrabold text-3xl text-slate-950 tracking-tight flex items-center gap-2">
                Pusat Kabar & Berita Terbaru <Award className="w-6.5 h-6.5 text-[#15803D]" />
              </h1>
              <p className="font-sans text-slate-500 text-sm mt-1">Dapatkan informasi terkini mengenai kegiatan internal, program aksi kemasyarakatan, serta rilis pers resmi DKW Garda Bangsa.</p>
            </div>

            {/* Category selection tabs */}
            <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {['Semua', 'Internal', 'Event', 'Opini', 'Rilis Pers'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold cursor-pointer transition-all ${
                    selectedCategory === cat 
                      ? 'bg-[#0E4A28] text-white shadow' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* SEARCH INPUT BAR */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              id="news-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Saring berita berdasarkan kata kunci judul, pengarang, atau substansi berita..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-emerald-600 shadow-sm"
            />
          </div>

          {/* GRID OF ARTICLES */}
          {filteredArticles.length === 0 ? (
            <div className="bg-slate-50 rounded-2xl p-12 text-center text-slate-400 italic font-sans border border-slate-200/60">
              Belum ada artikel berita yang cocok dengan kata kunci atau kategori pencarian Anda.
            </div>
          ) : (
            <div className="space-y-12">
              
              {/* FEATURED ARTICLES HERO WIDGET */}
              {featuredArticle && (
                <div 
                  id={`news-featured-${featuredArticle.id}`}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 flex flex-col lg:flex-row group hover:shadow-xl transition-all"
                >
                  {/* Photo portion */}
                  <div className="lg:w-1/2 h-64 lg:h-auto min-h-[260px] relative bg-slate-200 overflow-hidden flex-none">
                    <OptimizedImage 
                      src={featuredArticle.imageUrl} 
                      widthSize={800}
                      alt={featuredArticle.title} 
                      className="w-full h-full transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                    <span className="absolute top-4 left-4 bg-[#0E4A28] text-yellow-300 font-mono text-xxs font-extrabold px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow uppercase">
                      BERITA UTAMA • {featuredArticle.category}
                    </span>
                  </div>

                  {/* Body Content portion */}
                  <div className="lg:w-1/2 p-6 md:p-10 flex flex-col justify-between space-y-6 text-left">
                    <div className="space-y-3">
                      
                      {/* Meta info header */}
                      <div className="flex items-center gap-3.5 text-xxs font-sans font-bold text-slate-400 uppercase tracking-wider">
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#15803D]" /> {featuredArticle.author}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#15803D]" /> {featuredArticle.date}</span>
                      </div>

                      <h2 className="font-sans font-extrabold text-2xl md:text-3xl text-slate-950 tracking-tight leading-tight group-hover:text-[#0E4A28] transition-colors">
                        {featuredArticle.title}
                      </h2>

                      <p className="font-sans text-slate-600 text-sm md:text-base leading-relaxed">
                        {featuredArticle.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      
                      {/* Reaction metrics */}
                      <div className="flex items-center gap-4 text-xs text-slate-500 font-sans">
                        <span className="flex items-center gap-1"><Eye className="w-4 h-4 text-slate-400" /> {featuredArticle.reads} Baca</span>
                        <span className="flex items-center gap-1"><Heart className="w-4 h-4 text-slate-400" /> {featuredArticle.likes} Suka</span>
                      </div>

                      {/* Read now action button */}
                      <button
                        onClick={() => setActiveArticleId(featuredArticle.id)}
                        id={`btn-read-featured-${featuredArticle.id}`}
                        className="bg-slate-50 group-hover:bg-[#0E4A28] text-[#0E4A28] group-hover:text-white font-sans font-bold text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer border border-[#0E4A28]/15 transition-all"
                      >
                        <span>BACA SELENGKAPNYA</span>
                        <CornerDownRight className="w-3.5 h-3.5" />
                      </button>

                    </div>
                  </div>
                </div>
              )}

              {/* SECONDARY ARTICLES GRID */}
              {secondaryArticles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {secondaryArticles.map((article) => (
                    <div 
                      key={article.id} 
                      id={`news-item-${article.id}`}
                      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg border border-slate-100 flex flex-col justify-between group transition-all"
                    >
                      {/* Photo Header */}
                      <div className="h-48 relative bg-slate-200 overflow-hidden">
                        <OptimizedImage 
                          src={article.imageUrl} 
                          widthSize={500}
                          alt={article.title} 
                          className="w-full h-full transition-transform duration-700 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                        
                        {/* Category tag */}
                        <span className="absolute top-4 left-4 bg-white/95 text-[#0E4A28] font-sans text-xxs font-extrabold px-2.5 py-1 rounded shadow-sm">
                          {article.category}
                        </span>

                        {/* Date overlay bottom left */}
                        <span className="absolute bottom-4 left-4 text-slate-300 font-mono text-[10px] font-semibold flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-yellow-400" /> {article.date}
                        </span>
                      </div>

                      {/* Body Content */}
                      <div className="p-6 space-y-4 text-left flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          <p className="text-xxs font-sans font-bold text-slate-400 uppercase tracking-wide">Ditulis Oleh: {article.author}</p>
                          <h3 className="font-sans font-bold text-lg text-slate-950 tracking-tight leading-snug group-hover:text-[#0E4A28] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="font-sans text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3 text-slate-500 font-sans">
                            <span className="flex items-center gap-0.5"><Eye className="w-3.5 h-3.5 text-slate-400" /> {article.reads}</span>
                            <span className="flex items-center gap-0.5"><Heart className="w-3.5 h-3.5 text-slate-400" /> {article.likes}</span>
                          </div>

                          <button
                            onClick={() => setActiveArticleId(article.id)}
                            id={`btn-read-${article.id}`}
                            className="text-[#0E4A28] font-sans font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <span>Baca Artikel</span>
                            <CornerDownRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </>
      )}

    </div>
  );
};
