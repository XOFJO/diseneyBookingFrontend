import React, { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUser, faChevronDown, faMinus, faPlus, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import useSearchStore from '../../store/searchStore'

function DateRoomPicker({ onSearch }) {
  // Get initial values from zustand store
  const { 
    checkIn: storeCheckIn, 
    checkOut: storeCheckOut, 
    rooms: storeRooms, 
    setCheckIn, 
    setCheckOut, 
    setRooms, 
  } = useSearchStore()
  
  // Local state - only updates store on search
  const [localCheckIn, setLocalCheckIn] = useState(storeCheckIn || "")
  const [localCheckOut, setLocalCheckOut] = useState(storeCheckOut || "")
  const [localRooms, setLocalRooms] = useState(storeRooms || 1)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Convert string dates to Date objects for display
  const checkInDate = localCheckIn ? new Date(localCheckIn) : new Date()
  const checkOutDate = localCheckOut ? new Date(localCheckOut) : new Date(Date.now() + 24 * 60 * 60 * 1000)
  
  // Initialize local state with store values or defaults
  useEffect(() => {
    if (!localCheckIn || !localCheckOut) {
      const today = new Date()
      const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000)
      if (!localCheckIn) setLocalCheckIn(formatDateForInput(today))
      if (!localCheckOut) setLocalCheckOut(formatDateForInput(tomorrow))
    }
  }, [])

  const today = new Date()

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', { 
      weekday: 'short', 
      month: 'short', 
      day: '2-digit' 
    })
  }

  const formatDateForInput = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const getNights = () => {
    if (localCheckIn && localCheckOut) {
      const checkInDate = new Date(localCheckIn)
      const checkOutDate = new Date(localCheckOut)
      const diffTime = checkOutDate - checkInDate
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 1
    }
    return 1
  }

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateSelect = (day, type) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = formatDateForInput(selectedDate)
    
    if (type === 'checkin') {
      if (selectedDate >= checkOutDate) {
        const nextDay = new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
        setLocalCheckIn(dateStr)
        setLocalCheckOut(formatDateForInput(nextDay))
      } else {
        setLocalCheckIn(dateStr)
      }
    } else {
      if (selectedDate > checkInDate) {
        setLocalCheckOut(dateStr)
      }
    }
  }

  const isDateInRange = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    return date >= checkInDate && date <= checkOutDate
  }

  const isDateSelected = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const dateStr = formatDateForInput(date)
    return dateStr === formatDateForInput(checkInDate) || dateStr === formatDateForInput(checkOutDate)
  }

  const isDateDisabled = (day) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayStart
  }

  const renderCalendar = (type) => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10" />)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day)
      const isSelected = isDateSelected(day)
      const isInRange = isDateInRange(day)
      
      days.push(
        <motion.button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day, type)}
          disabled={isDisabled}
          whileHover={!isDisabled ? { scale: 1.1 } : {}}
          whileTap={!isDisabled ? { scale: 0.9 } : {}}
          className={`
            w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 relative flex items-center justify-center
            ${isDisabled 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600 cursor-pointer'
            }
            ${isSelected 
              ? 'bg-blue-600 text-white shadow-lg' 
              : ''
            }
            ${isInRange && !isSelected 
              ? 'bg-blue-100 text-blue-600' 
              : ''
            }
          `}
        >
          {day}
        </motion.button>
      )
    }
    
    return days
  }

  const adjustRooms = (increment) => {
    const newRooms = Math.max(1, Math.min(5, localRooms + increment))
    setLocalRooms(newRooms)
  }

  // Handle search - update zustand store and trigger search
  const handleSearch = () => {
    // Update zustand store with local values
    setCheckIn(localCheckIn)
    setCheckOut(localCheckOut)
    setRooms(localRooms)
    
    // Call parent search function with current local values
    onSearch?.(localCheckIn, localCheckOut, localRooms)
  }

  return (
    <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 px-2 py-2">
      {/* Check In Date */}
      <Popover className="relative flex-1">
        <Popover.Button className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-50 rounded-l-full focus:outline-none">
          <div>
            <div className="text-xs font-medium text-gray-600">Check In Date</div>
            <div className="text-sm font-semibold text-gray-900">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-gray-400" />
              {formatDate(checkInDate)}
            </div>
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
          <Popover.Panel className="absolute z-50 bg-white rounded-xl border border-gray-200 shadow-xl p-4 mt-2 left-0"
            style={{ 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              width: '320px'
            }}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </motion.button>
              <h3 className="text-gray-800 font-semibold">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </motion.button>
            </div>
            
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-xs text-gray-500 py-2 font-medium w-10">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar('checkin')}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Nights Display */}
      <div className="text-center px-3 py-2 border-l border-r border-gray-200">
        <div className="text-xs text-gray-600">{getNights()} Night(s)</div>
      </div>

      {/* Check Out Date */}
      <Popover className="relative flex-1">
        <Popover.Button className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-50 focus:outline-none">
          <div>
            <div className="text-xs font-medium text-gray-600">Check Out Date</div>
            <div className="text-sm font-semibold text-gray-900">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-gray-400" />
              {formatDate(checkOutDate)}
            </div>
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
          <Popover.Panel className="absolute z-50 bg-white rounded-xl border border-gray-200 shadow-xl p-4 mt-2 right-0"
            style={{ 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              width: '320px'
            }}
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </motion.button>
              <h3 className="text-gray-800 font-semibold">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </motion.button>
            </div>
            
            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-center text-xs text-gray-500 py-2 font-medium w-10">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar('checkout')}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Room Selection */}
      <Popover className="relative">
        <Popover.Button className="flex items-center px-4 py-2 text-left hover:bg-gray-50 border-l border-gray-200 focus:outline-none">
          <div>
            <div className="text-xs font-medium text-gray-600">Room</div>
            <div className="text-sm font-semibold text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
              {localRooms} Room{localRooms > 1 ? 's' : ''}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-3 w-3 text-gray-400" />
            </div>
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
          <Popover.Panel className="absolute z-50 bg-white rounded-xl border border-gray-200 shadow-xl p-4 mt-2 right-0 w-64"
            style={{ 
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Rooms</span>
              <div className="flex items-center space-x-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustRooms(-1)}
                  disabled={localRooms <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FontAwesomeIcon icon={faMinus} className="h-3 w-3 text-gray-500" />
                </motion.button>
                <span className="font-semibold text-gray-900 w-8 text-center">{localRooms}</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => adjustRooms(1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <FontAwesomeIcon icon={faPlus} className="h-3 w-3 text-gray-500" />
                </motion.button>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Search Button */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSearch}
        className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg"
      >
        Search
      </motion.button>
    </div>
  )
}

export default DateRoomPicker