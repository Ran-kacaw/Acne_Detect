import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      detectionResult: null,
      historyList: [],

      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null, detectionResult: null }),
      setResult: (detectionResult) => set({ detectionResult }),
      setHistory: (historyList) => set({ historyList }),
      addToHistory: (record) =>
        set((state) => ({
          historyList: [record, ...state.historyList],
        })),
      removeFromHistory: (id) =>
        set((state) => ({
          historyList: state.historyList.filter((h) => h.id !== id),
        })),
    }),
    {
      name: 'acne-detect-storage',
      partialize: (state) => ({ user: state.user, historyList: state.historyList, detectionResult: state.detectionResult }),
    }
  )
)

