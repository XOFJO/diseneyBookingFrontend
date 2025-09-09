import React from "react";
import { motion } from "motion/react";
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
        {/* 减少粒子数量从15到6 */}
       

        {/* 简化扫描线动画 */}


        {/* 减少能量环从3到1，简化动画 */}


        {/* 简化Arc Reactor效果 */}


        {/* 静态HUD元素，移除动画 */}


        {/* 减少故障线从8到3，降低频率 */}


        {/* Center content area */}
        <div className="relative z-10 w-full max-w-6xl">
          <SearchForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;