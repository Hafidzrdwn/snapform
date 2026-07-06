"use client";

import React from 'react';
import { History } from 'lucide-react';
import { useEditorStore } from '@/lib/store/editorStore';

export default function SidebarRight() {
  const {
    selectedPresetId,
    generationStatus,
    history,
    historyIndex
  } = useEditorStore();

  // Mock list of all presets to resolve name
  const allPresets = [
    { id: 'outfit_formal_navy', name: 'Jas Navy' },
    { id: 'outfit_formal_black', name: 'Tuksedo Hitam' },
    { id: 'outfit_blazer_grey', name: 'Blazer Abu' },
    { id: 'outfit_batik_red', name: 'Batik Merah' },
    { id: 'outfit_casual_bomber', name: 'Jaket Bomber' },
    { id: 'outfit_casual_hoodie', name: 'Hoodie Simpel' },
    { id: 'bg_studio_blue', name: 'Biru Studio' },
    { id: 'bg_studio_grey', name: 'Abu Gradien' },
    { id: 'bg_office_blur', name: 'Kantor Blur' },
    { id: 'bg_library', name: 'Perpustakaan' },
    { id: 'bg_outdoor_garden', name: 'Taman Kampus' },
    { id: 'bg_cafe_warm', name: 'Kafe Estetik' },
  ];

  const getPresetName = (id: string | null) => {
    if (!id) return 'Tidak ada';
    const found = allPresets.find(p => p.id === id);
    return found ? found.name : id;
  };

  const handleRollback = (index: number, url: string) => {
    useEditorStore.setState({
      historyIndex: index,
      resultImageUrl: index === 0 ? null : url
    });
  };

  return (
    <aside className="hidden lg:flex w-72 border-l border-slate-200 dark:border-slate-800 flex-col bg-slate-50/70 dark:bg-slate-900/60 backdrop-blur-md p-4 space-y-6 transition-colors duration-300 text-slate-900 dark:text-slate-50">
      
      {/* Preset Context Info */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Status & Detail</h4>
        <div className="bg-white dark:bg-slate-950/20 border border-slate-200 dark:border-slate-850 rounded-xl p-3.5 space-y-2.5 shadow-sm">
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-slate-450 dark:text-slate-500 font-semibold">Preset Aktif:</span>
            <span className="text-slate-700 dark:text-slate-200 font-bold truncate max-w-[120px]" title={getPresetName(selectedPresetId)}>
              {getPresetName(selectedPresetId)}
            </span>
          </div>
          <div className="flex justify-between text-xs md:text-sm">
            <span className="text-slate-450 dark:text-slate-500 font-semibold">Status Edit:</span>
            <span className={`font-extrabold ${
              generationStatus === 'pending' ? 'text-amber-600 dark:text-amber-400' :
              generationStatus === 'complete' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
            }`}>
              {generationStatus === 'idle' && 'Kosong'}
              {generationStatus === 'pending' && 'Memproses...'}
              {generationStatus === 'complete' && 'Selesai'}
            </span>
          </div>
        </div>
      </div>

      {/* Edit History Strip */}
      <div className="flex-1 flex flex-col min-h-0 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Riwayat Edit</h4>
          <span className="text-xs text-slate-450 dark:text-slate-550 font-semibold">{history.length} langkah</span>
        </div>
        
        {history.length === 0 ? (
          <div className="flex-1 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center p-4 text-center text-slate-400 dark:text-slate-700">
            <History size={18} className="mb-2 opacity-50" />
            <span className="text-xs font-semibold">Belum ada riwayat</span>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {history.map((url, idx) => (
              <button
                key={idx}
                onClick={() => handleRollback(idx, url)}
                className={`w-full flex items-center gap-3 p-2 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                  idx === historyIndex 
                    ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-600/5 shadow-sm' 
                    : 'border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-12 rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200/60 dark:border-slate-800 flex items-center justify-center">
                  <img src={url} alt={`Riwayat ${idx}`} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                    {idx === 0 ? 'Gambar Asli' : `Langkah #${idx}`}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">
                    {idx === 0 ? 'Unggahan awal' : 'Edit AI / Filter'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
