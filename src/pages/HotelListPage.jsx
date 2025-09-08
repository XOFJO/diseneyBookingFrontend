import React from 'react'
import Header from '../components/layout/Header'
import HotelFilter from '../components/search/HotelFilter'
import HotelCard from '../components/hotel/HotelCard'

function HotelListPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* 背景层 */}
      <div className="fixed inset-0 w-full min-h-screen bg-gradient-to-r from-gray-900/95 via-red-900/90 to-gray-900/95 backdrop-blur-lg -z-10 pointer-events-none" />
      
      {/* 筛选栏 */}
      <HotelFilter />
      
      {/* 内容层 */}
      <div className="pt-36">
        {/* 页面内容 */}
        <div>
          {/* 这里将会放置酒店列表内容 */}
          <HotelCard
            image="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            name="豪华乐园景观房"
            description="享受迪士尼乐园的绝佳景观，配备2张双人床，可入住3位成人，房间宽敞舒适"
            price={3154}
            address="上海市浦东新区迪士尼大道"
            themes={["乐园景观", "亲子", "高档"]}
          />
        </div>
      </div>
    </div>
  )
}

export default HotelListPage