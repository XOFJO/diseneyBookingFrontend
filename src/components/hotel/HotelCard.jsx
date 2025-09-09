import React from "react";
import { motion } from "motion/react";
import { Button } from "@headlessui/react";

/**
 * 酒店卡片组件
 * @param {string} image 酒店图片地址
 * @param {string} name 酒店名称
 * @param {string} address 酒店地址
 * @param {string} description 酒店简介
 * @param {number|string} price 价格
 * @param {function} onViewRoom 点击“查看房间信息”按钮事件
 * @param {List<string>} themes 主题
 */
const HotelCard = ({ image, name, address, description, price, themes = [], rating, onViewRoom }) => {
    return (
        <div className="w-full max-w-5xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex bg-gradient-to-r from-purple-900/70 to-blue-900/50 rounded-2xl shadow-xl border-2 border-purple-500/40 overflow-hidden w-full relative backdrop-blur-sm"
                style={{ boxShadow: '0 0 30px rgba(147, 51, 234, 0.3)' }}
            >
                {/* 评分 */}
                <div className="absolute right-10 top-5 flex items-center">
                    <span className="text-yellow-400 font-bold text-2xl drop-shadow-lg" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.6)' }}>
                        {typeof rating === 'number' ? rating.toFixed(1) : '4.5'}/5.0
                    </span>
                </div>
                {/* 左侧图片 */}
                <div className="w-48 h-48 flex-shrink-0 bg-purple-900/30 border-r border-purple-400/20">
                    <img
                        src={image}
                        alt={name}
                        className="object-cover w-full h-full rounded-l-2xl"
                    />
                </div>
                {/* 右侧内容 */}
                <div className="flex flex-col flex-1 p-5 relative">
                    {/* 酒店名称 */}
                    <h2 className="text-xl font-bold text-yellow-400 mb-1 drop-shadow-lg" style={{ textShadow: '0 0 8px rgba(251, 191, 36, 0.6)' }}>
                        {name}
                    </h2>
                    {/* 地址字段 */}
                    <div className="text-xs text-gray-300 mb-2" style={{ textShadow: '0 0 3px rgba(255, 255, 255, 0.3)' }}>{address}</div>
                    {/* 酒店简介 */}
                    <p className="text-gray-100 text-sm mb-4 max-w-lg whitespace-pre-line break-words" style={{ textShadow: '0 0 3px rgba(255, 255, 255, 0.2)' }}>
                        {description}
                    </p>
                    {/* 左下主题tags */}
                    <div className="absolute left-5 bottom-5 flex gap-2 max-w-xl overflow-hidden">
                        <div className="flex gap-2 whitespace-nowrap">
                            {themes.slice(0, 4).map((t, idx) => (
                                <span key={idx} className="bg-gradient-to-r from-yellow-400/90 to-orange-400/80 text-purple-900 text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex-shrink-0 border border-yellow-300/30" style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}>
                                    {t}
                                </span>
                            ))}
                            {themes.length > 4 && (
                                <span className="bg-gradient-to-r from-yellow-400/90 to-orange-400/80 text-purple-900 text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex-shrink-0 border border-yellow-300/30" style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.4)' }}>
                                    ...
                                </span>
                            )}
                        </div>
                    </div>
                    {/* 右下价格和按钮区 */}
                    <div className="absolute right-5 bottom-5 flex flex-col items-end gap-2">
                        <span className="text-lg font-semibold text-yellow-400 bg-black/50 px-3 py-1 rounded-xl shadow-lg mb-1 border border-yellow-400/25" style={{ textShadow: '0 0 6px rgba(251, 191, 36, 0.5)', boxShadow: '0 0 12px rgba(251, 191, 36, 0.25)' }}>
                            ￥{price}起
                        </span>
                        <div className="flex gap-2">
                            <Button
                                as="button"
                                className="bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-600 hover:to-pink-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg w-28 min-w-[90px] text-sm hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-purple-400/30"
                                style={{ boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)' }}
                                onClick={onViewRoom}
                            >
                                查看详情
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HotelCard;
