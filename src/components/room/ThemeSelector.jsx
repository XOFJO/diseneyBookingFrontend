import React from 'react'
import { TabGroup, TabList, Tab } from '@headlessui/react'

const ThemeSelector = ({ activeTab, setActiveTab, onThemeFilter, themes = [] }) => {
  // Create tabs from backend themes, with an "All Themes" option
  const tabs = [
    { key: 'all', label: 'All Themes' },
    ...themes.map((theme) => ({
      key: theme.toLowerCase().replace(/\s+/g, '-'),
      label: theme
    }))
  ]

  const selectedIndex = tabs.findIndex(tab => tab.key === activeTab)

  const handleTabChange = (index) => {
    const selectedTab = tabs[index]
    setActiveTab(selectedTab.key)
    if (onThemeFilter) {
      onThemeFilter(selectedTab.key)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Theme Selection</h3>
      <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
        <TabList className="flex flex-wrap gap-2 mb-4">
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              className="px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 outline-none 
                         data-[selected]:bg-blue-500 data-[selected]:text-white data-[selected]:border-blue-500 data-[selected]:shadow-md data-[selected]:scale-105
                         data-[hover]:bg-blue-50 data-[hover]:border-blue-300 data-[hover]:scale-102
                         data-[focus]:ring-2 data-[focus]:ring-blue-300 data-[focus]:ring-offset-1
                         border-gray-300 text-gray-600 bg-white hover:shadow-sm transform"
            >
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </TabGroup>
    </div>
  )
}

export default ThemeSelector