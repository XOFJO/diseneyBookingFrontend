import React, { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faStar, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons'

const cities = [
    { id: 'all', name: '全部', icon: faMapMarkerAlt },
    { id: 'shanghai', name: '上海', icon: faMapMarkerAlt },
    { id: 'tokyo', name: '东京', icon: faMapMarkerAlt },
    { id: 'hongkong', name: '香港', icon: faMapMarkerAlt },
]

const themes = [
    { id: 'all', name: '全部', icon: faStar },
    { id: 'ironman', name: '钢铁侠', icon: faStar },
    { id: 'mickey', name: '米老鼠', icon: faStar },
    { id: 'toy', name: '玩具总动员', icon: faStar },
    { id: 'donald', name: '唐老鸭', icon: faStar },
]


function HotelFilter() {
    const [selectedCity, setSelectedCity] = useState(cities[0])
    const [selectedTheme, setSelectedTheme] = useState(themes[0])

    return (
        <div className="fixed top-20 left-0 right-0 w-full z-20">
            <div className="w-full bg-gradient-to-r from-gray-800/80 to-red-900/30 border-b-2 border-red-500/40 shadow-xl backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-3 flex gap-6">
                    {/* 城市选择栏 */}
                    <div className="flex-1 flex items-center gap-3">
                        <label className="text-sm font-medium text-yellow-400 whitespace-nowrap" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />城市
                        </label>
                        <Listbox value={selectedCity} onChange={setSelectedCity}>
                            <div className="relative flex-1">
                                <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-gradient-to-r from-gray-900/80 to-red-900/20 border-2 border-red-500/40 py-2 pl-4 pr-10 text-left shadow-lg hover:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 group backdrop-blur-sm" style={{ boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)' }}>
                                    <motion.div
                                        className="flex items-center space-x-3"
                                        whileHover={{ x: 2 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <motion.span
                                            className="text-lg filter drop-shadow-lg text-red-400"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                        >
                                            <FontAwesomeIcon icon={selectedCity.icon} />
                                        </motion.span>
                                        <span className="block truncate font-medium text-white group-hover:text-yellow-400 transition-colors" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                                            {selectedCity.name}
                                        </span>
                                    </motion.div>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                        <motion.div
                                            animate={{ rotate: 0 }}
                                            whileHover={{ rotate: 180 }}
                                            transition={{ duration: 0.2 }}
                                            className="h-4 w-4 text-red-400 group-hover:text-yellow-400"
                                            style={{ filter: 'drop-shadow(0 0 3px rgba(220, 38, 38, 0.7))' }}
                                        >
                                            <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                                        </motion.div>
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-gradient-to-b from-gray-900 to-black py-2 shadow-xl border-2 border-red-500/30 focus:outline-none backdrop-blur-lg" style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}>
                                        {cities.map((city, cityIdx) => (
                                            <Listbox.Option
                                                key={city.id}
                                                value={city}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 px-4 transition-all duration-150 border-l-2 ${active ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-yellow-300 border-l-yellow-400 shadow-lg' : 'text-gray-200 border-l-transparent hover:border-l-red-400'
                                                    }`
                                                }
                                            >
                                                {({ selected: isSelected }) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: cityIdx * 0.05 }}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <motion.span
                                                                className="text-lg filter drop-shadow-lg text-red-400"
                                                                whileHover={{ scale: 1.3, rotate: 10 }}
                                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                            >
                                                                <FontAwesomeIcon icon={city.icon} />
                                                            </motion.span>
                                                            <span className={`block truncate font-medium ${isSelected ? 'text-yellow-400' : ''}`} style={{ textShadow: isSelected ? '0 0 5px rgba(251, 191, 36, 0.5)' : '0 0 3px rgba(255, 255, 255, 0.2)' }}>
                                                                {city.name}
                                                            </span>
                                                        </div>
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ scale: 0, rotate: -180 }}
                                                                animate={{ scale: 1, rotate: 0 }}
                                                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                                                className="h-4 w-4 text-yellow-400"
                                                                style={{ filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.7))' }}
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>

                    {/* 主题选择栏 */}
                    <div className="flex-1 flex items-center gap-3">
                        <label className="text-sm font-medium text-yellow-400 whitespace-nowrap" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
                            <FontAwesomeIcon icon={faStar} className="mr-2" />主题
                        </label>
                        <Listbox value={selectedTheme} onChange={setSelectedTheme}>
                            <div className="relative flex-1">
                                <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-gradient-to-r from-gray-900/80 to-red-900/20 border-2 border-red-500/40 py-2 pl-4 pr-10 text-left shadow-lg hover:border-yellow-400/60 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 group backdrop-blur-sm" style={{ boxShadow: '0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 15px rgba(0, 0, 0, 0.5)' }}>
                                    <motion.div
                                        className="flex items-center space-x-3"
                                        whileHover={{ x: 2 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    >
                                        <motion.span
                                            className="text-lg filter drop-shadow-lg text-red-400"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                        >
                                            <FontAwesomeIcon icon={selectedTheme.icon} />
                                        </motion.span>
                                        <span className="block truncate font-medium text-white group-hover:text-yellow-400 transition-colors" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                                            {selectedTheme.name}
                                        </span>
                                    </motion.div>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                                        <motion.div
                                            animate={{ rotate: 0 }}
                                            whileHover={{ rotate: 180 }}
                                            transition={{ duration: 0.2 }}
                                            className="h-4 w-4 text-red-400 group-hover:text-yellow-400"
                                            style={{ filter: 'drop-shadow(0 0 3px rgba(220, 38, 38, 0.7))' }}
                                        >
                                            <FontAwesomeIcon icon={faChevronDown} className="h-4 w-4" />
                                        </motion.div>
                                    </span>
                                </Listbox.Button>

                                <Transition
                                    enter="transition duration-100 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-75 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Listbox.Options className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-gradient-to-b from-gray-900 to-black py-2 shadow-xl border-2 border-red-500/30 focus:outline-none backdrop-blur-lg" style={{ boxShadow: '0 0 30px rgba(220, 38, 38, 0.4)' }}>
                                        {themes.map((theme, themeIdx) => (
                                            <Listbox.Option
                                                key={theme.id}
                                                value={theme}
                                                className={({ active }) =>
                                                    `relative cursor-pointer select-none py-2 px-4 transition-all duration-150 border-l-2 ${active ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-yellow-300 border-l-yellow-400 shadow-lg' : 'text-gray-200 border-l-transparent hover:border-l-red-400'
                                                    }`
                                                }
                                            >
                                                {({ selected: isSelected }) => (
                                                    <motion.div
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: themeIdx * 0.05 }}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            <motion.span
                                                                className="text-lg filter drop-shadow-lg text-red-400"
                                                                whileHover={{ scale: 1.3, rotate: 10 }}
                                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                            >
                                                                <FontAwesomeIcon icon={theme.icon} />
                                                            </motion.span>
                                                            <span className={`block truncate font-medium ${isSelected ? 'text-yellow-400' : ''}`} style={{ textShadow: isSelected ? '0 0 5px rgba(251, 191, 36, 0.5)' : '0 0 3px rgba(255, 255, 255, 0.2)' }}>
                                                                {theme.name}
                                                            </span>
                                                        </div>
                                                        {isSelected && (
                                                            <motion.div
                                                                initial={{ scale: 0, rotate: -180 }}
                                                                animate={{ scale: 1, rotate: 0 }}
                                                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                                                className="h-4 w-4 text-yellow-400"
                                                                style={{ filter: 'drop-shadow(0 0 3px rgba(251, 191, 36, 0.7))' }}
                                                            >
                                                                <FontAwesomeIcon icon={faCheck} className="h-4 w-4" />
                                                            </motion.div>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelFilter
