import { create } from 'zustand'

export const useSearchState = create((set) => ({
  value: '',
  setInputString: (newValue) => set((state) => ({ ...state, value: newValue.value })),
}))