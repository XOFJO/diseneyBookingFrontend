import React from 'react'

const ThemeSelector = ({ activeTab, setActiveTab, onThemeFilter }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (onThemeFilter) {
      onThemeFilter(tab)
    }
  }

  return (
    <div className="flex border-b mb-6">
      <button 
        onClick={() => handleTabClick('standard')}
        className={`px-6 py-3 font-medium border-b-2 ${
          activeTab === 'standard' 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        Iron man themes
      </button>
      <button 
        onClick={() => handleTabClick('packages')}
        className={`px-6 py-3 font-medium border-b-2 ${
          activeTab === 'packages' 
            ? 'border-blue-500 text-blue-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700'
        }`}
      >
        Micky Mouse
      </button>
    </div>
  )
}

export default ThemeSelector