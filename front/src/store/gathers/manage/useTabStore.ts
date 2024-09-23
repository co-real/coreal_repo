import { create } from "zustand";

type TabState = {
  activeTab: "applied" | "created";
  setActiveTab: (tab: "applied" | "created") => void;
};

export const useTabStore = create<TabState>((set) => ({
  activeTab: "applied",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
