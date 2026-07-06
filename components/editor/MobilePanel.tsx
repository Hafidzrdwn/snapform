"use client";

import React from 'react';
import { 
  Shirt, 
  ImageIcon, 
  SlidersHorizontal, 
  Wand2, 
  History, 
  X, 
  Sparkles 
} from 'lucide-react';
import { useEditorStore } from '@/lib/store/editorStore';

interface MobilePanelProps {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
  isHistoryOpenMobile: boolean;
  onHistoryOpenMobileClose: () => void;
  onGenerate: (type: 'preset' | 'advanced') => void;
  customPrompt: string;
  onCustomPromptChange: (value: string) => void;
  onHistoryTrigger: () => void;
  onTabTrigger: (tabName: string) => void;
}

export default function MobilePanel({
  isMobileMenuOpen,
  onMobileMenuClose,
  isHistoryOpenMobile,
  onHistoryOpenMobileClose,
  onGenerate,
  customPrompt,
  onCustomPromptChange,
  onHistoryTrigger,
  onTabTrigger
}: MobilePanelProps) {
  const {
    activeMode,
    sourceImageUrl,
    selectedPresetId,
    generationStatus,
    brightness,
    contrast,
    saturation,
    history,
    historyIndex,
    setSelectedPresetId,
    setFilters,
    resetFilters
  } = useEditorStore();

  // Mock Presets for Outfit
  const outfitPresets = [
    { id: 'outfit_formal_navy', name: 'Jas Navy', type: 'Formal' },
    { id: 'outfit_formal_black', name: 'Tuksedo Hitam', type: 'Formal' },
    { id: 'outfit_blazer_grey', name: 'Blazer Abu', type: 'Semi-Formal' },
    { id: 'outfit_batik_red', name: 'Batik Merah', type: 'Etnik' },
    { id: 'outfit_casual_bomber', name: 'Bomber Hijau', type: 'Kasual' },
    { id: 'outfit_casual_hoodie', name: 'Hoodie Simpel', type: 'Kasual' },
  ];

  // Mock Presets for Background
  const backgroundPresets = [
    { id: 'bg_studio_blue', name: 'Biru Studio', type: 'Studio' },
    { id: 'bg_studio_grey', name: 'Abu Gradien', type: 'Studio' },
    { id: 'bg_office_blur', name: 'Kantor Blur', type: 'Profesional' },
    { id: 'bg_library', name: 'Perpustakaan', type: 'Akademis' },
    { id: 'bg_outdoor_garden', name: 'Taman Kampus', type: 'Luar Ruangan' },
    { id: 'bg_cafe_warm', name: 'Kafe Estetik', type: 'Luar Ruangan' },
  ];

  const handleRollback = (index: number, url: string) => {
    useEditorStore.setState({
      historyIndex: index,
      resultImageUrl: index === 0 ? null : url
    });
    onHistoryOpenMobileClose();
  };

  return (
    <>
      {/* MOBILE BAR - Bottom Navigation Bar */}
      <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-2 px-4 flex items-center justify-around z-20 relative text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <button 
          onClick={() => onTabTrigger('outfit')}
          className={`flex flex-col items-center gap-1 p-1 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors duration-200 ${activeMode === 'outfit' ? 'text-indigo-650 dark:text-indigo-400' : ''}`}
        >
          <Shirt size={16} />
          <span className="text-xs font-semibold">Outfit</span>
        </button>
        <button 
          onClick={() => onTabTrigger('background')}
          className={`flex flex-col items-center gap-1 p-1 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors duration-200 ${activeMode === 'background' ? 'text-indigo-650 dark:text-indigo-400' : ''}`}
        >
          <ImageIcon size={16} />
          <span className="text-xs font-semibold">Latar</span>
        </button>
        <button 
          onClick={() => onTabTrigger('basicEditor')}
          className={`flex flex-col items-center gap-1 p-1 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors duration-200 ${activeMode === 'basicEditor' ? 'text-indigo-650 dark:text-indigo-400' : ''}`}
        >
          <SlidersHorizontal size={16} />
          <span className="text-xs font-semibold">Dasar</span>
        </button>
        <button 
          onClick={() => onTabTrigger('advanced')}
          className={`flex flex-col items-center gap-1 p-1 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors duration-200 ${activeMode === 'advanced' ? 'text-indigo-650 dark:text-indigo-400' : ''}`}
        >
          <Wand2 size={16} />
          <span className="text-xs font-semibold">Lanjut</span>
        </button>
        <button 
          onClick={onHistoryTrigger}
          className="flex flex-col items-center gap-1 p-1 text-slate-500 dark:text-slate-400 cursor-pointer transition-colors duration-200"
        >
          <History size={16} />
          <span className="text-xs font-semibold">Riwayat</span>
        </button>
      </div>

      {/* MOBILE COMPONENT OPTIONS PANEL (Bottom Sheet) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl max-h-[70vh] flex flex-col p-4 space-y-4 shadow-2xl transition-all duration-300">
            
            {/* Header bottom sheet */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-850 dark:text-slate-200">
                {activeMode === 'outfit' && 'Pilih Gaya Outfit'}
                {activeMode === 'background' && 'Pilih Latar & Vibe'}
                {activeMode === 'basicEditor' && 'Pengaturan Dasar'}
                {activeMode === 'advanced' && 'Mode Lanjutan (Instruksi)'}
              </span>
              <button 
                onClick={onMobileMenuClose}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Main scrollable body */}
            <div className="flex-1 overflow-y-auto min-h-[30vh]">
              {/* OUTFIT */}
              {activeMode === 'outfit' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {outfitPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPresetId(preset.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer ${
                          selectedPresetId === preset.id 
                            ? 'border-indigo-650 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-600/10' 
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block truncate">{preset.name}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">{preset.type}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!selectedPresetId || !sourceImageUrl || generationStatus === 'pending'}
                    onClick={() => {
                      onGenerate('preset');
                      onMobileMenuClose();
                    }}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
                  >
                    <Sparkles size={14} />
                    <span>Terapkan Outfit AI</span>
                  </button>
                </div>
              )}

              {/* BACKGROUND */}
              {activeMode === 'background' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {backgroundPresets.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => setSelectedPresetId(preset.id)}
                        className={`p-3 rounded-xl border text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm cursor-pointer ${
                          selectedPresetId === preset.id 
                            ? 'border-indigo-650 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-600/10' 
                            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60'
                        }`}
                      >
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-200 block truncate">{preset.name}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">{preset.type}</span>
                      </button>
                    ))}
                  </div>
                  <button
                    disabled={!selectedPresetId || !sourceImageUrl || generationStatus === 'pending'}
                    onClick={() => {
                      onGenerate('preset');
                      onMobileMenuClose();
                    }}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20"
                  >
                    <Sparkles size={14} />
                    <span>Terapkan Latar AI</span>
                  </button>
                </div>
              )}

              {/* BASIC EDITOR */}
              {activeMode === 'basicEditor' && (
                <div className="space-y-4 pb-4">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span>Kecerahan</span>
                        <span className="text-slate-700 dark:text-slate-200">{brightness}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="200" 
                        value={brightness}
                        onChange={(e) => setFilters({ brightness: Number(e.target.value) })}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span>Kontras</span>
                        <span className="text-slate-700 dark:text-slate-200">{contrast}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="200" 
                        value={contrast}
                        onChange={(e) => setFilters({ contrast: Number(e.target.value) })}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <span>Kejenuhan</span>
                        <span className="text-slate-700 dark:text-slate-200">{saturation}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="200" 
                        value={saturation}
                        onChange={(e) => setFilters({ saturation: Number(e.target.value) })}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-800 accent-indigo-600 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={resetFilters}
                    className="w-full py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )}

              {/* ADVANCED */}
              {activeMode === 'advanced' && (
                <div className="space-y-4">
                  <textarea
                    value={customPrompt}
                    onChange={(e) => onCustomPromptChange(e.target.value)}
                    placeholder="Contoh: Ubah jas saya menjadi jas formal berwarna hijau zamrud..."
                    maxLength={150}
                    className="w-full h-24 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-850 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:outline-none focus:border-slate-300 dark:focus:border-slate-750 resize-none"
                  />
                  <button
                    disabled={!customPrompt.trim() || !sourceImageUrl || generationStatus === 'pending'}
                    onClick={() => {
                      onGenerate('advanced');
                      onMobileMenuClose();
                    }}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-600/10"
                  >
                    <Sparkles size={14} />
                    <span>Jalankan AI</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MOBILE HISTORY PANEL (Bottom Sheet) */}
      {isHistoryOpenMobile && (
        <div className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-30 flex flex-col justify-end">
          <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-t-3xl max-h-[60vh] flex flex-col p-4 space-y-4 shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-850 dark:text-slate-200">Riwayat Edit</span>
              <button 
                onClick={onHistoryOpenMobileClose}
                className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 min-h-[25vh]">
              {history.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRollback(idx, url)}
                  className={`w-full flex items-center gap-3 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                    idx === historyIndex 
                      ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-650/10' 
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/20'
                  }`}
                >
                  <div className="w-10 h-12 rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <img src={url} alt={`Riwayat ${idx}`} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-750 dark:text-slate-300 block">
                      {idx === 0 ? 'Gambar Asli' : `Langkah #${idx}`}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">
                      {idx === 0 ? 'Unggahan awal' : 'Modifikasi AI'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
