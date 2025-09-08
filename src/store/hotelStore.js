import { create } from "zustand";

const useHotelStore = create((set) => ({
  hotels: [],
  searchResults: [],
  loading: false,
  error: null,
  setHotels: (hotels) => set({ hotels }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useHotelStore;