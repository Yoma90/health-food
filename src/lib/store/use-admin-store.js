import { create } from "zustand";

export const useAdminStore = create((set) => ({
  adminEnabled: false,
  toggleAdminEnable: () => {
    set((state) => ({ adminEnabled: !state.adminEnabled }));
  },
}));
