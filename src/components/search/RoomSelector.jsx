import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faHotel, faMinus, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function RoomSelector() {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    rooms: 1
  })
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
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const handleDateSelect = (day) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = formatDate(selectedDate)
    
    if (!formData.checkIn || (formData.checkIn && formData.checkOut)) {
      setFormData(prev => ({ ...prev, checkIn: dateStr, checkOut: '' }))
    } else if (formData.checkIn && !formData.checkOut) {
      const checkInDate = new Date(formData.checkIn + 'T00:00:00')
      const selectedDateTime = new Date(dateStr + 'T00:00:00')
      if (selectedDateTime > checkInDate) {
        setFormData(prev => ({ ...prev, checkOut: dateStr }))
      } else {
        setFormData(prev => ({ ...prev, checkIn: dateStr, checkOut: '' }))
      }
    }
  }

  const isDateInRange = (day) => {
    if (!formData.checkIn) return false
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const checkInDate = new Date(formData.checkIn + 'T00:00:00')
    const checkOutDate = formData.checkOut ? new Date(formData.checkOut + 'T00:00:00') : null
    
    if (checkOutDate) {
      return date >= checkInDate && date <= checkOutDate
    }
    return false
  }

  const isDateSelected = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = formatDate(date)
    return dateStr === formData.checkIn || dateStr === formData.checkOut
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
      days.push(<div key={`empty-${i}`} className="w-8 h-8" />)
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
          className={`w-8 h-8 text-sm rounded-lg transition-all duration-200 ${
            isDisabled
              ? 'text-gray-600 cursor-not-allowed'
              : isSelected
              ? 'bg-yellow-400 text-gray-900 font-bold shadow-lg'
              : isInRange
              ? 'bg-red-500/30 text-yellow-400'
              : 'text-gray-200 hover:bg-red-600/30 hover:text-yellow-400'
          }`}
        >
          {day}
        </motion.button>
      )
    }
    
    return days
  }

  const updateRooms = (newRooms) => {
    setFormData(prev => ({ ...prev, rooms: newRooms }))
  }

  return (
    <div className="fixed top-20 left-0 right-0 w-full z-20">
      <div className="w-full bg-gradient-to-r from-gray-800/80 to-red-900/30 border-b-2 border-red-500/40 shadow-xl backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex gap-6 items-center">
            {/* Check-in Date */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-yellow-400 mb-1">
                <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />Check In
              </label>
              <Popover className="relative">
                <Popover.Button className="w-full px-3 py-2 border-2 border-red-500/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 hover:border-yellow-400/60 text-white text-sm bg-gradient-to-r from-gray-900/80 to-red-900/20 group hover:shadow-lg backdrop-blur-sm text-left">
                  <span className="text-xs">
                    {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select date'}
                  </span>
                </Popover.Button>
                
                <Transition
                  enter="transition duration-200 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Popover.Panel className="fixed z-50 bg-gradient-to-br from-gray-900/95 to-red-900/90 rounded-xl border-2 border-red-500/30 backdrop-blur-lg p-4 shadow-xl"
                    style={{ 
                      boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)',
                      width: '280px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Calendar Header */}
                    <div className="flex items-center justify-between mb-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                        className="p-1 rounded-lg hover:bg-red-600/30 text-red-400 hover:text-yellow-400 transition-colors"
                      >
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </motion.button>
                      <h3 className="text-yellow-400 font-semibold text-sm">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                        className="p-1 rounded-lg hover:bg-red-600/30 text-red-400 hover:text-yellow-400 transition-colors"
                      >
                        <FontAwesomeIcon icon={faChevronRight} />
                      </motion.button>
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-400">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {renderCalendar()}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>

            {/* Check-out Date */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-yellow-400 mb-1">
                <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />Check Out
              </label>
              <div className="w-full px-3 py-2 border-2 border-red-500/40 rounded-lg text-white text-sm bg-gradient-to-r from-gray-900/80 to-red-900/20 backdrop-blur-sm">
                <span className="text-xs">
                  {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select date'}
                </span>
              </div>
            </div>

            {/* Rooms */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-yellow-400 mb-1">
                <FontAwesomeIcon icon={faHotel} className="mr-1" />Rooms
              </label>
              <div className="flex items-center justify-between px-3 py-2 border-2 border-red-500/40 rounded-lg bg-gradient-to-r from-gray-900/80 to-red-900/20 backdrop-blur-sm">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => updateRooms(Math.max(1, formData.rooms - 1))}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formData.rooms <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} className="w-3 h-3" />
                </motion.button>
                <span className="text-sm font-bold text-yellow-400 mx-3">
                  {formData.rooms}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={() => updateRooms(Math.min(5, formData.rooms + 1))}
                  className="w-6 h-6 rounded-full bg-gradient-to-r from-gray-800 to-red-900/50 border border-red-500/40 hover:border-yellow-400/60 flex items-center justify-center text-red-400 hover:text-yellow-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={formData.rooms >= 5}
                >
                  <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomSelector