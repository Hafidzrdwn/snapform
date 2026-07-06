"use client";

import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Info } from 'lucide-react';

interface AdvancedDisclaimerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AdvancedDisclaimer({
  isOpen,
  onOpenChange,
  onConfirm,
  onCancel
}: AdvancedDisclaimerProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay blur */}
        <Dialog.Overlay className="fixed inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-xs z-50 transition-opacity" />
        
        {/* Content Box */}
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl z-50 focus:outline-none transition-all duration-300 text-slate-850 dark:text-slate-50">
          
          <Dialog.Title className="text-base font-bold text-slate-900 dark:text-zinc-105 flex items-center gap-2 mb-3">
            <Info className="text-indigo-600 dark:text-indigo-400" size={18} />
            <span>Persetujuan Mode Lanjutan AI</span>
          </Dialog.Title>
          
          <Dialog.Description className="text-xs md:text-sm text-slate-500 dark:text-zinc-400 leading-relaxed space-y-3 mb-6">
            <span className="block">Mode Lanjutan memungkinkan Anda mengetik instruksi khusus secara bebas untuk memodifikasi pakaian, latar belakang, dan gaya visual foto Anda.</span>
            <span className="block border-l-2 border-indigo-600 dark:border-indigo-500 pl-3 py-1.5 bg-indigo-50/50 dark:bg-indigo-500/5 text-slate-800 dark:text-zinc-300 font-semibold">
              <strong>PENTING:</strong> Fitur ini hanya boleh digunakan untuk mengubah pakaian, latar belakang, dan gaya. Permintaan yang mengandung unsur pornografi/NSFW, kekerasan, senjata, atau manipulasi identitas tokoh publik akan otomatis ditolak dan dapat memicu pembekuan kredit Anda.
            </span>
          </Dialog.Description>
          
          <div className="flex gap-3 justify-end">
            <button 
              onClick={onCancel}
              className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-zinc-850 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 rounded-xl text-xs md:text-sm font-bold transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button 
              onClick={onConfirm}
              className="px-4 py-2 bg-indigo-650 dark:bg-indigo-600 hover:bg-indigo-550 dark:hover:bg-indigo-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-md shadow-indigo-600/10 transition-colors cursor-pointer"
            >
              Saya Setuju & Lanjutkan
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
