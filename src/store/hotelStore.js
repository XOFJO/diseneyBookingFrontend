import { create } from "zustand";

const useHotelStore = create((set) => ({
  hotels: [],
  setHotels: (hotels) => set({ hotels }),
}));

export default useHotelStore;