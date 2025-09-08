import React from 'react'
import { motion } from 'framer-motion'
import RoomForm from '../components/room/RoomForm'

function HotelDetailPage() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Animated Background */}
      <motion.div 
        className="fixed inset-0 w-full min-h-screen bg-gradient-to-br from-black via-red-950 to-gray-900 -z-10"
        animate={{
          background: [
            "linear-gradient(135deg, #000000 0%, #7f1d1d 50%, #1f2937 100%)",
            "linear-gradient(135deg, #1f2937 0%, #7f1d1d 50%, #000000 100%)",
            "linear-gradient(135deg, #7f1d1d 0%, #000000 50%, #1f2937 100%)"
          ]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Floating particles effect */}
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 p-6 flex items-center justify-center min-h-screen">
        <RoomForm />
      </div>
    </div>
  )
}

export default HotelDetailPage