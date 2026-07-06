"use client";

import React, { useState, useEffect } from 'react';
import { useEditorStore, EditorMode } from '@/lib/store/editorStore';

// Impor komponen modular
import TopBar from '@/components/editor/TopBar';
import SidebarLeft from '@/components/editor/SidebarLeft';
import CanvasArea from '@/components/editor/CanvasArea';
import SidebarRight from '@/components/editor/SidebarRight';
import MobilePanel from '@/components/editor/MobilePanel';
import AdvancedDisclaimer from '@/components/editor/AdvancedDisclaimer';

export default function EditorPage() {
  const {
    activeMode,
    sourceImageUrl,
    advancedModeEnabled,
    setActiveMode,
    setSourceImageUrl,
    setResultImageUrl,
    setGenerationStatus,
    setAdvancedModeEnabled,
    initTheme
  } = useEditorStore();

  // Local UI States
  const [showAdvancedDisclaimer, setShowAdvancedDisclaimer] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');
  const [beforeAfterRatio, setBeforeAfterRatio] = useState(50);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHistoryOpenMobile, setIsHistoryOpenMobile] = useState(false);

  // Inisialisasi tema saat pertama kali render
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Handle Mock Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setSourceImageUrl(url);
    }
  };

  // Trigger Mock Generation AI
  const handleGenerate = (type: 'preset' | 'advanced') => {
    if (!sourceImageUrl) return;
    
    setGenerationStatus('pending');
    
    // Simulasikan delay generate AI selama 3 detik
    setTimeout(() => {
      setResultImageUrl(sourceImageUrl);
      setGenerationStatus('complete');
      useEditorStore.setState((state) => ({
        creditsRemaining: Math.max(0, state.creditsRemaining - 1)
      }));
    }, 3000);
  };

  // Navigasi Tabs dengan pengecekan persetujuan disclaimer Mode Lanjutan
  const handleTabChange = (value: string) => {
    const mode = value as EditorMode;
    
    if (mode === 'advanced' && !advancedModeEnabled) {
      setShowAdvancedDisclaimer(true);
    } else {
      setActiveMode(mode);
    }
  };

  const confirmAdvancedMode = () => {
    setAdvancedModeEnabled(true);
    setActiveMode('advanced');
    setShowAdvancedDisclaimer(false);
  };

  const cancelAdvancedMode = () => {
    setShowAdvancedDisclaimer(false);
    setActiveMode('outfit');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex flex-col font-sans select-none relative overflow-hidden transition-colors duration-300">
      
      {/* Hiasan Dekorasi Mikro: Soft Blur Gradient di latar belakang kanvas */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* BILAH ATAS (TOP BAR) */}
      <TopBar onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />

      {/* EDITOR AREA WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* PANEL KIRI (SIDEBAR LEFT - Nav Tabs Desktop) */}
        <SidebarLeft 
          onTabChange={handleTabChange}
          onGenerate={handleGenerate}
          customPrompt={customPrompt}
          onCustomPromptChange={setCustomPrompt}
        />

        {/* AREA KERJA TENGAH (CANVAS AREA) */}
        <CanvasArea 
          onImageUpload={handleImageUpload}
          beforeAfterRatio={beforeAfterRatio}
          onBeforeAfterRatioChange={setBeforeAfterRatio}
        />

        {/* PANEL KANAN (SIDEBAR RIGHT - Properti & Riwayat Desktop) */}
        <SidebarRight />

      </div>

      {/* PANEL MOBILE (Navigation & Bottom Sheets) */}
      <MobilePanel 
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
        isHistoryOpenMobile={isHistoryOpenMobile}
        onHistoryOpenMobileClose={() => setIsHistoryOpenMobile(false)}
        onGenerate={handleGenerate}
        customPrompt={customPrompt}
        onCustomPromptChange={setCustomPrompt}
        onHistoryTrigger={() => setIsHistoryOpenMobile(true)}
        onTabTrigger={(tabName) => {
          handleTabChange(tabName);
          setIsMobileMenuOpen(true);
        }}
      />

      {/* RADIX DIALOG - DISCLAIMER PERSETUJUAN MODE LANJUTAN */}
      <AdvancedDisclaimer 
        isOpen={showAdvancedDisclaimer}
        onOpenChange={setShowAdvancedDisclaimer}
        onConfirm={confirmAdvancedMode}
        onCancel={cancelAdvancedMode}
      />

    </div>
  );
}
