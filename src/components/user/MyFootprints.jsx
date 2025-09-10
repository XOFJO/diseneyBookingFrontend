import React from "react";
import { motion } from "framer-motion";

const MyFootprints = () => {
    const footprints = [
        { city: "Shanghai", date: "2024-03", note: "Business conference & meetings", status: "completed" },
        { city: "Beijing", date: "2024-05", note: "Cultural exploration & leisure", status: "completed" },
        { city: "Guangzhou", date: "2024-08", note: "Trade fair & networking", status: "completed" },
        { city: "Shenzhen", date: "2024-10", note: "Tech summit & innovation tour", status: "current" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg mb-6 w-full text-white relative overflow-hidden">
            <h2 className="text-xl font-bold mb-6 text-center tracking-wider">My Footprints</h2>
            <motion.div
                className="relative pl-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* 主时间线 */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500/60 via-yellow-400/40 to-red-500/60" />

                {footprints.map((footprint, idx) => (
                    <motion.div
                        key={footprint.city}
                        className="relative mb-8 group last:mb-2"
                        variants={itemVariants}
                    >
                        {/* 时间线节点 */}
                        <div className={`absolute -left-3 top-3 w-6 h-6 rounded-full shadow-lg ring-4 ring-gray-800 flex items-center justify-center transition-all duration-300 ${footprint.status === 'current'
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 group-hover:scale-125'
                                : 'bg-gradient-to-br from-red-500 to-pink-600 group-hover:scale-110'
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${footprint.status === 'current' ? 'bg-white animate-pulse' : 'bg-white/90'
                                }`} />
                        </div>

                        {/* 箭头指向内容 */}
                        <div className="ml-6 relative">
                            <div className={`absolute -left-8 top-6 w-0 h-0 border-y-6 border-y-transparent border-r-8 transition-colors ${footprint.status === 'current'
                                    ? 'border-r-yellow-500/80 group-hover:border-r-yellow-400'
                                    : 'border-r-gray-700/80 group-hover:border-r-red-500/70'
                                }`} />

                            {/* 内容卡片 */}
                            <div className={`bg-gradient-to-r from-gray-900/70 to-red-900/30 border rounded-lg px-5 py-4 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl relative overflow-hidden ${footprint.status === 'current'
                                    ? 'border-yellow-400/60 group-hover:border-yellow-300'
                                    : 'border-red-500/30 group-hover:border-red-400/50'
                                }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className={`text-xs font-mono px-2 py-1 rounded border ${footprint.status === 'current'
                                            ? 'text-yellow-200 bg-yellow-400/20 border-yellow-400/30'
                                            : 'text-red-200 bg-red-400/20 border-red-400/30'
                                        }`}>
                                        {footprint.date}
                                    </span>
                                    {footprint.status === 'current' && (
                                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full border border-yellow-400/30 animate-pulse">
                                            Current
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                                    📍 {footprint.city}
                                </h3>
                                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                                    {footprint.note}
                                </p>

                                {/* 悬停光效 */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 to-transparent pointer-events-none"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default MyFootprints;