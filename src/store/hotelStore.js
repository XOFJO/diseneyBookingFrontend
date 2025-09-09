import { create } from "zustand";

const useHotelStore = create((set) => ({
  hotels: [],
  searchResults: [],
  selectedHotelId: null, // 新增选中的酒店ID
  loading: false,
  error: null,
  setHotels: (hotels) => set({ hotels }),
  setSearchResults: (searchResults) => set({ searchResults }),
  setSelectedHotelId: (hotelId) => set({ selectedHotelId: hotelId }), // 新增设置选中酒店ID的方法
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

export default useHotelStore;