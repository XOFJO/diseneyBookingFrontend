import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Popover, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

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
        <button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(day)}
          disabled={isDisabled}
          className={`
            w-8 h-8 rounded text-sm font-medium transition-colors flex items-center justify-center
            ${isDisabled 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 cursor-pointer hover:bg-gray-100'
            }
            ${isSelected 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : ''
            }
            ${isInRange && !isSelected 
              ? 'bg-blue-100 text-blue-700' 
              : ''
            }
          `}
        >
          {day}
        </button>
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
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          📅 Check In Date
        </label>
        
        <Popover className="relative">
          <Popover.Button className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900 font-medium text-left hover:border-gray-400">
            <div className="flex items-center justify-between">
              <span>{checkIn ? new Date(checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Select date'}</span>
              <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4 text-red-500" />
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
            <Popover.Panel className="absolute z-50 bg-white rounded-lg border border-gray-200 shadow-lg p-4 top-full mt-2 w-72">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h3 className="text-gray-800 font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
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
      </div>

      {/* Check Out Date */}
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-600">
            📅 Check Out Date
          </label>
          {nights > 0 && checkIn && checkOut && (
            <span className="text-xs text-blue-600 px-2 py-1 bg-blue-50 rounded font-medium">
              🌙 {nights} Night{nights > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <Popover className="relative">
          <Popover.Button className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-gray-900 font-medium text-left hover:border-gray-400">
            <div className="flex items-center justify-between">
              <span>{checkOut ? new Date(checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Select date'}</span>
              <FontAwesomeIcon icon={faCalendarDays} className="h-4 w-4 text-red-500" />
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
            <Popover.Panel className="absolute z-50 bg-white rounded-lg border border-gray-200 shadow-lg p-4 top-full mt-2 w-72">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-1 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h3 className="text-gray-800 font-semibold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-1 rounded text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
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
      </div>
    </>
  )
}

export default DateRangePicker