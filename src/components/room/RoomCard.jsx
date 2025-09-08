import React from "react";
import { motion } from "framer-motion";
import { Button } from "@headlessui/react";

/**
 * 房间卡片组件
 * @param {string} image 房间图片地址
 * @param {string} name 房间名称
 * @param {string} description 房间简介
 * @param {number|string} price 价格
 * @param {string} theme 主题
 * @param {number} rating 评分
 * @param {function} onViewRoom 查看详情事件
 * @param {function} onReview 评论事件
 */
const RoomCard = ({ image, name, description, price, theme, rating, onViewRoom, onReview }) => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex bg-gradient-to-r from-gray-900/80 to-red-900/30 rounded-2xl shadow-xl border-2 border-red-500/30 overflow-hidden w-full relative"
            >
                {/* 评分 */}
                <div className="absolute right-10 top-5 flex items-center">
                    <span className="text-yellow-400 font-bold text-2xl">{rating.toFixed(1)}/5.0</span>
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
                    {/* 房间名称 */}
                    <h2 className="text-xl font-bold text-yellow-400 mb-1 drop-shadow-lg">
                        {name}
                    </h2>
                    {/* 房间简介 */}
                    <p className="text-gray-200 text-sm mb-4 max-w-sm whitespace-pre-line break-words">
                        {description}
                    </p>
                    {/* 左下主题tag */}
                    <div className="absolute left-5 bottom-5">
                        <span className="bg-yellow-400/80 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                            {theme}
                        </span>
                    </div>
                    {/* 右下价格和按钮区 */}
                    <div className="absolute right-5 bottom-5 flex flex-col items-end gap-2">
                        <span className="text-lg font-semibold text-red-400 bg-black/40 px-3 py-1 rounded-xl shadow-lg mb-1">
                            ￥{price}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                as="button"
                                className="bg-gradient-to-r from-red-700 to-yellow-400 text-white font-bold px-4 py-2 rounded-xl shadow-lg w-24 min-w-[80px] text-sm hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                onClick={onReview}
                            >
                                评论
                            </Button>
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

export default RoomCard;
