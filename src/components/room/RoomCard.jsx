import React from "react";
import { motion } from "framer-motion";

/**
 * Iron Man themed room card component
 * @param {string} image Room image URL
 * @param {string} name Room name
 * @param {string} description Room description
 * @param {number|string} price Price
 * @param {Array} features Room features array
 * @param {number} available Available rooms
 * @param {function} onBookNow Book now event
 * @param {function} onViewDetails View details event
 */
const RoomCard = ({ image, name, description, price, features = [], available, onBookNow, onViewDetails }) => {
    return (
        <motion.div
            className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/20 shadow-2xl shadow-red-900/30"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ 
                scale: 1.02, 
                boxShadow: "0 25px 50px -12px rgba(239, 68, 68, 0.4)",
                borderColor: "rgba(251, 191, 36, 0.4)" 
            }}
        >
            <div className="flex flex-col lg:flex-row gap-6">
                <motion.div 
                    className="w-full lg:w-1/3"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-64 object-cover rounded-xl border border-yellow-400/20"
                    />
                </motion.div>
                
                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                        <motion.h4 
                            className="text-2xl font-bold text-yellow-400"
                            whileHover={{ color: "#fbbf24" }}
                        >
                            {name}
                        </motion.h4>
                        <div className="text-right">
                            <motion.div 
                                className="text-3xl font-bold text-yellow-400"
                                whileHover={{ scale: 1.1, color: "#f59e0b" }}
                            >
                                ${price}
                            </motion.div>
                            <div className="text-green-400 text-sm">
                                Available: {available}
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                        {description}
                    </p>
                    
                    <div className="space-y-3">
                        <h5 className="text-yellow-300 font-semibold">Key Features</h5>
                        <div className="flex flex-wrap gap-2">
                            {features.map((feature, featureIndex) => (
                                <motion.span
                                    key={featureIndex}
                                    className="px-3 py-1 bg-red-800/40 text-yellow-200 rounded-full text-sm border border-red-600/30"
                                    whileHover={{ 
                                        scale: 1.1, 
                                        backgroundColor: "rgba(239, 68, 68, 0.6)",
                                        borderColor: "rgba(251, 191, 36, 0.4)"
                                    }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {feature}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        <motion.button
                            className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium rounded-lg hover:from-gray-600 hover:to-gray-500 transition-all shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onViewDetails}
                        >
                            View Details
                        </motion.button>
                        <motion.button
                            className="px-8 py-2 bg-gradient-to-r from-red-600 to-yellow-500 text-white font-bold rounded-lg hover:from-red-500 hover:to-yellow-400 transition-all shadow-lg shadow-red-900/50"
                            whileHover={{ 
                                scale: 1.05, 
                                boxShadow: "0 20px 40px -12px rgba(239, 68, 68, 0.6)" 
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onBookNow}
                        >
                            Book Now!
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RoomCard;
