import React from "react";
import SearchForm from "../components/search/SearchForm";
import HotelDetailHeader from "../components/room/HotelDetailHeader";
import DisneyBackground from "../components/common/DisneyBackground";
const HomePage = () => {
  return (
    <div>
      <HotelDetailHeader />
      <DisneyBackground />

      <div
        className="h-screen w-screen flex items-center justify-center p-8 relative overflow-hidden"
      >
        {/* Center content area */}
        <div className="relative z-10 w-full max-w-6xl">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;