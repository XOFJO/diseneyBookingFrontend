import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faMoon, faRocket, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function DateRangePicker({ checkIn, checkOut, onDateChange }) {
  const [nights, setNights] = useState(1)
  const [currentMonth, setCurrentMonth] = useState(new Date())

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
      onDateChange(dateStr, '')
    } else if (checkIn && !checkOut) {
      // Complete the range
      const checkInDate = new Date(checkIn + 'T00:00:00')
      const selectedDateTime = new Date(dateStr + 'T00:00:00')
      if (selectedDateTime > checkInDate) {
        const diffTime = selectedDateTime - checkInDate
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        setNights(diffDays)
        onDateChange(checkIn, dateStr)
      } else {
        // If selected date is before or same as check-in, reset
        onDateChange(dateStr, '')
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
              : 'text-gray-900 hover:bg-red-600/30 hover:text-white cursor-pointer'
            }
            ${isSelected 
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-yellow-400 shadow-lg' 
              : ''
            }
            ${isInRange && !isSelected 
              ? 'bg-red-900/30 text-yellow-300' 
              : ''
            }
          `}
          style={{
            boxShadow: isSelected ? '0 0 15px rgba(220, 38, 38, 0.5)' : '',
            textShadow: isSelected ? '0 0 5px rgba(251, 191, 36, 0.5)' : ''
          }}
        >
          {day}
        </motion.button>
      )
    }
    
    return days
  }

  // Calculate nights when dates change
  React.useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn + 'T00:00:00')
      const checkOutDate = new Date(checkOut + 'T00:00:00')
      const diffTime = checkOutDate - checkInDate
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      setNights(diffDays > 0 ? diffDays : 0)
    }
  }, [checkIn, checkOut])

  return (
    <>
      {/* Check In Date */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-yellow-400 mb-3" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
          <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />Check In Date
        </label>
        
        <Popover className="relative">
          <Popover.Button className="w-full px-4 py-4 border-2 border-red-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-yellow-400/60 text-white font-medium bg-gradient-to-r from-gray-900/80 to-red-900/20 group hover:shadow-lg backdrop-blur-sm text-left"
            style={{ 
              boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="flex items-center justify-between">
              <span>{checkIn ? new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Select check-in date'}</span>
              <FontAwesomeIcon icon={faCalendarDays} className="h-5 w-5 text-red-400 group-hover:text-yellow-400" />
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
            <Popover.Panel className="absolute z-50 bg-gradient-to-br from-gray-900/95 to-red-900/90 rounded-xl border-2 border-red-500/30 backdrop-blur-lg p-6 shadow-xl top-full mt-2"
              style={{ 
                boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)',
                width: '320px',
                maxHeight: '400px',
                overflowY: 'auto'
              }}
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 rounded-lg hover:bg-red-600/30 text-red-400 hover:text-yellow-400 transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </motion.button>
                <h3 className="text-yellow-400 font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 rounded-lg hover:bg-red-600/30 text-red-400 hover:text-yellow-400 transition-colors"
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
            style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}
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
          <label className="block text-sm font-medium text-yellow-400" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />Check Out Date
          </label>
          {nights > 0 && checkIn && checkOut && (
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="text-xs bg-gradient-to-r from-red-600 to-red-700 text-yellow-400 px-3 py-1 rounded-full font-bold border border-yellow-400/30"
              style={{ 
                textShadow: '0 0 5px rgba(251, 191, 36, 0.5)',
                boxShadow: '0 0 10px rgba(220, 38, 38, 0.3)'
              }}
            >
              <FontAwesomeIcon icon={faMoon} className="mr-1" />{nights} Night{nights > 1 ? 's' : ''}
            </motion.span>
          )}
        </div>
        
        <Popover className="relative">
          <Popover.Button className="w-full px-4 py-4 border-2 border-red-500/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-yellow-400/60 text-white font-medium bg-gradient-to-r from-gray-900/80 to-red-900/20 group hover:shadow-lg backdrop-blur-sm text-left"
            style={{ 
              boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="flex items-center justify-between">
              <span>{checkOut ? new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Select check-out date'}</span>
              <FontAwesomeIcon icon={faCalendarDays} className="h-5 w-5 text-red-400 group-hover:text-yellow-400" />
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
            <Popover.Panel className="absolute z-50 bg-gradient-to-br from-gray-900/95 to-red-900/90 rounded-xl border-2 border-red-500/30 backdrop-blur-lg p-6 shadow-xl top-full mt-2"
              style={{ 
                boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)',
                width: '320px',
                maxHeight: '400px',
                overflowY: 'auto'
              }}
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 rounded-lg hover:bg-red-600/30 text-red-400 hover:text-yellow-400 transition-colors"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </motion.button>
                <h3 className="text-yellow-400 font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 rounded-lg hover:bg-red-600/30 text-red-400 hover:text-yellow-400 transition-colors"
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
            style={{ textShadow: '0 0 5px rgba(251, 191, 36, 0.5)' }}
          >
            <FontAwesomeIcon icon={faRocket} className="mr-1" />Check-out selected
          </motion.div>
        )}
      </motion.div>
    </>
  )
}

export default DateRangePicker