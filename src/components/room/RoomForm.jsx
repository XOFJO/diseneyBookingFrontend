import React, { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import GuestSelector from "./GuestSelector";
import DateRoomPicker from "./DateRoomPicker";
import RoomDetails from "./RoomDetails";
import BookingSummary from "./BookingSummary";
import ThemeSelector from "./ThemeSelector";
import useSearchStore from '../../store/searchStore'

const RoomForm = () => {
  // Get search data from zustand store
  const { 
    checkIn, 
    checkOut, 
    guests, 
    children, 
    rooms, 
    nights,
    getSearchData 
  } = useSearchStore()

  // State for room results
  const [activeTab, setActiveTab] = useState("standard");
  const [showPriceDetail, setShowPriceDetail] = useState(false); // 控制价格明细显示状态
  const [selectedRoom, setSelectedRoom] = useState(null); // 保存选中的房间信息

  // Disney themed room data
  const mockRooms = [
    {
      id: 1,
      name: "Fairytale Dream Room",
      price: 2594.0,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Views of Garden",
      bedInfo:
        "2 Double Beds and 1 Child Murphy Bed • Murphy bed sized 1.64m x 0.95m",
      occupancy:
        "Sleeps up to 2 Adults and 1 Child aged 3-11 years old (both inclusive)",
      available: 5,
      category: "deluxe",
    },
    {
      id: 2,
      name: "Deluxe Lake View",
      price: 2800.0,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Views of Lake",
      bedInfo:
        "2 Double Beds",
      occupancy:
        "Sleeps up to 3 Adults",
      available: 3,
      category: "deluxe",
    },
    {
      id: 3,
      name: "Deluxe Park View",
      price: 2980.0,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Views of Park",
      bedInfo:
        "2 Double Beds",
      occupancy:
        "Sleeps up to 3 Adults",
      available: 2,
      category: "deluxe",
    },
    {
      id: 4,
      name: "Mickey Mouse Suite",
      price: 3500.0,
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      description: "Mickey Mouse themed suite",
      bedInfo:
        "1 King Bed and 1 Sofa Bed",
      occupancy:
        "Sleeps up to 4 Adults",
      available: 1,
      category: "suite",
    },
  ];


  const handleSearch = () => {
    const searchData = getSearchData()
    console.log("Searching with:", searchData);
  };

  const handleBookNow = (roomId) => {
    console.log("Booking room:", roomId);
    // 查找选中的房间
    const room = mockRooms.find(r => r.id === roomId);
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

  // Calculate nights from zustand store
  const calculateNights = () => {
    return nights > 0 ? nights : 1;
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
            />
          </div>

          {/* Room Selection - Scrollable */}
          <div className="bg-white rounded-lg">
            <RoomDetails
              mockRooms={mockRooms}
              onViewDetails={handleViewDetails}
              onBookNow={handleBookNow}
            />
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