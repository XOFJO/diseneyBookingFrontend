import React from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faUser,
  faBolt,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900/95 via-red-900/90 to-gray-900/95 backdrop-blur-lg border-b border-red-500/30"
      style={{
        boxShadow:
          "0 4px 20px rgba(220, 38, 38, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}

          <Link
            to="/"
            className="no-underline text-inherit hover:no-underline hover:text-inherit"
          >
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
              >
                {/* Arc Reactor Logo */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-2 rounded-full border-2 border-white/30 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 animate-pulse"></div>
                  <FontAwesomeIcon
                    icon={faHotel}
                    className="text-white text-lg z-10"
                  />
                </div>
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 bg-clip-text text-transparent">
                  <Link
                    to="/"
                    className="no-underline text-inherit hover:no-underline hover:text-inherit"
                  >
                    STARK HOTELS
                  </Link>
                </h1>
                <p
                  className="text-xs text-red-400/80"
                  style={{ textShadow: "0 0 3px rgba(220, 38, 38, 0.5)" }}
                >
                  Powered by Arc Reactor Technology
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "MyOrder", icon: faBolt },
              { name: "Support", icon: faShield },
            ].map((item) => (
              <motion.a
                key={item.name}
                href="#"
                className="flex items-center space-x-2 text-gray-300 hover:text-yellow-400 transition-colors duration-200 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ textShadow: "0 0 3px rgba(255, 255, 255, 0.2)" }}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="text-red-400 group-hover:text-yellow-400 transition-colors"
                />
                <span className="font-medium">{item.name}</span>
              </motion.a>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">

            {/* User Profile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl border border-yellow-400/30 transition-all duration-200"
              style={{
                boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)",
                textShadow: "0 0 5px rgba(255, 255, 255, 0.3)",
              }}
            >
              <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Account</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-3 rounded-xl bg-gradient-to-r from-gray-800/80 to-red-900/50 border border-red-500/40 text-red-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.div
                className="h-0.5 bg-current rounded"
                animate={{ scaleX: 1 }}
              />
              <motion.div
                className="h-0.5 bg-current rounded"
                animate={{ scaleX: 0.7 }}
              />
              <motion.div
                className="h-0.5 bg-current rounded"
                animate={{ scaleX: 1 }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent opacity-50 animate-pulse pointer-events-none"></div>
    </motion.header>
  );
}

export default Header;
