import React from 'react'
import RoomForm from '../components/room/RoomForm'
import HotelDetailHeader from '../components/room/HotelDetailHeader'
import DisneyBackground from '../components/common/DisneyBackground'

function HotelDetailPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Dedicated Hotel Detail Header - covers global header completely */}
      <HotelDetailHeader />
      
      {/* 迪士尼星空背景 */}
      <DisneyBackground />
      
      {/* Main Content - adjusted for header height */}
      <div className="relative z-10 p-4 flex items-center justify-center min-h-screen pt-24">
        <div className="w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
          <RoomForm />
        </div>
      </div>
    </div>
  )
}

export default HotelDetailPage