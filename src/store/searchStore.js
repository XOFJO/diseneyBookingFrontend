import { create } from "zustand";

const useSearchStore = create((set, get) => ({
  // Search criteria
  selectedHotel: null,
  checkIn: '',
  checkOut: '',
  guests: 2,
  children: 0,
  rooms: 1,
  
  // Derived data
  nights: 0,
  
  // Actions
  setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
  
  setCheckIn: (checkIn) => {
    set({ checkIn });
    get().calculateNights();
  },
  
  setCheckOut: (checkOut) => {
    set({ checkOut });
    get().calculateNights();
  },
  
  setDateRange: (checkIn, checkOut) => {
    set({ checkIn, checkOut });
    get().calculateNights();
  },
  
  setGuests: (guests) => set({ guests }),
  setChildren: (children) => set({ children }),
  setRooms: (rooms) => set({ rooms }),
  
  setGuestInfo: (guests, children, rooms) => set({ 
    guests, 
    children, 
    rooms 
  }),
  
  // Calculate nights between check-in and check-out
  calculateNights: () => {
    const { checkIn, checkOut } = get();
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn + 'T00:00:00');
      const checkOutDate = new Date(checkOut + 'T00:00:00');
      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      set({ nights: diffDays > 0 ? diffDays : 0 });
    } else {
      set({ nights: 0 });
    }
  },
  
  // Get complete search data
  getSearchData: () => {
    const state = get();
    return {
      selectedHotel: state.selectedHotel,
      checkIn: state.checkIn,
      checkOut: state.checkOut,
      guests: state.guests,
      children: state.children,
      rooms: state.rooms,
      nights: state.nights
    };
  },
  
  // Reset search criteria
  resetSearch: () => set({
    selectedHotel: null,
    checkIn: '',
    checkOut: '',
    guests: 2,
    children: 0,
    rooms: 1,
    nights: 0
  }),
  
  // Validation helpers
  isSearchValid: () => {
    const { selectedHotel, checkIn, checkOut, rooms } = get();
    return selectedHotel && checkIn && checkOut && rooms > 0;
  }
}));

export default useSearchStore;