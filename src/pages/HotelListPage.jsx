import React from 'react'
import Header from '../components/layout/Header'
import HotelFilter from '../components/search/HotelFilter'

function HotelListPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* 背景层 */}
      <div className="fixed inset-0 w-full min-h-screen bg-gradient-to-r from-gray-900/95 via-red-900/90 to-gray-900/95 backdrop-blur-lg -z-10 pointer-events-none" />
      
      {/* 筛选栏 */}
      <HotelFilter />
      
      {/* 内容层，居中 */}
      <div className="pt-36 z-10 flex flex-col items-center relative w-full max-w-7xl mx-auto px-6">
        {/* 页面内容 */}
        <div className="w-full">
          {/* 这里将会放置酒店列表内容 */}
        </div>
      </div>
    </div>
  )
}

export default HotelListPage