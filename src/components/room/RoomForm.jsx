import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";
import DateRoomPicker from "./DateRoomPicker";
import RoomDetails from "./RoomDetails";
import BookingSummary from "./BookingSummary";
import ThemeSelector from "./ThemeSelector";
import useSearchStore from "../../store/searchStore";
import useHotelStore from "../../store/hotelStore";

const RoomForm = ({ roomsData, roomsLoading, roomsError, onSearch }) => {
  // 从zustand store获取搜索条件
  const { checkIn, checkOut, rooms } = useSearchStore();
  const { selectedHotelId } = useHotelStore();
  
  // 本地状态 - 用于显示控制
  const [guests, setGuests] = useState(2);
  const [children, setChildren] = useState(0);
  
  // State for room results
  const [activeTab, setActiveTab] = useState("all");
  const [showPriceDetail, setShowPriceDetail] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Transform backend data to match the component's expected format
  const transformedRooms = (roomsData || []).map((themeRoom, index) => ({
    id: themeRoom.sampleRoom.roomId ? `${themeRoom.sampleRoom.roomId}_${index}` : `room_${index + 1}`,
    name: themeRoom.sampleRoom.roomName,
    price: themeRoom.sampleRoom.price,
    image: themeRoom.sampleRoom.imageUrls && themeRoom.sampleRoom.imageUrls !== "" 
      ? themeRoom.sampleRoom.imageUrls || "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    description: themeRoom.sampleRoom.description,
    bedInfo: themeRoom.sampleRoom.description,
    occupancy: themeRoom.sampleRoom.description,
    available: themeRoom.availableRoomCount,
    category: "deluxe",
    themeName: themeRoom.themeName,
    rating: themeRoom.averageRating,
    averageRating: themeRoom.averageRating,
    roomName: themeRoom.sampleRoom.roomName // 添加roomName字段用于排序
  })).sort((a, b) => a.roomName.localeCompare(b.roomName)); // 按房间名字符顺序排序

  // Extract unique theme names for the ThemeSelector
  const availableThemes = [...new Set((roomsData || []).map(room => room.themeName))];

  // Debug log for transformed rooms
  React.useEffect(() => {
    if (transformedRooms.length > 0) {
      console.log("Transformed rooms:", transformedRooms);
      console.log("Room IDs:", transformedRooms.map(r => ({ id: r.id, name: r.name })));
    }
  }, [transformedRooms]);

  // Filter rooms based on selected theme
  const filteredRooms = activeTab === "all" 
    ? transformedRooms 
    : transformedRooms.filter(room => 
        room.themeName.toLowerCase().replace(/\s+/g, '-') === activeTab
      );

  const handleGuestChange = (newGuests, newChildren) => {
    setGuests(newGuests);
    setChildren(newChildren);
  };

  const handleSearch = (newCheckIn, newCheckOut, newRooms) => {
    console.log("Searching with:", {
      checkIn: newCheckIn || checkIn,
      checkOut: newCheckOut || checkOut,
      rooms: newRooms || rooms,
      selectedHotelId,
    });
    // 调用父组件传递的搜索函数
    if (onSearch) {
      onSearch(newCheckIn, newCheckOut, newRooms);
    }
  };

  const handleBookNow = (roomId) => {
    console.log("Booking room ID:", roomId);
    console.log("All available rooms:", filteredRooms);
    // 查找选中的房间
    const room = filteredRooms.find(r => r.id === roomId);
    console.log("Found room:", room);
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

  // Calculate nights using zustand store dates
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
          <div className="bg-white rounded-t-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4"></div>
              <div className="flex items-start justify-between gap-6"></div>
            </div>
            <div>
              <DateRoomPicker onSearch={handleSearch} />
            </div>
          </div>

          {/* Theme Selector */}
          <div className="bg-white p-6 border-t border-gray-100">
            <ThemeSelector
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onThemeFilter={handleThemeFilter}
              themes={availableThemes}
            />
          </div>

          {/* Room Selection - Scrollable */}
          <div className="bg-white rounded-b-lg border-t border-gray-100">
            {roomsLoading ? (
              <div className="p-6 text-center">Loading rooms...</div>
            ) : roomsError ? (
              <div className="p-6 text-center text-red-500">
                Error loading rooms: {roomsError}
                <button 
                  onClick={onSearch}
                  className="ml-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Retry
                </button>
              </div>
            ) : filteredRooms.length === 0 ? (
              <div className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No rooms found
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Sorry, we couldn't find any available rooms for your selected dates and preferences. 
                      Please try adjusting your search criteria or dates.
                    </p>
                  </div>
                </div>
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
              onRefreshSearch={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomForm;
/* eslint-disable no-unused-vars */