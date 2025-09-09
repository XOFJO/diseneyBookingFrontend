import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SelectHotel from './SelectHotel'
import DateRangePicker from './DateRangePicker'
import GuestSelector from './GuestSelector'
import useSearchStore from '../../store/searchStore'

function SearchForm() {
  const navigate = useNavigate()
  const { getSearchData, selectedHotel } = useSearchStore()

  const handleSearch = () => {
    const searchData = getSearchData()
    console.log('Search with data:', searchData)
    
    // Check if form is valid
    // if (!isSearchValid()) {
    //   alert('You need fill in check in and out date.')
    //   return
    // }
    
    // Navigate based on hotel selection
    if (selectedHotel && (selectedHotel.id === 'all' || selectedHotel.name === 'All Hotels')) {
      // User selected "All Hotels" - go to hotels listing page
      navigate('/hotels')
    } else if (selectedHotel && selectedHotel.id) {
      // User selected specific hotel - go to rooms page
      navigate('/rooms')
    } else {
      // Fallback to hotels page if no hotel selected
      navigate('/hotels')
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ 
          opacity: 0, 
          y: 30,
          scale: 0.95,
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
        }}
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.25)'
        }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 25px 50px rgba(74, 28, 92, 0.3), 0 0 60px rgba(251, 191, 36, 0.2)'
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="rounded-3xl shadow-2xl p-10 backdrop-blur-xl relative overflow-hidden group"
      >
        {/* Magical Sparkle Border */}
        <motion.div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-800"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.2), rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2), transparent)',
            backgroundSize: '400% 400%',
            animation: 'magicalGlow 4s ease infinite',
            padding: '2px'
          }}
        >
          <div className="w-full h-full rounded-3xl" style={{ background: 'rgba(255, 255, 255, 0.08)' }} />
        </motion.div>

        {/* Floating Stars */}
        <motion.div 
          className="absolute top-4 right-4 text-yellow-300 text-2xl opacity-70"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          ✨
        </motion.div>
        <motion.div 
          className="absolute top-8 right-8 text-pink-300 text-lg opacity-60"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
          }}
        >
          🌟
        </motion.div>
      
        {/* Content Container with z-index */}
        <div className="relative z-10">
          {/* Hotel Selection */}
          <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SelectHotel />
      </motion.div>

      {/* Date Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
      >
        <DateRangePicker />
      </motion.div>

      {/* Guest Selection */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <GuestSelector />
      </motion.div>

      {/* Search Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center space-y-4"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 0 40px rgba(251, 191, 36, 0.4), 0 0 60px rgba(147, 51, 234, 0.3)'
          }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 hover:from-purple-700 hover:via-pink-600 hover:to-yellow-400 text-white font-bold py-5 px-8 rounded-2xl shadow-lg transition-all duration-500 transform border border-yellow-400/40 relative overflow-hidden"
          style={{
            boxShadow: '0 0 30px rgba(147, 51, 234, 0.3), 0 0 50px rgba(251, 191, 36, 0.2)',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.4)',
            fontFamily: "'Comfortaa', 'Inter', sans-serif"
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />
          <motion.span 
            className="text-lg relative z-10 flex items-center justify-center"
            animate={{
              textShadow: [
                '0 0 15px rgba(255, 255, 255, 0.4)',
                '0 0 25px rgba(251, 191, 36, 0.6)',
                '0 0 15px rgba(255, 255, 255, 0.4)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FontAwesomeIcon icon={faSearch} className="mr-3" />
            ✨ Begin Your Magical Journey ✨
          </motion.span>
          </motion.button>
        </motion.div>
        </div>
      </motion.div>
      
      {/* CSS for magical animations */}
      <style jsx>{`
        @keyframes magicalGlow {
          0% { background-position: 0% 50%; }
          25% { background-position: 100% 50%; }
          50% { background-position: 100% 100%; }
          75% { background-position: 0% 100%; }
          100% { background-position: 0% 50%; }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&display=swap');
      `}</style>
    </div>
  )
}

export default SearchForm