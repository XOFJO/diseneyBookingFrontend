import React from "react";
import SearchForm from "../components/search/SearchForm";

const HomePage = () => {
  return (
    <div 
      className="h-screen w-screen flex items-center justify-center p-8 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/src/assets/image.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Center content area */}
      <div className="relative z-10 w-full max-w-lg">
        <SearchForm />
      </div>
    </div>
  );
};

export default HomePage;