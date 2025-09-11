import React from "react";
import { motion } from "framer-motion";
import UserInfo from "../components/user/UserInfo";
import ChangePassword from "../components/user/ChangePassword";
import MyFootprints from "../components/user/MyFootprints";
import MyAchievements from "../components/user/MyAchievements";
import HotelDetailHeader from "../components/room/HotelDetailHeader";
import DisneyBackground from "../components/common/DisneyBackground";
import useUserStore from "../store/userStore";
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
    }; return (
        <div>
            <HotelDetailHeader />
            <DisneyBackground />

            <div className="min-h-screen w-full flex items-start justify-center p-8 pt-24 relative overflow-hidden">
                {/* Center content area */}
                <motion.div
                    className="relative z-10 w-full max-w-4xl"
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
            </div>
        </div>
    );
};

export default UserPage;