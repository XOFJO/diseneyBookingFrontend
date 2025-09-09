import React, { useState } from 'react'
import { Popover } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faUser, faChevronDown, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

function DateRoomPicker() {
  const [checkInDate, setCheckInDate] = useState(new Date())
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000))
  const [rooms, setRooms] = useState(1)

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: '2-digit' 
    })
  }

  const getNights = () => {
    const diffTime = checkOutDate - checkInDate
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 1
  }

  const handleDateChange = (e, type) => {
    const selectedDate = new Date(e.target.value)
    if (type === 'checkin') {
      setCheckInDate(selectedDate)
      if (selectedDate >= checkOutDate) {
        setCheckOutDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))
      }
    } else {
      if (selectedDate > checkInDate) {
        setCheckOutDate(selectedDate)
      }
    }
  }

  const adjustRooms = (increment) => {
    setRooms(prev => Math.max(1, prev + increment))
  }

  return (
    <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 px-2 py-2">
      <Popover className="relative flex-1">
        <Popover.Button className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-50 rounded-l-full">
          <div>
            <div className="text-xs font-medium text-gray-600">Check In Date</div>
            <div className="text-sm font-semibold text-gray-900">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-gray-400" />
              {formatDate(checkInDate)}
            </div>
          </div>
        </Popover.Button>
        
        <Popover.Panel className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border p-4 left-0">
          <input
            type="date"
            value={checkInDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'checkin')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </Popover.Panel>
      </Popover>

      <div className="text-center px-3 py-2 border-l border-r border-gray-200">
        <div className="text-xs text-gray-600">{getNights()} Night(s)</div>
      </div>

      <Popover className="relative flex-1">
        <Popover.Button className="flex items-center justify-between w-full px-4 py-2 text-left hover:bg-gray-50">
          <div>
            <div className="text-xs font-medium text-gray-600">Check Out Date</div>
            <div className="text-sm font-semibold text-gray-900">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2 text-gray-400" />
              {formatDate(checkOutDate)}
            </div>
          </div>
        </Popover.Button>
        
        <Popover.Panel className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border p-4 left-0">
          <input
            type="date"
            value={checkOutDate.toISOString().split('T')[0]}
            min={new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e, 'checkout')}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </Popover.Panel>
      </Popover>

      <Popover className="relative">
        <Popover.Button className="flex items-center px-4 py-2 text-left hover:bg-gray-50 border-l border-gray-200">
          <div>
            <div className="text-xs font-medium text-gray-600">Room and Guest</div>
            <div className="text-sm font-semibold text-gray-900 flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-gray-400" />
              {rooms} Room{rooms > 1 ? 's' : ''}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-3 w-3 text-gray-400" />
            </div>
          </div>
        </Popover.Button>
        
        <Popover.Panel className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg border p-4 right-0 w-64">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Rooms</span>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => adjustRooms(-1)}
                disabled={rooms <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FontAwesomeIcon icon={faMinus} className="h-3 w-3 text-gray-500" />
              </button>
              <span className="font-semibold text-gray-900 w-8 text-center">{rooms}</span>
              <button
                onClick={() => adjustRooms(1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <FontAwesomeIcon icon={faPlus} className="h-3 w-3 text-gray-500" />
              </button>
            </div>
          </div>
        </Popover.Panel>
      </Popover>

      <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-colors">
        Search
      </button>
    </div>
  )
}

export default DateRoomPicker