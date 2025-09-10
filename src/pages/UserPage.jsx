import React from "react";
import { motion } from "framer-motion";
import UserInfo from "../components/user/UserInfo";
import ChangePassword from "../components/user/ChangePassword";
import MyFootprints from "../components/user/MyFootprints";
import MyAchievements from "../components/user/MyAchievements";
import "../styles/components.css";

const UserPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <>
            {/* 背景层 */}
            <div className="fixed inset-0 w-full min-h-screen bg-gradient-to-r from-gray-900/95 via-red-900/90 to-gray-900/95 backdrop-blur-lg -z-10 pointer-events-none" />
            <motion.div
                className="max-w-2xl w-full px-4 py-12 mx-auto mt-24 (6rem)"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <UserInfo />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <ChangePassword />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <MyFootprints />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <MyAchievements />
                </motion.div>
            </motion.div>
        </>
    );
};

export default UserPage;