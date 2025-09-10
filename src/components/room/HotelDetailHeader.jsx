import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faUser,
  faBolt,
  faShield,
  faStar,
  faGem,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function HotelDetailHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(135deg, #0a0a23 0%, #1a1a3e 25%, #2d1b69 50%, #4a1c5c 75%, #2d1b69 100%)',
        boxShadow: "0 4px 20px rgba(139, 69, 19, 0.3), 0 0 30px rgba(251, 191, 36, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
      }}
    >
      {/* Magical glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10 opacity-50 animate-pulse pointer-events-none"></div>
      
      {/* Floating magical particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              i % 3 === 0 ? 'bg-yellow-300' :
              i % 3 === 1 ? 'bg-pink-300' :
              'bg-blue-300'
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + Math.sin(i) * 20}%`,
            }}
            animate={{
              y: [-5, 5, -5],
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Disney Castle Logo/Brand */}
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
                {/* Disney Castle Logo */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-pink-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-2 rounded-full border-2 border-white/30 animate-pulse"></div>
                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-yellow-200 to-pink-300 animate-pulse"></div>
                  <FontAwesomeIcon
                    icon={faHotel}
                    className="text-purple-900 text-lg z-10"
                  />
                  {/* Magical sparkles around logo */}
                  <motion.div
                    className="absolute -top-1 -right-1 text-yellow-300 text-xs"
                    animate={{
                      rotate: [0, 360],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </motion.div>
                </div>
              </motion.div>
              <div>
                <h1 
                  className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
                  style={{
                    fontFamily: 'Georgia, serif',
                    textShadow: '0 0 15px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  <Link
                    to="/"
                    className="no-underline text-inherit hover:no-underline hover:text-inherit"
                  >
                    DISNEY CASTLE HOTELS
                  </Link>
                </h1>
                <p
                  className="text-xs text-pink-300/80"
                  style={{ 
                    textShadow: "0 0 8px rgba(251, 191, 36, 0.4)",
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  Where Dreams Come True
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            { [
              { name: "My Order", icon: faBolt, emoji: "📋" },
              { name: "Support", icon: faShield, emoji: "🧙‍♂️" }
            ].map((item) => (
              item.name === "My Order" ? (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    textShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
                    fontFamily: 'Georgia, serif'
                  }}
                  className="flex items-center"
                >
                  <Link
                    to="/order"
                    className="flex items-center space-x-2 text-purple-100 hover:text-yellow-300 transition-colors duration-200 group no-underline"
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-pink-400 group-hover:text-yellow-300 transition-colors"
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.name}
                  href="#"
                  className="flex items-center space-x-2 text-purple-100 hover:text-yellow-300 transition-colors duration-200 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    textShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
                    fontFamily: 'Georgia, serif'
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="text-pink-400 group-hover:text-yellow-300 transition-colors"
                  />
                  <span className="font-medium">{item.name}</span>
                </motion.a>
              )
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">

            {/* User Profile */}
            <Link to="/user" className="no-underline">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl border border-yellow-400/30 transition-all duration-200 relative"
                style={{
                  boxShadow: "0 0 20px rgba(251, 191, 36, 0.4)",
                  textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                  fontFamily: 'Georgia, serif'
                }}
              >
                <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Account</span>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 360],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <FontAwesomeIcon icon={faGem} className="text-yellow-300 text-xs" />
                </motion.div>
              </motion.button>
            </Link>
          </div>

        </div>
      </div>
    </motion.header>
  );
}

export default HotelDetailHeader;