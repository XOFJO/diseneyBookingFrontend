import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";
import DateRoomPicker from "./DateRoomPicker";
import RoomDetails from "./RoomDetails";
import BookingSummary from "./BookingSummary";
import ThemeSelector from "./ThemeSelector";
import { useRooms } from "../../hooks/useRooms";

const RoomForm = () => {
  // State for booking preferences
  const [checkIn, setCheckIn] = useState("2025-09-09");
  const [checkOut, setCheckOut] = useState("2025-09-10");
  const [guests, setGuests] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [hotelId] = useState("1"); // Default hotel ID

  // State for room results
  const [activeTab, setActiveTab] = useState("all");
  const [showPriceDetail, setShowPriceDetail] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Use the useRooms hook to fetch room data
  const { 
    rooms: roomsData, 
    loading: roomsLoading, 
    error: roomsError, 
    refetchRooms 
  } = useRooms(hotelId, checkIn, checkOut, rooms, true);

  // Transform backend data to match the component's expected format
  const transformedRooms = roomsData.map((themeRoom, index) => ({
    id: themeRoom.sampleRoom.roomId || index + 1,
    name: themeRoom.sampleRoom.roomName,
    price: themeRoom.sampleRoom.price,
    image: themeRoom.sampleRoom.imageUrls && themeRoom.sampleRoom.imageUrls !== "[]" 
      ? JSON.parse(themeRoom.sampleRoom.imageUrls)[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: themeRoom.sampleRoom.description,
    bedInfo: themeRoom.sampleRoom.description,
    occupancy: themeRoom.sampleRoom.description,
    available: themeRoom.availableRoomCount,
    category: "deluxe",
    themeName: themeRoom.themeName,
    rating: themeRoom.sampleRoom.rating,
    averageRating: themeRoom.averageRating
  }));

  // Extract unique theme names for the ThemeSelector
  const availableThemes = [...new Set(roomsData.map(room => room.themeName))];

  // Filter rooms based on selected theme
  const filteredRooms = activeTab === "all" 
    ? transformedRooms 
    : transformedRooms.filter(room => 
        room.themeName.toLowerCase().replace(/\s+/g, '-') === activeTab
      );

  const handleDateChange = (newCheckIn, newCheckOut) => {
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);
  };

  const handleGuestChange = (newGuests, newChildren, newRooms) => {
    setGuests(newGuests);
    setChildren(newChildren);
    setRooms(newRooms);
  };

  const handleSearch = () => {
    console.log("Searching with:", {
      checkIn,
      checkOut,
      guests,
      children,
      rooms,
      hotelId,
    });
    // Refetch rooms with current parameters
    refetchRooms();
  };

  const handleBookNow = (roomId) => {
    console.log("Booking room:", roomId);
    // 查找选中的房间
    const room = filteredRooms.find(r => r.id === roomId);
    setSelectedRoom(room);
    // 展开价格明细，一旦展开就不会再关闭
    setShowPriceDetail(true);
  };

  const handleViewDetails = (roomId) => {
    console.log("Viewing details for room:", roomId);
  };

  const handleThemeFilter = (theme) => {
    console.log("Filtering by theme:", theme);
  };

  // Helper function to format date for display
  const formatDateForDisplay = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate nights
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const diffTime = checkOutDate - checkInDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 1;
    }
    return 1;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex min-h-screen">
        {/* Left Side - Main Content */}
        <div className="flex-1 mr-6">
          {/* Header Section */}
          <div className="bg-white rounded-t-lg p-6 border-b">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4"></div>
              <div className="flex items-start justify-between gap-6"></div>
            </div>
            <div>
              <DateRoomPicker />
            </div>
          </div>

          {/* Theme Selector */}
          <div className="bg-white p-6">
            <ThemeSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onThemeFilter={handleThemeFilter}
              themes={availableThemes}
            />
          </div>

          {/* Room Selection - Scrollable */}
          <div className="bg-white rounded-lg">
            {roomsLoading ? (
              <div className="p-6 text-center">Loading rooms...</div>
            ) : roomsError ? (
              <div className="p-6 text-center text-red-500">
                Error loading rooms: {roomsError}
                <button 
                  onClick={refetchRooms}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Retry
                </button>
              </div>
            ) : (
              <RoomDetails
                mockRooms={filteredRooms}
                onViewDetails={handleViewDetails}
                onBookNow={handleBookNow}
              />
            )}
          </div>
        </div>

        {/* Right Side - Sticky Booking Summary */}
        <div className="w-96">
          <div className="fixed top-25">
            <BookingSummary
              checkIn={checkIn}
              checkOut={checkOut}
              rooms={rooms}
              guests={guests}
              children={children}
              calculateNights={calculateNights}
              formatDateForDisplay={formatDateForDisplay}
              showPriceDetail={showPriceDetail}
              selectedRoom={selectedRoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomForm;
/* eslint-disable no-unused-vars */