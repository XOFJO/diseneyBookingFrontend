import React from 'react'
import Header from '../components/layout/Header'
import HotelFilter from '../components/search/HotelFilter'
import HotelList from '../components/hotel/HotelList'

function HotelListPage() {
  return (
    <div className="relative min-h-screen">
      {/* 背景层 */}
      <div className="fixed inset-0 w-full min-h-screen bg-gradient-to-r from-gray-900/95 via-red-900/90 to-gray-900/95 backdrop-blur-lg -z-10 pointer-events-none" />
      {/* 内容居中层 */}
      <div className="max-w-4xl w-full px-4 mx-auto">
        {/* 筛选栏 */}
        <HotelFilter />
        {/* 内容层 */}
        <div className="pt-36">
          {/* 酒店列表内容 */}
          <HotelList />
        </div>
      </div>
    </div>
  )
}

export default HotelListPage