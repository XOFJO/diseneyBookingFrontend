import React from 'react'
import Header from '../components/layout/Header'
import HotelFilter from '../components/search/HotelFilter'
import HotelList from '../components/hotel/HotelList'
import DisneyBackground from '../components/common/DisneyBackground'

function HotelListPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 迪士尼星空背景 */}
      <DisneyBackground />
      
      {/* 筛选栏 */}
      <HotelFilter />
      
      {/* 内容层 */}
      <div className="pt-48">
        {/* 酒店列表内容 */}
        <HotelList />
      </div>
    </div>
  )
}

export default HotelListPage