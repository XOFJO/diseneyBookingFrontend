import React from 'react'
import Header from '../components/layout/Header'
import RoomSelector from '../components/search/RoomSelector'
import RoomList from '../components/room/RoomList'

function HotelDetailPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* 背景层 */}
      <div className="fixed inset-0 w-full min-h-screen bg-gradient-to-r from-gray-900/95 via-red-900/90 to-gray-900/95 backdrop-blur-lg -z-10 pointer-events-none" />
      
      {/* Header */}
      <Header />
      
      {/* Room Selector */}
      <RoomSelector />
      
      {/* 内容层 */}
      <div className="pt-40">
        {/* 页面内容 */}
        <div>
          {/* 房间列表内容 */}
          <RoomList />
        </div>
      </div>
    </div>
  )
}

export default HotelDetailPage