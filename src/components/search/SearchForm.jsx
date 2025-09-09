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
          y: 20,
          scale: 1,
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
        }}
        animate={{ 
          opacity: 1, 
          y: 0,
          scale: 1,
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -1px 0 rgba(0, 0, 0, 0.1)'
        }}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)'
        }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 20px 60px rgba(31, 38, 135, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)'
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="rounded-3xl shadow-2xl p-10 backdrop-blur-xl relative overflow-hidden transition-all duration-500 cursor-pointer group"
      >
        {/* Animated Gradient Border */}
        <motion.div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(220, 38, 38, 0.3), rgba(251, 191, 36, 0.3), transparent)',
            backgroundSize: '400% 400%',
            animation: 'gradient 3s ease infinite',
            padding: '2px'
          }}
        >
          <div className="w-full h-full rounded-3xl" style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
        </motion.div>

        {/* Arc Reactor Effect */}
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-80 animate-pulse shadow-lg shadow-blue-400/50 z-10"></div>
        <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 animate-pulse z-10"></div>
      
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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          className="w-full bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 hover:from-red-700 hover:via-red-600 hover:to-yellow-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:shadow-xl border border-yellow-400/30 relative overflow-hidden"
          style={{
            boxShadow: '0 0 20px rgba(220, 38, 38, 0.4), 0 0 40px rgba(251, 191, 36, 0.2)',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.3)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="text-lg relative z-10"><FontAwesomeIcon icon={faSearch} className="mr-2" />Search for prices</span>
          </motion.button>
        </motion.div>
        </div>
      </motion.div>
      
      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  )
}

export default SearchForm