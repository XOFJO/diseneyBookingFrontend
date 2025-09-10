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
    }; return (
        <div className="bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-lg border border-purple-500/30 p-8 rounded-2xl shadow-2xl mb-8 w-full text-white relative overflow-hidden">
            {/* Magical glow effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/10 to-blue-500/5 opacity-50 animate-pulse pointer-events-none rounded-2xl"></div>

            <h2 className="text-2xl font-bold mb-8 text-center tracking-wider bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                ✨ User Information ✨
            </h2>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                {userData.map((item, index) => (
                    <motion.div
                        key={index}
                        className="group relative bg-gradient-to-br from-indigo-900/50 via-purple-900/40 to-pink-900/30 border border-purple-400/30 hover:border-yellow-400/60 rounded-xl p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105"
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* Icon and Label */}
                        <div className="flex items-center mb-3">
                            <span className="text-3xl mr-4 group-hover:scale-125 transition-transform duration-300 filter drop-shadow-lg">
                                {item.icon}
                            </span>
                            <span className="text-sm text-purple-200 group-hover:text-yellow-300 transition-colors font-medium tracking-wide">
                                {item.label}
                            </span>
                        </div>

                        {/* Value */}
                        <div className="pl-14">
                            <span className="text-white font-semibold group-hover:text-yellow-100 transition-colors text-lg">
                                {item.value}
                            </span>
                        </div>

                        {/* Magical sparkle effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent pointer-events-none rounded-xl"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        />

                        {/* Bottom magical line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1.2,
                                ease: "easeOut",
                                delay: index * 0.15
                            }}
                        />

                        {/* Floating particles effect */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-ping"></div>
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Background magical elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-6 right-6 w-12 h-12 border border-yellow-400 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-6 left-6 w-8 h-8 border border-purple-400 rounded-full animate-bounce"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-pink-400/20 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default UserInfo;
