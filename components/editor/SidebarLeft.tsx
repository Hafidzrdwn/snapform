"use client";

import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Slider from '@radix-ui/react-slider';
import { 
  Sparkles, 
  Shirt, 
  Image as ImageIcon, 
  SlidersHorizontal, 
  Wand2, 
  Lock
} from 'lucide-react';
import { useEditorStore, EditorMode } from '@/lib/store/editorStore';

interface SidebarLeftProps {
  onTabChange: (value: string) => void;
  onGenerate: (type: 'preset' | 'advanced') => void;
  customPrompt: string;
  onCustomPromptChange: (value: string) => void;
}

export default function SidebarLeft({ 
  onTabChange, 
  onGenerate, 
  customPrompt, 
  onCustomPromptChange 
}: SidebarLeftProps) {
  const {
    activeMode,
    sourceImageUrl,
    selectedPresetId,
    generationStatus,
    brightness,
    contrast,
    saturation,
    setSelectedPresetId,
    setFilters,
    resetFilters
  } = useEditorStore();

  // Mock Presets for Outfit
  const outfitPresets = [
    { id: 'outfit_formal_navy', name: 'Jas Formal Navy', type: 'Formal' },
    { id: 'outfit_formal_black', name: 'Tuksedo Hitam', type: 'Formal' },
    { id: 'outfit_blazer_grey', name: 'Blazer Abu-abu', type: 'Semi-Formal' },
    { id: 'outfit_batik_red', name: 'Batik Merah Elegan', type: 'Etnik' },
    { id: 'outfit_casual_bomber', name: 'Jaket Bomber Hijau', type: 'Kasual' },
    { id: 'outfit_casual_hoodie', name: 'Hoodie Minimalis', type: 'Kasual' },
  ];

  // Mock Presets for Background
  const backgroundPresets = [
    { id: 'bg_studio_blue', name: 'Biru Studio', type: 'Studio' },
    { id: 'bg_studio_grey', name: 'Abu-abu Gradien', type: 'Studio' },
    { id: 'bg_office_blur', name: 'Kantor Modern (Blur)', type: 'Profesional' },
    { id: 'bg_library', name: 'Perpustakaan Klasik', type: 'Akademis' },
    { id: 'bg_outdoor_garden', name: 'Taman Kampus', type: 'Luar Ruangan' },
    { id: 'bg_cafe_warm', name: 'Kafe Estetik Hangat', type: 'Luar Ruangan' },
  ];

  return (
    <Tabs.Root 
      value={activeMode} 
      onValueChange={onTabChange}
      className="hidden md:flex w-80 border-r border-slate-200 dark:border-slate-800 flex-col bg-slate-50/70 dark:bg-slate-900/60 backdrop-blur-md transition-colors duration-300 text-slate-900 dark:text-slate-50"
    >
      <Tabs.List className="flex border-b border-slate-200 dark:border-slate-800 p-2 bg-slate-100/50 dark:bg-slate-950/20 gap-1 overflow-x-auto">
        <Tabs.Trigger 
          value="outfit" 
          className="flex-1 py-2 px-1 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          Outfit
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="background" 
          className="flex-1 py-2 px-1 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          Latar
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="retouch" 
          className="flex-1 py-2 px-1 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          Retouch
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="basicEditor" 
          className="flex-1 py-2 px-1 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          Dasar
        </Tabs.Trigger>
        <Tabs.Trigger 
          value="advanced" 
          className="flex-1 py-2 px-1 rounded-lg text-xs font-bold tracking-wide cursor-pointer transition-all duration-200 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-slate-50 data-[state=active]:shadow-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
        >
          Lanjut
        </Tabs.Trigger>
      </Tabs.List>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* CONTENT: OUTFIT */}
        <Tabs.Content value="outfit" className="space-y-4 outline-none">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Ganti Outfit AI</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pilih gaya busana di bawah ini untuk mengubah pakaian subjek dalam foto.</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {outfitPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-300 ease-out relative overflow-hidden group cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
                  selectedPresetId === preset.id 
                    ? 'border-indigo-650 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-600/10 shadow-sm' 
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-slate-550 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  <Shirt size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block truncate">{preset.name}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">{preset.type}</span>
              </button>
            ))}
          </div>

          <button
            disabled={!selectedPresetId || !sourceImageUrl || generationStatus === 'pending'}
            onClick={() => onGenerate('preset')}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Terapkan Outfit AI</span>
          </button>
        </Tabs.Content>

        {/* CONTENT: BACKGROUND */}
        <Tabs.Content value="background" className="space-y-4 outline-none">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Latar Belakang & Vibe</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Ubah latar belakang subjek dengan cepat menggunakan studio terkurasi.</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {backgroundPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`p-3 rounded-xl border text-left transition-all duration-300 ease-out relative overflow-hidden group cursor-pointer hover:-translate-y-0.5 hover:shadow-md ${
                  selectedPresetId === preset.id 
                    ? 'border-indigo-650 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-600/10 shadow-sm' 
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 flex items-center justify-center text-slate-550 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                  <ImageIcon size={16} />
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block truncate">{preset.name}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">{preset.type}</span>
              </button>
            ))}
          </div>

          <button
            disabled={!selectedPresetId || !sourceImageUrl || generationStatus === 'pending'}
            onClick={() => onGenerate('preset')}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Terapkan Latar AI</span>
          </button>
        </Tabs.Content>

        {/* CONTENT: RETOUCH */}
        <Tabs.Content value="retouch" className="space-y-4 outline-none">
          <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/10 rounded-2xl p-6 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mx-auto border border-slate-200/60 dark:border-slate-700/80">
              <Lock size={18} />
            </div>
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">AI Retouch & Pose</h4>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">Gunakan pose terstandardisasi atau penyesuaian ekspresi wajah.</p>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950 border border-indigo-100 dark:border-indigo-900/50 text-xs font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-wider mx-auto">
              Fase 2 (Segera Hadir)
            </div>
          </div>
        </Tabs.Content>

        {/* CONTENT: BASIC EDITOR */}
        <Tabs.Content value="basicEditor" className="space-y-6 outline-none">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Editor Dasar</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Atur filter visual dasar secara instan (gratis kredit).</p>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Kecerahan</span>
                <span className="text-slate-700 dark:text-slate-300">{brightness}%</span>
              </div>
              <Slider.Root 
                className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                value={[brightness]} 
                onValueChange={(val) => setFilters({ brightness: val[0] })}
                max={200} 
                min={50}
                step={1}
              >
                <Slider.Track className="bg-slate-200 dark:bg-slate-800 relative grow rounded-full h-[3px]">
                  <Slider.Range className="absolute bg-indigo-600 dark:bg-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb 
                  className="block w-4 h-4 bg-white dark:bg-slate-100 rounded-full border border-slate-300 dark:border-slate-600 shadow-md focus:outline-none transition-transform active:scale-110 cursor-grab active:cursor-grabbing" 
                  aria-label="Kecerahan"
                />
              </Slider.Root>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Kontras</span>
                <span className="text-slate-700 dark:text-slate-300">{contrast}%</span>
              </div>
              <Slider.Root 
                className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                value={[contrast]} 
                onValueChange={(val) => setFilters({ contrast: val[0] })}
                max={200} 
                min={50}
                step={1}
              >
                <Slider.Track className="bg-slate-200 dark:bg-slate-800 relative grow rounded-full h-[3px]">
                  <Slider.Range className="absolute bg-indigo-600 dark:bg-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb 
                  className="block w-4 h-4 bg-white dark:bg-slate-100 rounded-full border border-slate-300 dark:border-slate-600 shadow-md focus:outline-none transition-transform active:scale-110 cursor-grab active:cursor-grabbing" 
                  aria-label="Kontras"
                />
              </Slider.Root>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span>Kejenuhan</span>
                <span className="text-slate-700 dark:text-slate-300">{saturation}%</span>
              </div>
              <Slider.Root 
                className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
                value={[saturation]} 
                onValueChange={(val) => setFilters({ saturation: val[0] })}
                max={200} 
                min={50}
                step={1}
              >
                <Slider.Track className="bg-slate-200 dark:bg-slate-800 relative grow rounded-full h-[3px]">
                  <Slider.Range className="absolute bg-indigo-600 dark:bg-indigo-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb 
                  className="block w-4 h-4 bg-white dark:bg-slate-100 rounded-full border border-slate-300 dark:border-slate-600 shadow-md focus:outline-none transition-transform active:scale-110 cursor-grab active:cursor-grabbing" 
                  aria-label="Kejenuhan"
                />
              </Slider.Root>
            </div>
          </div>

          {/* Text Tool */}
          <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Tambahkan Teks</h4>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Ketik teks di sini..." 
                className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 dark:focus:border-slate-700 transition-colors"
              />
              <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer">
                Tambah
              </button>
            </div>
          </div>

          <button 
            onClick={resetFilters}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-750 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Reset Semua Filter
          </button>
        </Tabs.Content>

        {/* CONTENT: ADVANCED MODE */}
        <Tabs.Content value="advanced" className="space-y-4 outline-none">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Mode Lanjutan AI</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tulis instruksi kustom Anda sendiri untuk memodifikasi foto secara spesifik.</p>
          </div>

          <div className="space-y-2">
            <textarea
              value={customPrompt}
              onChange={(e) => onCustomPromptChange(e.target.value)}
              placeholder="Contoh: Ubah jas saya menjadi jas formal berwarna hijau zamrud..."
              maxLength={150}
              className="w-full h-24 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-650 focus:outline-none focus:border-slate-300 dark:focus:border-slate-700 transition-colors resize-none"
            />
            <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500">
              <span>Maks. 150 karakter</span>
              <span>Mengkonsumsi 1 Kredit</span>
            </div>
          </div>

          <button
            disabled={!customPrompt.trim() || !sourceImageUrl || generationStatus === 'pending'}
            onClick={() => onGenerate('advanced')}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/25 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Sparkles size={14} />
            <span>Jalankan Instruksi Kustom</span>
          </button>
        </Tabs.Content>
      </div>
    </Tabs.Root>
  );
}
