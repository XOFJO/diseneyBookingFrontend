import React, { useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { motion } from 'motion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faStar, faChevronDown, faCheck, faSearch, faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import useHotels from '../../hooks/useHotels'

const cities = [
    { id: 'all', name: '全部', icon: faMapMarkerAlt },
    { id: 'shanghai', name: '上海市', icon: faMapMarkerAlt },
    { id: 'tokyo', name: '东京', icon: faMapMarkerAlt },
    { id: 'hongkong', name: '香港特别行政区', icon: faMapMarkerAlt },
]

const themes = [
    { id: 'all', name: '全部', icon: faStar, apiName: 'all' },
    { id: 'ironman', name: '钢铁侠', icon: faStar, apiName: 'Iron Man Adventure' },
    { id: 'caribbean', name: '加勒比海盗', icon: faStar, apiName: 'Pirates of the Caribbean' },
    { id: 'toy', name: '玩具总动员', icon: faStar, apiName: 'Toy Story Land' },
    { id: 'donald', name: '唐老鸭', icon: faStar, apiName: 'Donald Duck Dreams' },
    { id: 'frozen', name: '冰雪奇缘', icon: faStar, apiName: 'Frozen Magic' },
    { id: 'galaxy', name: '星球大战', icon: faStar, apiName: "Galaxy's Edge" },
]


function HotelFilter() {
    const [selectedCity, setSelectedCity] = useState(cities[0])
    const [selectedThemes, setSelectedThemes] = useState([]) // 默认不选任何主题
    const { searchHotels, loading } = useHotels()

    const handleThemeChange = (newSelectedThemes) => {
        // 找出新增或移除的主题
        const prevIds = selectedThemes.map(t => t.id)
        const newIds = newSelectedThemes.map(t => t.id)
        
        // 找出新增的主题
        const addedTheme = newSelectedThemes.find(t => !prevIds.includes(t.id))
        // 找出移除的主题
        const removedThemeId = prevIds.find(id => !newIds.includes(id))
        
        if (addedTheme?.id === 'all') {
            // 如果新增的是"全部"，选择所有主题
            setSelectedThemes([...themes])
        } else if (removedThemeId === 'all') {
            // 如果手动取消"全部"，清空所有选择
            setSelectedThemes([])
        } else if (removedThemeId && removedThemeId !== 'all') {
            // 如果取消了任意一个非"全部"的选项，移除"全部"选项但保留其他选择
            const newSelection = newSelectedThemes.filter(t => t.id !== 'all')
            setSelectedThemes(newSelection)
        } else if (addedTheme && addedTheme.id !== 'all') {
            // 如果新增的是其他主题，移除"全部"选项
            const withoutAll = newSelectedThemes.filter(t => t.id !== 'all')
            
            // 检查是否选择了除"全部"外的所有选项
            const nonAllThemes = themes.filter(t => t.id !== 'all')
            if (withoutAll.length === nonAllThemes.length) {
                // 如果选择了所有非"全部"选项，自动添加"全部"
                setSelectedThemes([...themes])
            } else {
                setSelectedThemes(withoutAll)
            }
        } else {
            // 其他情况，直接更新
            setSelectedThemes(newSelectedThemes)
        }
    }

    const handleSearch = async () => {
        try {
            // 构建搜索参数
            const searchParams = {
                address: selectedCity.id === 'all' ? '' : selectedCity.name,
                themes: selectedThemes.some(t => t.id === 'all') 
                    ? [] // 如果选择了"全部"，发送空数组
                    : selectedThemes.map(theme => theme.apiName)
            }
            
            console.log('搜索参数:', searchParams)
            await searchHotels(searchParams)
        } catch (error) {
            console.error('搜索失败:', error)
        }
    }

    return (
        // 动画效果
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 w-full z-20"
        >

            <div className="w-full bg-gradient-to-r from-gray-800/80 to-red-900/30 border-b-2 border-red-500/40 shadow-xl backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-3 flex gap-4 items-center">
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

                    {/* 主题选择栏 - 多选 */}
                    <div className="flex-1 flex items-center gap-3">
                        <label className="text-sm font-medium text-yellow-400 whitespace-nowrap" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5)' }}>
                            <FontAwesomeIcon icon={faStar} className="mr-2" />主题
                        </label>
                        <Listbox value={selectedThemes} onChange={handleThemeChange} multiple>
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
                                            <FontAwesomeIcon icon={faStar} />
                                        </motion.span>
                                        {/* 这里是搜索框内的文字逻辑 */}
                                        <span className="block truncate font-medium text-white group-hover:text-yellow-400 transition-colors" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                                            {selectedThemes.length === 0 ? '选择主题' : 
                                             selectedThemes.some(t => t.id === 'all') ? '全部' :
                                             selectedThemes.length === 1 ? selectedThemes[0].name :
                                             `已选择 ${selectedThemes.length} 个主题`}
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
                                        {themes.map((theme, themeIdx) => {
                                            const isSelected = selectedThemes.some(t => t.id === theme.id)
                                            return (
                                                <Listbox.Option
                                                    key={theme.id}
                                                    value={theme}
                                                    className={({ active }) =>
                                                        `relative cursor-pointer select-none py-2 px-4 transition-all duration-150 border-l-2 ${
                                                            active ? 'bg-gradient-to-r from-red-900/50 to-red-800/30 text-yellow-300 border-l-yellow-400 shadow-lg' : 'text-gray-200 border-l-transparent hover:border-l-red-400'
                                                        }`
                                                    }
                                                >
                                                    {() => (//不使用 Headless UI 提供的 selected 参数，而是使用自己计算的 isSelected 变量。
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: themeIdx * 0.05 }}
                                                            className="flex items-center justify-between"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <motion.span
                                                                    className={`text-lg filter drop-shadow-lg transition-colors ${
                                                                        isSelected ? 'text-yellow-400' : 'text-red-400'
                                                                    }`}
                                                                    whileHover={{ scale: 1.3 }}
                                                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                                >
                                                                    <FontAwesomeIcon 
                                                                        icon={isSelected ? faCheckSquare : faSquare} 
                                                                    />
                                                                </motion.span>
                                                                <span className={`block truncate font-medium ${isSelected ? 'text-yellow-400' : ''}`} style={{ textShadow: isSelected ? '0 0 5px rgba(251, 191, 36, 0.5)' : '0 0 3px rgba(255, 255, 255, 0.2)' }}>
                                                                    {theme.name}
                                                                </span>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </Listbox.Option>
                                            )
                                        })}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    
                    {/* 搜索按钮 */}
                    <div className="flex-shrink-0">
                        <motion.button
                            onClick={handleSearch}
                            disabled={loading}
                            className={`relative cursor-pointer rounded-xl bg-gradient-to-r from-red-900/80 to-yellow-900/60 border-2 border-red-500/60 px-6 py-2 text-left shadow-lg hover:border-yellow-400/80 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 transition-all duration-200 group backdrop-blur-sm ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            style={{ boxShadow: '0 0 20px rgba(220, 38, 38, 0.4), inset 0 0 15px rgba(251, 191, 36, 0.1)' }}
                            whileHover={!loading ? { scale: 1.02 } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <motion.div 
                                className="flex items-center space-x-2"
                                whileHover={!loading ? { x: 1 } : {}}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <motion.span 
                                    className="text-lg filter drop-shadow-lg text-yellow-400"
                                    whileHover={!loading ? { scale: 1.2, rotate: 15 } : {}}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                    animate={loading ? { rotate: 360 } : { rotate: 0 }}
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </motion.span>
                                <span className="font-medium text-white group-hover:text-yellow-300 transition-colors whitespace-nowrap" style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.3)' }}>
                                    {loading ? '搜索中...' : '搜索'}
                                </span>
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HotelFilter
