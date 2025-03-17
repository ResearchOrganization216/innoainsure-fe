import { create } from "zustand";

type SidebarState = {
  isExpanded: boolean;
  toggleSidebar: () => void;
  setSidebar: (isExpanded: boolean) => void;
  isMobile: boolean;
  setMobile: (isMobile: boolean) => void;
};

const useSidebarStore = create<SidebarState>((set) => ({
  isExpanded: true,
  toggleSidebar: () => set((state) => ({ isExpanded: !state.isExpanded })),
  setSidebar: (isExpanded: boolean) => set({ isExpanded }),
  isMobile: false,
  setMobile: (isMobile) => set({ isMobile }),
}));

export default useSidebarStore;
