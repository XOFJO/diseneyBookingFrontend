import React from "react";
import { motion } from "framer-motion";
import useOrderStore from "../../store/orderStore";

function OrderFilter() {
    const { activeFilter, setActiveFilter } = useOrderStore();
    
    const filterOptions = [
        { label: 'ALL', value: 'all' },
        { label: 'CONFIRMED', value: 'confirmed' },
        { label: 'CANCELLED', value: 'cancelled' }
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
                                    ? 'text-white' 
                                    : 'text-purple-200 hover:text-yellow-300'
                                }
                            `}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                fontFamily: 'Georgia, serif',
                                textShadow: activeFilter === filter.label 
                                    ? "0 0 10px rgba(255, 255, 255, 0.5)" 
                                    : "0 0 5px rgba(255, 255, 255, 0.2)"
                            }}
                        >
                            {/* Active background */}
                            {activeFilter === filter.label && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
                                    style={{
                                        boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)"
                                    }}
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            
                            {/* Text */}
                            <span className="relative z-10">{filter.label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default OrderFilter;
