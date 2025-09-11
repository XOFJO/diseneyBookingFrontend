import React from "react";
import { motion } from "framer-motion";
import useOrderStore from "../../store/orderStore";

function OrderFilter() {
    const { activeFilter, setActiveFilter } = useOrderStore();
    
    const filterOptions = [
        { label: 'ALL', value: 'all' },
        { label: 'CONFIRMED', value: 'confirmed' },
        { label: 'CANCELLED', value: 'cancelled' },
        { label: 'COMPLETED', value: 'completed' }
    ];

    const handleFilterChange = (filter) => {
        setActiveFilter(filter.label);
        console.log('Filter changed to:', filter.value);
    };

    return (
        <div className="mb-8">
            {/* Filter Tabs */}
            <div className="flex justify-center">
                <div className="flex bg-black/20 backdrop-blur-sm rounded-xl p-1 border border-yellow-400/30">
                    {filterOptions.map((filter) => (
                        <motion.button
                            key={filter.value}
                            onClick={() => handleFilterChange(filter)}
                            className={`
                                relative px-6 py-3 rounded-lg font-medium transition-all duration-200
                                ${activeFilter === filter.label 
                                    ? 'text-white z-20' 
                                    : 'text-purple-200 hover:text-yellow-300 z-10'
                                }
                            `}
                            animate={{ 
                                scale: activeFilter === filter.label ? 1.15 : 1.0 
                            }}
                            whileHover={{ 
                                scale: activeFilter === filter.label ? 1.2 : 1.05 
                            }}
                            whileTap={{ 
                                scale: activeFilter === filter.label ? 1.1 : 0.95 
                            }}
                            transition={{ 
                                duration: 0.15,
                                ease: "easeOut"
                            }}
                            style={{
                                fontFamily: 'Georgia, serif',
                                textShadow: activeFilter === filter.label 
                                    ? "0 0 15px rgba(255, 255, 255, 0.8), 0 0 25px rgba(251, 191, 36, 0.6)" 
                                    : "0 0 8px rgba(255, 255, 255, 0.3)",
                                zIndex: activeFilter === filter.label ? 20 : 10
                            }}
                        >
                            {/* Active background */}
                            {activeFilter === filter.label && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-lg opacity-90"
                                    style={{
                                        boxShadow: "0 0 25px rgba(251, 191, 36, 0.6), 0 0 40px rgba(236, 72, 153, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                                    }}
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            
                            {/* Inactive background */}
                            {activeFilter !== filter.label && (
                                <div 
                                    className="absolute inset-0 bg-gradient-to-r from-purple-800/40 to-pink-800/40 rounded-lg backdrop-blur-sm"
                                    style={{
                                        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 2px 8px rgba(0, 0, 0, 0.3)"
                                    }}
                                />
                            )}
                            
                            {/* Text */}
                            <span className="relative z-10 font-semibold">{filter.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderFilter;
