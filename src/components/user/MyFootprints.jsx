import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useUserStore from "../../store/userStore";

const MyFootprints = () => {
    // Zustand store access
    const {
        footprints: storeFootprints,
        footprintsLoading,
        footprintsError,
        fetchFootprints
    } = useUserStore();

    // Fetch footprints on component mount
    useEffect(() => {
        fetchFootprints(1);
    }, [fetchFootprints]);

    // Random note generator
    const generateRandomNote = (city) => {
        const noteTemplates = [
            "Business conference & meetings",
            "Cultural exploration & leisure", 
            "Trade fair & networking",
            "Tech summit & innovation tour",
            "Family vacation & sightseeing",
            "Corporate training & workshop",
            "Academic conference & research",
            "International exhibition visit",
            "Team building & company retreat",
            "Historical sites & museum tour"
        ];
        const cityIndex = city.charCodeAt(0) % noteTemplates.length;
        return noteTemplates[cityIndex];
    };

    // Random status generator
    const generateRandomStatus = (date, index) => {
        // Make the last (most recent) item "current", others "completed"
        const dateValue = new Date(date + "-01").getTime();
        const now = new Date().getTime();
        const isRecent = (now - dateValue) < (90 * 24 * 60 * 60 * 1000); // within 3 months
        return (index === 0 && isRecent) ? "current" : "completed";
    };

    // Process API data to add note and status
    const processedFootprints = storeFootprints
        .sort((a, b) => new Date(b.date + "-01") - new Date(a.date + "-01")) // Sort by date desc
        .map((footprint, index) => ({
            ...footprint,
            note: generateRandomNote(footprint.city),
            status: generateRandomStatus(footprint.date, index)
        }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 12 } },
    };

    // Loading state
    if (footprintsLoading) {
        return (
            <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-lg border border-purple-500/30 p-8 rounded-2xl shadow-2xl mb-8 w-full text-white relative overflow-hidden">
                <div className="flex items-center justify-center h-48">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                    <span className="ml-4 text-lg">Loading footprints...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (footprintsError) {
        return (
            <div className="bg-gradient-to-br from-red-900/40 via-gray-900/30 to-red-900/40 backdrop-blur-lg border border-red-500/30 p-8 rounded-2xl shadow-2xl mb-8 w-full text-white relative overflow-hidden">
                <div className="flex items-center justify-center h-48">
                    <div className="text-center">
                        <div className="text-4xl mb-4">❌</div>
                        <h3 className="text-xl font-bold mb-2">Error Loading Footprints</h3>
                        <p className="text-red-300">{footprintsError}</p>
                        <button
                            onClick={() => fetchFootprints(1)}
                            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // No data state
    if (!processedFootprints || processedFootprints.length === 0) {
        return (
            <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-lg border border-purple-500/30 p-8 rounded-2xl shadow-2xl mb-8 w-full text-white relative overflow-hidden">
                <div className="flex items-center justify-center h-48">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🗺️</div>
                        <h3 className="text-xl font-bold mb-2">No Footprints Yet</h3>
                        <p className="text-purple-300">Start your journey to create footprints!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-lg border border-purple-500/30 p-8 rounded-2xl shadow-2xl mb-8 w-full text-white relative overflow-hidden">
            {/* Magical glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-blue-500/5 opacity-50 animate-pulse pointer-events-none rounded-2xl"></div>

            <h2 className="text-2xl font-bold mb-8 text-center tracking-wider bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                🗺️ My Footprints 🗺️
            </h2>

            <motion.div
                className="relative pl-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {/* 主时间线 */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500/60 via-pink-400/40 to-yellow-400/60" />

                {processedFootprints.map((footprint) => (
                    <motion.div
                        key={`${footprint.city}-${footprint.date}`}
                        className="relative mb-8 group last:mb-2"
                        variants={itemVariants}
                    >
                        {/* 时间线节点 */}
                        <div className={`absolute -left-3 top-3 w-6 h-6 rounded-full shadow-lg ring-4 ring-indigo-900/50 flex items-center justify-center transition-all duration-300 ${footprint.status === 'current'
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 group-hover:scale-125 animate-pulse'
                            : 'bg-gradient-to-br from-purple-500 to-pink-600 group-hover:scale-110'
                            }`}>
                            <div className={`w-2 h-2 rounded-full ${footprint.status === 'current' ? 'bg-white animate-pulse' : 'bg-white/90'
                                }`} />
                        </div>

                        {/* 箭头指向内容 */}
                        <div className="ml-6 relative">
                            <div className={`absolute -left-8 top-6 w-0 h-0 border-y-6 border-y-transparent border-r-8 transition-colors ${footprint.status === 'current'
                                ? 'border-r-yellow-500/80 group-hover:border-r-yellow-400'
                                : 'border-r-purple-700/80 group-hover:border-r-purple-500/70'
                                }`} />

                            {/* 内容卡片 */}
                            <div className={`bg-gradient-to-r from-indigo-900/70 to-purple-900/40 border rounded-xl px-6 py-5 shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-2xl relative overflow-hidden ${footprint.status === 'current'
                                ? 'border-yellow-400/60 group-hover:border-yellow-300 hover:shadow-yellow-500/20'
                                : 'border-purple-500/30 group-hover:border-purple-400/50 hover:shadow-purple-500/20'
                                }`}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className={`text-xs font-mono px-3 py-1.5 rounded-full border ${footprint.status === 'current'
                                        ? 'text-yellow-200 bg-yellow-400/20 border-yellow-400/30'
                                        : 'text-purple-200 bg-purple-400/20 border-purple-400/30'
                                        }`}>
                                        {footprint.date}
                                    </span>
                                    {footprint.status === 'current' && (
                                        <span className="text-xs bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full border border-yellow-400/30 animate-pulse">
                                            ✨ Current
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-300 transition-colors">
                                    📍 {footprint.city}
                                </h3>
                                <p className="text-sm text-purple-200 leading-relaxed group-hover:text-purple-100 transition-colors">
                                    {footprint.note}
                                </p>

                                {/* 悬停光效 */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent pointer-events-none rounded-xl"
                                    initial={{ x: '-100%' }}
                                    whileHover={{ x: '100%' }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                />

                                {/* Floating particles */}
                                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-70 animate-ping"></div>
                                <div className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-pulse"></div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Background magical elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-6 right-6 w-10 h-10 border border-yellow-400 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-6 left-6 w-8 h-8 border border-purple-400 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-pink-400/20 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default MyFootprints;