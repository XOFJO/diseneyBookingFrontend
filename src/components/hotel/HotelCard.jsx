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
                className="flex bg-gradient-to-r from-gray-900/80 to-red-900/30 rounded-2xl shadow-xl border-2 border-red-500/30 overflow-hidden w-full relative"
            >
                {/* 评分 */}
                <div className="absolute right-10 top-5 flex items-center">
                    <span className="text-yellow-400 font-bold text-2xl">
                        {typeof rating === 'number' ? rating.toFixed(1) : '4.5'}/5.0
                    </span>
                </div>
                {/* 左侧图片 */}
                <div className="w-48 h-48 flex-shrink-0 bg-gray-800">
                    <img
                        src={image}
                        alt={name}
                        className="object-cover w-full h-full rounded-l-2xl"
                    />
                </div>
                {/* 右侧内容 */}
                <div className="flex flex-col flex-1 p-5 relative">
                    {/* 酒店名称 */}
                    <h2 className="text-xl font-bold text-yellow-400 mb-1 drop-shadow-lg">
                        {name}
                    </h2>
                    {/* 地址字段 */}
                    <div className="text-xs text-gray-400 mb-2">{address}</div>
                    {/* 酒店简介 */}
                    <p className="text-gray-200 text-sm mb-4 max-w-lg whitespace-pre-line break-words">
                        {description}
                    </p>
                    {/* 左下主题tags */}
                    <div className="absolute left-5 bottom-5 flex gap-2 max-w-xl overflow-hidden">
                        <div className="flex gap-2 whitespace-nowrap">
                            {themes.slice(0, 4).map((t, idx) => (
                                <span key={idx} className="bg-yellow-400/80 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md flex-shrink-0">
                                    {t}
                                </span>
                            ))}
                            {themes.length > 4 && (
                                <span className="bg-yellow-400/80 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md flex-shrink-0">
                                    ...
                                </span>
                            )}
                        </div>
                    </div>
                    {/* 右下价格和按钮区 */}
                    <div className="absolute right-5 bottom-5 flex flex-col items-end gap-2">
                        <span className="text-lg font-semibold text-red-400 bg-black/40 px-3 py-1 rounded-xl shadow-lg mb-1">
                            ￥{price}起
                        </span>
                        <div className="flex gap-2">
                            <Button
                                as="button"
                                className="bg-gradient-to-r from-red-700 to-yellow-400 text-white font-bold px-4 py-2 rounded-xl shadow-lg w-28 min-w-[90px] text-sm hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
