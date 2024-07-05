import { create } from "zustand"

interface UseSkillModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSkillModal = create<UseSkillModal>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
