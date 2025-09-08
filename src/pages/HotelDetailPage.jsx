import React from 'react'
import { motion } from 'framer-motion'
import RoomForm from '../components/room/RoomForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart, faMagic, faGem } from '@fortawesome/free-solid-svg-icons'

function HotelDetailPage() {
  // Generate stars for magical Disney sky
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      animationDelay: Math.random() * 5,
      animationDuration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2
    }))
  }
  
  const smallStars = generateStars(60)
  const mediumStars = generateStars(20)
  const sparkleStars = generateStars(12)
  
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Disney Castle Starry Sky Background */}
      <motion.div 
        className="fixed inset-0 w-full min-h-screen -z-20"
        style={{
          background: 'linear-gradient(180deg, #0a0a23 0%, #1a1a3e 30%, #2d1b69 60%, #4a1c5c 100%)'
        }}
        animate={{
          background: [
            'linear-gradient(180deg, #0a0a23 0%, #1a1a3e 30%, #2d1b69 60%, #4a1c5c 100%)',
            'linear-gradient(180deg, #1a1a3e 0%, #2d1b69 30%, #4a1c5c 60%, #0a0a23 100%)',
            'linear-gradient(180deg, #2d1b69 0%, #4a1c5c 30%, #0a0a23 60%, #1a1a3e 100%)'
          ]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      {/* Nebula overlay for depth */}
      <div className="fixed inset-0 -z-19 bg-gradient-to-r from-purple-900/15 via-blue-900/10 to-pink-900/15" />
      
      {/* Castle silhouette layer */}
      <div className="fixed inset-0 -z-18 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2" width="400" height="200" viewBox="0 0 400 200">
          <defs>
            <linearGradient id="castleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a1a3e" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#0a0a23" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {/* Castle silhouette */}
          <path d="M50 200 L50 120 L70 120 L70 100 L90 100 L90 80 L110 80 L110 60 L130 60 L130 40 L150 40 L150 60 L170 60 L170 80 L190 80 L190 100 L210 100 L210 120 L230 120 L230 140 L250 140 L250 120 L270 120 L270 100 L290 100 L290 80 L310 80 L310 60 L330 60 L330 40 L350 40 L350 200 Z" fill="url(#castleGradient)" />
          {/* Castle spires */}
          <polygon points="130,40 140,20 150,40" fill="url(#castleGradient)" />
          <polygon points="330,40 340,20 350,40" fill="url(#castleGradient)" />
        </svg>
      </div>
      
      {/* Small twinkling stars */}
      <div className="fixed inset-0 -z-18 overflow-hidden pointer-events-none">
        {smallStars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity
            }}
            animate={{
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.animationDuration,
              delay: star.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Medium constellation stars */}
      <div className="fixed inset-0 -z-17 overflow-hidden pointer-events-none">
        {mediumStars.map((star) => (
          <motion.div
            key={`medium-${star.id}`}
            className="absolute text-yellow-200"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size * 2}px`
            }}
            animate={{
              opacity: [0.4, 1, 0.4],
              rotate: [0, 180, 360],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: star.animationDuration * 1.5,
              delay: star.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FontAwesomeIcon icon={faStar} />
          </motion.div>
        ))}
      </div>
      
      {/* Magical sparkles */}
      <div className="fixed inset-0 -z-16 overflow-hidden pointer-events-none">
        {sparkleStars.map((star, index) => (
          <motion.div
            key={`sparkle-${star.id}`}
            className={`absolute ${index % 2 === 0 ? 'text-pink-300' : 'text-blue-300'}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              fontSize: `${star.size * 1.5}px`
            }}
            animate={{
              scale: [0.5, 1.5, 0.5],
              rotate: [0, 360],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{
              duration: star.animationDuration * 2,
              delay: star.animationDelay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FontAwesomeIcon icon={index % 3 === 0 ? faGem : faMagic} />
          </motion.div>
        ))}
      </div>
      
      {/* Fireworks bursts */}
      <div className="fixed inset-0 -z-15 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute"
            style={{
              left: `${25 + i * 20}%`,
              top: `${15 + Math.random() * 25}%`,
            }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 2,
              ease: "easeOut"
            }}
          >
            <div className="relative">
              {/* Firework center */}
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${
                i % 3 === 0 ? 'from-yellow-300 to-orange-400' :
                i % 3 === 1 ? 'from-pink-300 to-purple-400' :
                'from-blue-300 to-cyan-400'
              }`} />
              {/* Firework sparks */}
              {[...Array(8)].map((_, sparkIndex) => (
                <motion.div
                  key={sparkIndex}
                  className={`absolute w-1 h-8 ${
                    i % 3 === 0 ? 'bg-yellow-300' :
                    i % 3 === 1 ? 'bg-pink-300' :
                    'bg-blue-300'
                  } rounded-full origin-bottom`}
                  style={{
                    transform: `rotate(${sparkIndex * 45}deg)`,
                    transformOrigin: 'bottom center',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-0.5px',
                    marginTop: '-32px'
                  }}
                  animate={{
                    scaleY: [0, 1, 0.3],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.5 + sparkIndex * 0.1,
                    repeat: Infinity,
                    repeatDelay: 3 + Math.random() * 2
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Subtle floating magical elements */}
      <div className="fixed inset-0 -z-14 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute text-pink-400/25 text-sm"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: typeof window !== 'undefined' ? window.innerHeight + 50 : 900,
            }}
            animate={{
              y: -100,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: i * 3
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </motion.div>
        ))}
      </div>
      
      
      {/* Main Content */}
      <div className="relative z-10 p-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[85vw]">
          <RoomForm />
        </div>
      </div>
    </div>
  )
}

export default HotelDetailPage