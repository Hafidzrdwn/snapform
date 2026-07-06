"use client";

import React from 'react';
import { Upload } from 'lucide-react';
import { useEditorStore } from '@/lib/store/editorStore';

interface CanvasAreaProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  beforeAfterRatio: number;
  onBeforeAfterRatioChange: (value: number) => void;
}

export default function CanvasArea({ 
  onImageUpload, 
  beforeAfterRatio, 
  onBeforeAfterRatioChange 
}: CanvasAreaProps) {
  const {
    sourceImageUrl,
    resultImageUrl,
    generationStatus,
    brightness,
    contrast,
    saturation,
    resetStore
  } = useEditorStore();

  return (
    <main className="flex-1 bg-slate-50/20 dark:bg-slate-950/20 flex flex-col items-center justify-center p-4 md:p-6 overflow-hidden relative transition-colors duration-300">
      
      {/* Canvas Wrapper */}
      <div className="relative w-full max-w-2xl aspect-4/5 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center shadow-md dark:shadow-2xl overflow-hidden group transition-all duration-300">
        
        {/* Jika belum ada gambar diunggah */}
        {!sourceImageUrl ? (
          <label className="flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-slate-200/30 dark:hover:bg-slate-800/10 transition-colors w-full h-full">
            <input 
              type="file" 
              accept="image/*" 
              onChange={onImageUpload} 
              className="hidden" 
            />
            <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <Upload size={22} />
            </div>
            <div className="space-y-1.5 mt-4">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">Unggah Foto Anda</span>
              <span className="text-xs text-slate-400 dark:text-slate-550 block">Mendukung format JPG, PNG up to 10MB</span>
            </div>
          </label>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-2 transition-colors duration-300">
            
            {/* Overlay Shimmer/Loading saat AI memproses */}
            {generationStatus === 'pending' && (
              <div className="absolute inset-0 bg-slate-100/90 dark:bg-slate-950/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center gap-3 transition-all duration-300">
                <div className="w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-800 border-t-indigo-650 dark:border-t-indigo-500 animate-spin" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350 animate-pulse">Menghasilkan foto baru...</span>
              </div>
            )}

            {/* Tampilkan perbandingan Before/After jika hasil gambar AI sudah ada */}
            {resultImageUrl ? (
              <div className="relative w-full h-full select-none overflow-hidden rounded-xl">
                {/* Sebelum (Gambar Asli) */}
                <img 
                  src={sourceImageUrl} 
                  alt="Sebelum" 
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                  style={{
                    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
                  }}
                />

                {/* Sesudah (Hasil AI) */}
                <div 
                  className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
                  style={{ clipPath: `polygon(0 0, ${beforeAfterRatio}% 0, ${beforeAfterRatio}% 100%, 0 100%)` }}
                >
                  <img 
                    src={resultImageUrl} 
                    alt="Sesudah" 
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(15deg)`
                    }}
                  />
                </div>

                {/* Slider bar interaktif */}
                <div 
                  className="absolute inset-y-0 w-0.5 bg-white dark:bg-slate-200 cursor-ew-resize z-10 flex items-center justify-center"
                  style={{ left: `${beforeAfterRatio}%` }}
                >
                  <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-100 text-slate-800 dark:text-slate-900 border border-slate-200 dark:border-slate-400 flex items-center justify-center shadow-lg pointer-events-none text-xs font-bold transition-transform group-hover:scale-105">
                    ↔
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={beforeAfterRatio}
                    onChange={(e) => onBeforeAfterRatioChange(Number(e.target.value))}
                    className="absolute inset-y-0 -left-4 w-9 opacity-0 cursor-ew-resize pointer-events-auto"
                  />
                </div>
              </div>
            ) : (
              // Tampilkan gambar asli biasa
              <img 
                src={sourceImageUrl} 
                alt="Sumber" 
                className="w-full h-full object-contain rounded-xl"
                style={{
                  filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%)`
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* Navigasi cepat di bawah kanvas */}
      {sourceImageUrl && (
        <div className="flex gap-4 mt-4">
          <button 
            onClick={resetStore}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-250 font-bold transition-colors cursor-pointer"
          >
            Ganti Gambar
          </button>
          {resultImageUrl && (
            <span className="text-xs text-slate-450 dark:text-slate-550">Geser slider putih untuk melihat sebelum/sesudah</span>
          )}
        </div>
      )}
    </main>
  );
}
