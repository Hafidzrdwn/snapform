"use client";

import React from 'react';
import Link from 'next/link';
import { Undo2, Redo2, Coins, Download, Menu, Sun, Moon } from 'lucide-react';
import { useEditorStore } from '@/lib/store/editorStore';

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

export default function TopBar({ onMobileMenuToggle }: TopBarProps) {
  const {
    creditsRemaining,
    sourceImageUrl,
    history,
    historyIndex,
    undo,
    redo,
    theme,
    toggleTheme
  } = useEditorStore();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 px-4 md:px-6 flex items-center justify-between bg-white/90 dark:bg-slate-900/90 backdrop-blur-md z-10 relative text-slate-900 dark:text-slate-50 transition-colors duration-300">
      
      {/* Logo Link to Home */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-all duration-200 cursor-pointer group">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-lg text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
          S
        </div>
        <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent">
          Snapform
        </span>
      </Link>

      {/* Undo/Redo - Desktop & Tablet */}
      <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 transition-colors duration-300">
        <button 
          onClick={undo}
          disabled={historyIndex <= 0}
          className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:text-slate-400 dark:disabled:text-slate-600 transition-colors cursor-pointer"
          title="Batal (Undo)"
        >
          <Undo2 size={16} />
        </button>
        <button 
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 disabled:opacity-40 disabled:hover:bg-transparent disabled:text-slate-400 dark:disabled:text-slate-600 transition-colors cursor-pointer"
          title="Ulangi (Redo)"
        >
          <Redo2 size={16} />
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-50 transition-colors cursor-pointer"
          title={theme === 'dark' ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Credit Indicator */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-700 dark:text-slate-300 transition-colors duration-300">
          <Coins size={14} className="text-amber-500" />
          <span className="font-semibold text-xs md:text-sm">Kredit: {creditsRemaining}</span>
        </div>

        {/* Export Button */}
        <button 
          disabled={!sourceImageUrl}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white font-semibold text-xs md:text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
        >
          <Download size={14} />
          <span>Ekspor</span>
        </button>
        
        {/* Mobile Menu Trigger */}
        <button 
          onClick={onMobileMenuToggle}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 md:hidden transition-colors cursor-pointer"
        >
          <Menu size={18} />
        </button>
      </div>
    </header>
  );
}
