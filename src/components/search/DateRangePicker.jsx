import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faMoon, faMagic, faChevronLeft, faChevronRight, faStar, faRocket } from '@fortawesome/free-solid-svg-icons'
import useSearchStore from '../../store/searchStore'

function DateRangePicker() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const { checkIn, checkOut, nights, setDateRange } = useSearchStore()

  const today = new Date()


  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date) => {
    // Use local time to avoid timezone issues
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = formatDate(selectedDate)
    
    if (!checkIn || (checkIn && checkOut)) {
      // Start new selection
      setDateRange(dateStr, '')
    } else if (checkIn && !checkOut) {
      // Complete the range
      const checkInDate = new Date(checkIn + 'T00:00:00')
      const selectedDateTime = new Date(dateStr + 'T00:00:00')
      if (selectedDateTime > checkInDate) {
        setDateRange(checkIn, dateStr)
      } else {
        // If selected date is before or same as check-in, reset
        setDateRange(dateStr, '')
      }
    }
  }

  const isDateInRange = (day) => {
    if (!checkIn) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const checkInDate = new Date(checkIn + 'T00:00:00')
    const checkOutDate = checkOut ? new Date(checkOut + 'T00:00:00') : null
    
    if (checkOutDate) {
      return date >= checkInDate && date <= checkOutDate
    }
    return false
  }

  const isDateSelected = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = formatDate(date)
    return dateStr === checkIn || dateStr === checkOut
  }

  const isDateDisabled = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayStart
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    
    // Empty cells for days before first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day)
      const isSelected = isDateSelected(day)
      const isInRange = isDateInRange(day)
      
      days.push(
        <motion.button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          whileHover={!isDisabled ? { scale: 1.1 } : {}}
          whileTap={!isDisabled ? { scale: 0.9 } : {}}
          className={`
            w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 relative flex items-center justify-center
            ${isDisabled 
              ? 'text-gray-600 cursor-not-allowed' 
              : 'text-gray-900 hover:bg-purple-600/30 hover:text-white cursor-pointer'
            }
            ${isSelected 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-yellow-400 shadow-lg' 
              : ''
            }
            ${isInRange && !isSelected 
              ? 'bg-purple-900/30 text-yellow-300' 
              : ''
            }
          `}
          style={{
            boxShadow: isSelected ? '0 0 15px rgba(147, 51, 234, 0.5)' : '',
            textShadow: isSelected ? '0 0 5px rgba(251, 191, 36, 0.5)' : ''
          }}
        >
          {day}
        </motion.button>
      )
    }
    
    return days
  }


  return (
    <>
      {/* Check In Date */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-purple-200 mb-3 flex items-center" style={{ 
          textShadow: '0 0 15px rgba(147, 51, 234, 0.6)',
          fontFamily: "'Comfortaa', sans-serif"
        }}>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mr-2"
          >
            <FontAwesomeIcon icon={faMagic} className="text-pink-300" />
          </motion.div>
          Check In Date
        </label>
        
        <Popover className="relative">
          <Popover.Button className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 hover:bg-white/25 hover:border-white/50 text-yellow-400 font-medium group hover:shadow-xl text-left"
            style={{ 
              textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)',
              fontFamily: "'Comfortaa', sans-serif"
            }}
          >
            <div className="flex items-center justify-between">
              <span>{checkIn ? new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Select magical check-in date'}</span>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="h-5 w-5 text-pink-300 group-hover:text-yellow-300" />
              </motion.div>
            </div>
          </Popover.Button>
          
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="fixed z-50 bg-gradient-to-br from-purple-900/95 via-pink-900/90 to-indigo-900/95 rounded-2xl border-2 border-purple-400/40 backdrop-blur-xl p-6 shadow-2xl"
              style={{ 
                boxShadow: '0 0 40px rgba(147, 51, 234, 0.4), 0 0 80px rgba(251, 191, 36, 0.2)',
                width: '340px',
                maxHeight: '90vh',
                overflowY: 'auto',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Comfortaa', sans-serif"
              }}
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.2, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-3 rounded-xl hover:bg-purple-600/40 text-purple-300 hover:text-yellow-300 transition-all duration-300 hover:shadow-lg"
                  style={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </motion.button>
                <motion.h3 
                  className="text-purple-200 font-bold text-lg"
                  style={{ textShadow: '0 0 15px rgba(196, 181, 253, 0.6)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </motion.h3>
                <motion.button
                  whileHover={{ scale: 1.2, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-3 rounded-xl hover:bg-purple-600/40 text-purple-300 hover:text-yellow-300 transition-all duration-300 hover:shadow-lg"
                  style={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </motion.button>
              </div>
              
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs text-gray-400 py-2 font-medium w-10">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        
        {checkIn && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-yellow-400 font-medium mt-2"
            style={{ 
              textShadow: '0 0 5px rgba(251, 191, 36, 0.5)',
              fontFamily: "'Comfortaa', sans-serif"
            }}
          >
            <FontAwesomeIcon icon={faRocket} className="mr-1" />Check-in selected
          </motion.div>
        )}
      </motion.div>

      {/* Check Out Date */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-purple-200 flex items-center" style={{ 
            textShadow: '0 0 15px rgba(147, 51, 234, 0.6)',
            fontFamily: "'Comfortaa', sans-serif"
          }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="mr-2"
            >
              <FontAwesomeIcon icon={faMoon} className="text-pink-300" />
            </motion.div>
            Check Out Date
          </label>
          {nights > 0 && checkIn && checkOut && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-yellow-400 px-3 py-1 rounded-full font-bold border border-yellow-400/30"
              style={{ 
                textShadow: '0 0 5px rgba(251, 191, 36, 0.5)',
                boxShadow: '0 0 10px rgba(147, 51, 234, 0.3)',
                fontFamily: "'Comfortaa', sans-serif"
              }}
            >
              <FontAwesomeIcon icon={faMoon} className="mr-1" />{nights} Night{nights > 1 ? 's' : ''}
            </motion.span>
          )}
        </div>
        
        <Popover className="relative">
          <Popover.Button className="w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 hover:bg-white/25 hover:border-white/50 text-yellow-400 font-medium group hover:shadow-xl text-left"
            style={{ 
              textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.2)',
              fontFamily: "'Comfortaa', sans-serif"
            }}
          >
            <div className="flex items-center justify-between">
              <span>{checkOut ? new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : ' Select magical check-out date'}</span>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <FontAwesomeIcon icon={faCalendarDays} className="h-5 w-5 text-pink-300 group-hover:text-yellow-300" />
              </motion.div>
            </div>
          </Popover.Button>
          
          <Transition
            enter="transition duration-200 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="fixed z-50 bg-gradient-to-br from-purple-900/95 via-pink-900/90 to-indigo-900/95 rounded-2xl border-2 border-purple-400/40 backdrop-blur-xl p-6 shadow-2xl"
              style={{ 
                boxShadow: '0 0 40px rgba(147, 51, 234, 0.4), 0 0 80px rgba(251, 191, 36, 0.2)',
                width: '340px',
                maxHeight: '90vh',
                overflowY: 'auto',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Comfortaa', sans-serif"
              }}
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.2, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-3 rounded-xl hover:bg-purple-600/40 text-purple-300 hover:text-yellow-300 transition-all duration-300 hover:shadow-lg"
                  style={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </motion.button>
                <motion.h3 
                  className="text-purple-200 font-bold text-lg"
                  style={{ textShadow: '0 0 15px rgba(196, 181, 253, 0.6)' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </motion.h3>
                <motion.button
                  whileHover={{ scale: 1.2, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-3 rounded-xl hover:bg-purple-600/40 text-purple-300 hover:text-yellow-300 transition-all duration-300 hover:shadow-lg"
                  style={{ boxShadow: '0 0 15px rgba(147, 51, 234, 0.3)' }}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </motion.button>
              </div>
              
              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2 mb-3">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="text-center text-xs text-gray-400 py-2 font-medium w-10">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        
        {checkOut && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-yellow-400 font-medium mt-2"
            style={{ 
              textShadow: '0 0 5px rgba(251, 191, 36, 0.5)',
              fontFamily: "'Comfortaa', sans-serif"
            }}
          >
            <FontAwesomeIcon icon={faRocket} className="mr-1" />Check-out selected
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default DateRangePicker