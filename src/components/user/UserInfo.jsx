import React from "react";
import { motion } from "framer-motion";

const UserInfo = () => {
    const userData = [
        { label: "Username", value: "JohnDoe", icon: "👤" },
        { label: "Phone", value: "+1 234-567-8900", icon: "📱" },
        { label: "Email", value: "john.doe@oocl.com", icon: "📧" },
        { label: "Member Since", value: "Jan 2024", icon: "🎖️" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 15
            }
        },
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg mb-6 w-full text-white relative overflow-hidden">
            <h2 className="text-xl font-bold mb-6 text-center tracking-wider bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                User Information
            </h2>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {userData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="group relative bg-gradient-to-br from-gray-900/60 to-red-900/30 border border-red-500/20 hover:border-yellow-400/50 rounded-lg p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Icon and Label */}
                        <div className="flex items-center mb-2">
                            <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </span>
                            <span className="text-sm text-gray-300 group-hover:text-yellow-300 transition-colors font-medium">
                                {item.label}
                            </span>
                        </div>

                        {/* Value */}
                        <div className="pl-11">
                            <span className="text-white font-semibold group-hover:text-yellow-100 transition-colors">
                                {item.value}
                            </span>
                        </div>

                        {/* Hover Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent pointer-events-none rounded-lg"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}
                        />

                        {/* Bottom Accent Line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-yellow-400"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                                delay: index * 0.1
                            }}
                        />
                    </motion.div>
                ))}
            </motion.div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-4 right-4 w-8 h-8 border border-yellow-400 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border border-red-400 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-yellow-400/20 rounded-full"></div>
            </div>
        </div>
    );
};

export default UserInfo;
