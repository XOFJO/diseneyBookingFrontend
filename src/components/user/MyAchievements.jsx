import React from "react";
import { motion } from "framer-motion";

const MyAchievements = () => {
    const allAchievements = [
        { title: "Fantasy Land", date: "2024-01", desc: "Magical castle themed experience", level: "bronze" },
        { title: "Adventure Island", date: "2024-03", desc: "Pirate & treasure hunting theme", level: "silver" },
        { title: "Sci-Fi Station", date: "2024-06", desc: "Futuristic space exploration", level: "gold" },
        { title: "Ocean World", date: "2024-09", desc: "Underwater marine adventure", level: "platinum" },
        { title: "Royal Palace", date: "2024-12", desc: "Luxury royal suite experience", level: "diamond" },
    ];

    // 只显示最新4个成就，自适应屏幕
    const achievements = allAchievements.slice(-4);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 15 } },
    };

    const getLevelColor = (level) => {
        const colors = {
            bronze: "from-orange-600 to-amber-600",
            silver: "from-gray-400 to-gray-600",
            gold: "from-yellow-400 to-yellow-600",
            platinum: "from-purple-400 to-purple-600",
            diamond: "from-cyan-400 to-blue-600"
        };
        return colors[level] || colors.bronze;
    };    const getLevelIcon = (level) => {
        const icons = {
            bronze: "👦", silver: "👧", gold: "🧒", platinum: "👨", diamond: "👩"
        };
        return icons[level] || icons.bronze;
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg w-full text-white relative overflow-hidden">
            <h2 className="text-xl font-bold mb-6 text-center tracking-wider">My Achievements</h2>
            <motion.div
                className="relative"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* 横向时间轴容器 - 无滚动条，自适应 */}
                <div className="relative flex items-start justify-between gap-3 md:gap-4 lg:gap-6 px-2">
                    {/* 主轴线 */}
                    <div className="absolute left-0 right-0 top-12 h-0.5 bg-gradient-to-r from-red-500/40 via-yellow-400/60 to-purple-500/40" />

                    {achievements.map((achievement, idx) => (
                        <motion.div
                            key={achievement.title}
                            className="relative flex flex-col items-center flex-1 group min-w-0"
                            variants={itemVariants}
                        >
                            {/* 顶部节点 */}
                            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getLevelColor(achievement.level)} shadow-lg ring-4 ring-gray-800 flex items-center justify-center relative group-hover:scale-110 transition-all duration-300`}>
                                <span className="text-lg group-hover:scale-110 transition-transform">
                                    {getLevelIcon(achievement.level)}
                                </span>
                                {/* 向下箭头 */}
                                <div className={`absolute top-8 w-0 h-0 border-x-4 border-x-transparent border-t-6 bg-gradient-to-br ${getLevelColor(achievement.level)} transition-all duration-300 group-hover:border-x-6 group-hover:border-t-8`}
                                    style={{
                                        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                                    }} />
                            </div>

                            {/* 成就卡片 */}
                            <div className="mt-12 bg-gradient-to-b from-gray-900/80 to-red-900/40 border border-red-500/30 group-hover:border-yellow-400/60 rounded-lg px-3 py-4 w-full text-center shadow-lg backdrop-blur-sm relative transition-all duration-300 group-hover:shadow-xl min-h-[120px] flex flex-col justify-between">
                                {/* 日期标签 */}
                                <div className="mb-2">
                                    <span className={`text-xs font-mono px-2 py-1 rounded border bg-gradient-to-r ${getLevelColor(achievement.level)} text-white border-opacity-50`}>
                                        {achievement.date}
                                    </span>
                                </div>

                                {/* 标题 */}
                                <h3 className="text-sm font-bold tracking-wide group-hover:text-yellow-300 transition-colors mb-2 line-clamp-2">
                                    {achievement.title}
                                </h3>

                                {/* 描述 */}
                                <p className="text-xs text-gray-300 leading-snug group-hover:text-gray-200 transition-colors line-clamp-2 flex-1">
                                    {achievement.desc}
                                </p>

                                {/* 进度光效 */}
                                <motion.div
                                    className={`absolute left-0 bottom-0 h-1 bg-gradient-to-r ${getLevelColor(achievement.level)} rounded-b-lg`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut", delay: idx * 0.15 }}
                                />

                                {/* 悬停光效 */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent pointer-events-none rounded-lg"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default MyAchievements;