import { create } from 'zustand';

export type EditorMode = 'outfit' | 'background' | 'retouch' | 'basicEditor' | 'advanced';

export interface EditorState {
  // States
  activeMode: EditorMode;
  creditsRemaining: number;
  sourceImageUrl: string | null;
  resultImageUrl: string | null;
  selectedPresetId: string | null;
  generationStatus: 'idle' | 'pending' | 'complete' | 'error';
  error: string | null;
  advancedModeEnabled: boolean;
  
  // Basic Editor Filters
  brightness: number;
  contrast: number;
  saturation: number;
  
  // History Undo/Redo
  history: string[];
  historyIndex: number;

  // Theme Mode
  theme: 'light' | 'dark';

  // Actions
  setActiveMode: (mode: EditorMode) => void;
  setSourceImageUrl: (url: string | null) => void;
  setResultImageUrl: (url: string | null) => void;
  setSelectedPresetId: (presetId: string | null) => void;
  setGenerationStatus: (status: 'idle' | 'pending' | 'complete' | 'error') => void;
  setError: (error: string | null) => void;
  setAdvancedModeEnabled: (enabled: boolean) => void;
  setFilters: (filters: { brightness?: number; contrast?: number; saturation?: number }) => void;
  resetFilters: () => void;
  pushToHistory: (url: string) => void;
  undo: () => void;
  redo: () => void;
  resetStore: () => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Default States
  activeMode: 'outfit',
  creditsRemaining: 10,
  sourceImageUrl: null,
  resultImageUrl: null,
  selectedPresetId: null,
  generationStatus: 'idle',
  error: null,
  advancedModeEnabled: false,
  
  brightness: 100,
  contrast: 100,
  saturation: 100,
  
  history: [],
  historyIndex: -1,
  theme: 'light',

  // Actions
  setActiveMode: (mode) => set({ activeMode: mode, error: null }),
  
  setSourceImageUrl: (url) => set((state) => {
    if (!url) {
      return {
        sourceImageUrl: null,
        resultImageUrl: null,
        history: [],
        historyIndex: -1,
        selectedPresetId: null,
        error: null,
      };
    }
    
    // Inisialisasi history saat pertama kali upload gambar
    return {
      sourceImageUrl: url,
      resultImageUrl: null,
      history: [url],
      historyIndex: 0,
      selectedPresetId: null,
      error: null,
    };
  }),
  
  setResultImageUrl: (url) => set((state) => {
    if (!url) return {};
    
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(url);
    
    return {
      resultImageUrl: url,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      error: null,
    };
  }),
  
  setSelectedPresetId: (presetId) => set({ selectedPresetId: presetId }),
  
  setGenerationStatus: (status) => set({ generationStatus: status }),
  
  setError: (error) => set({ error }),
  
  setAdvancedModeEnabled: (enabled) => set({ advancedModeEnabled: enabled }),
  
  setFilters: (filters) => set((state) => ({
    brightness: filters.brightness !== undefined ? filters.brightness : state.brightness,
    contrast: filters.contrast !== undefined ? filters.contrast : state.contrast,
    saturation: filters.saturation !== undefined ? filters.saturation : state.saturation,
  })),
  
  resetFilters: () => set({
    brightness: 100,
    contrast: 100,
    saturation: 100,
  }),
  
  pushToHistory: (url) => set((state) => {
    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(url);
    return {
      history: newHistory,
      historyIndex: newHistory.length - 1,
      resultImageUrl: url,
    };
  }),
  
  undo: () => set((state) => {
    if (state.historyIndex > 0) {
      const prevIndex = state.historyIndex - 1;
      const prevUrl = state.history[prevIndex];
      return {
        historyIndex: prevIndex,
        resultImageUrl: prevIndex === 0 ? null : prevUrl,
      };
    }
    return {};
  }),
  
  redo: () => set((state) => {
    if (state.historyIndex < state.history.length - 1) {
      const nextIndex = state.historyIndex + 1;
      const nextUrl = state.history[nextIndex];
      return {
        historyIndex: nextIndex,
        resultImageUrl: nextIndex === 0 ? null : nextUrl,
      };
    }
    return {};
  }),
  
  resetStore: () => set({
    activeMode: 'outfit',
    sourceImageUrl: null,
    resultImageUrl: null,
    selectedPresetId: null,
    generationStatus: 'idle',
    error: null,
    advancedModeEnabled: false,
    brightness: 100,
    contrast: 100,
    saturation: 100,
    history: [],
    historyIndex: -1,
  }),
  
  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      if (nextTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      localStorage.setItem('theme', nextTheme);
    }
    set({ theme: nextTheme });
  },

  initTheme: () => {
    if (typeof window !== 'undefined') {
      const cachedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const activeTheme = cachedTheme || (systemPrefersDark ? 'dark' : 'light');
      
      const root = window.document.documentElement;
      if (activeTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      set({ theme: activeTheme });
    }
  },
}));
