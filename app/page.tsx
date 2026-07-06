"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Shirt, 
  Image as ImageIcon, 
  SlidersHorizontal, 
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sun,
  Moon
} from 'lucide-react';
import { useEditorStore } from '@/lib/store/editorStore';

export default function Home() {
  const { theme, toggleTheme, initTheme } = useEditorStore();

  useEffect(() => {
    initTheme();
  }, [initTheme]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans select-none relative overflow-hidden transition-colors duration-300">
      
      {/* Micro Decoration: Soft Blur Gradient */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* HEADER NAVBAR */}
      <header className="h-16 px-4 md:px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 backdrop-blur-md z-10 relative transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-indigo-600/20">
            S
          </div>
          <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-zinc-50 dark:to-zinc-400 bg-clip-text text-transparent">
            Snapform
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500 dark:text-slate-400">
          <a href="#fitur" className="hover:text-indigo-600 dark:hover:text-slate-200 transition-colors duration-200">Fitur</a>
          <a href="#keunggulan" className="hover:text-indigo-600 dark:hover:text-slate-200 transition-colors duration-200">Keunggulan</a>
          <a href="#keamanan" className="hover:text-indigo-600 dark:hover:text-slate-200 transition-colors duration-200">Keamanan</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors cursor-pointer"
            title={theme === 'dark' ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link 
            href="/editor" 
            className="flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs md:text-sm px-4 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-sm"
          >
            <span>Masuk Editor</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </header>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 md:px-8 text-center relative z-10">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/80 border border-slate-300/40 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold transition-all duration-200">
            <Sparkles size={12} className="text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span>Preset-First Photo Restyling</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight md:leading-none bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
            Ubah Foto Kasual Anda <br className="hidden md:block" /> Menjadi Formal & Profesional
          </h1>

          {/* Description */}
          <p className="max-w-xl mx-auto text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            Dapatkan pasfoto CV, LinkedIn, atau portofolio akademis instan tanpa sewa studio foto. Cukup pilih preset pakaian atau latar belakang terkurasi tanpa perlu menulis perintah AI prompt yang rumit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/editor" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/25 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Mulai Mengedit Gratis</span>
              <ArrowRight size={14} />
            </Link>
            <a 
              href="#fitur" 
              className="w-full sm:w-auto flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm px-8 py-3.5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
            >
              Pelajari Fitur
            </a>
          </div>
        </div>

        {/* Visual Mockup - Simple Clean Editor Preview */}
        <div className="w-full max-w-4xl mt-16 border border-slate-200 dark:border-slate-900 bg-white/50 dark:bg-zinc-900/10 rounded-3xl p-2 shadow-xl dark:shadow-2xl backdrop-blur-xs relative group transition-all duration-300">
          <div className="absolute inset-0 bg-indigo-600/5 blur-[80px] rounded-3xl pointer-events-none z-0" />
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900/50 rounded-2xl overflow-hidden aspect-[16/9] relative z-10 flex flex-col transition-all duration-300">
            {/* Mock Editor Topbar */}
            <div className="h-10 border-b border-slate-200 dark:border-zinc-900 bg-slate-50 dark:bg-slate-950/80 px-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 transition-colors duration-300">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-800" />
                <span className="font-bold text-slate-600 dark:text-slate-400">Preview Editor — Snapform</span>
              </div>
              <div className="w-20 h-4 rounded bg-slate-200 dark:bg-slate-900" />
            </div>
            
            {/* Mock Editor Content */}
            <div className="flex-1 flex bg-slate-50/20 dark:bg-slate-950/20">
              <div className="w-1/4 border-r border-slate-200 dark:border-zinc-900 p-3 space-y-2 hidden md:block">
                <div className="w-full h-8 rounded bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-900 flex items-center px-2 gap-2 text-xs text-slate-600 dark:text-slate-400 font-semibold shadow-sm">
                  <Shirt size={10} />
                  <span>Jas Formal Navy</span>
                </div>
                <div className="w-full h-8 rounded bg-white dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-900 flex items-center px-2 gap-2 text-xs text-slate-500 dark:text-slate-500">
                  <ImageIcon size={10} />
                  <span>Biru Studio</span>
                </div>
                <div className="w-full h-8 rounded bg-white dark:bg-slate-900/20 border border-slate-200/60 dark:border-slate-900 flex items-center px-2 gap-2 text-xs text-slate-500 dark:text-slate-500">
                  <SlidersHorizontal size={10} />
                  <span>Kecerahan</span>
                </div>
              </div>
              <div className="flex-1 bg-slate-100/30 dark:bg-slate-950/40 flex items-center justify-center relative">
                {/* Mock Image Box */}
                <div className="w-48 aspect-[3/4] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 text-center text-slate-450 dark:text-slate-600 shadow-sm transition-all">
                  <ImageIcon size={22} className="mb-2 opacity-50 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-semibold">Tampilan Editor Visual 3-Panel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FITUR UTAMA SECTION */}
      <section id="fitur" className="py-24 border-t border-slate-200 dark:border-zinc-900 bg-white/40 dark:bg-slate-950/30 relative z-10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-200">Eksplorasi Kemudahan Snapform</h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">Kami merancang editor foto berbasis preset visual untuk mempercepat kebutuhan foto formal Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature card 1 */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                <Shirt size={18} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Ganti Outfit AI</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Ubah pakaian kasual Anda menjadi jas formal, blazer, batik, atau jaket semi-formal secara instan dengan hasil yang menyatu alami.</p>
              </div>
            </div>

            {/* Feature card 2 */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                <ImageIcon size={18} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Latar Belakang Studio AI</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Ganti latar belakang foto Anda dengan preset warna studio padat, interior kantor profesional, perpustakaan, atau pemandangan luar ruangan.</p>
              </div>
            </div>

            {/* Feature card 3 */}
            <div className="bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md group">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-300">
                <SlidersHorizontal size={18} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-200">Editor Dasar Gratis</h3>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Sesuaikan kecerahan, kontras, saturasi, serta rotasi, potong gambar, dan bubuhkan teks caption gratis tanpa konsumsi kuota kredit.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KEUNGGULAN SECTION */}
      <section id="keunggulan" className="py-20 border-t border-slate-200 dark:border-slate-800/60 bg-slate-100/30 dark:bg-slate-950/40 relative z-10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-200">Keamanan & Keandalan Terjamin</h2>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">Privasi foto wajah dan kualitas hasil akhir merupakan prioritas utama dalam produk Snapform.</p>
            </div>
            
            <div className="space-y-5">
              <div className="flex gap-3">
                <div className="text-indigo-600 dark:text-indigo-400 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">Perlindungan Identitas</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">AI kami hanya memodifikasi pakaian dan latar belakang subjek tanpa melakukan face-swap atau mengubah kontur wajah asli Anda.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-indigo-600 dark:text-indigo-400 mt-0.5">
                  <Zap size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">Keamanan Sisi Server</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Seluruh pemrosesan AI dilindungi di server tanpa mengekspos API Key ke peramban client, mencegah manipulasi data.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="text-indigo-600 dark:text-indigo-400 mt-0.5">
                  <CheckCircle2 size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">Pencegahan Konten NSFW</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Pola moderasi otomatis menyaring gambar masukan dan keluaran demi menjamin foto bebas dari unsur sensitif dan kekerasan.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm transition-all duration-300">
            <h3 className="text-xs md:text-sm font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Garansi Snapform</h3>
            <ul className="space-y-3 text-xs md:text-sm text-slate-600 dark:text-slate-350">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Tanpa watermark pada foto hasil ekspor</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Unduhan beresolusi tinggi (HD)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>10 kredit generasi gratis untuk pengguna baru</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                <span>Foto disimpan sementara dan dihapus otomatis setelah diunduh</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="h-16 px-4 md:px-8 border-t border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 z-10 relative transition-colors duration-300">
        <span className="pl-12 md:pl-0">&copy; 2026 Snapform. Hak Cipta Dilindungi Undang-Undang.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-600 dark:hover:text-slate-300 transition-colors">Ketentuan Layanan</a>
          <a href="#" className="hover:text-indigo-600 dark:hover:text-slate-300 transition-colors">Kebijakan Privasi</a>
        </div>
      </footer>

    </div>
  );
}
