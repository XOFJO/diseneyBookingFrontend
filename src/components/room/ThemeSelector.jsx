import React from 'react'
import { TabGroup, TabList, Tab } from '@headlessui/react'

const ThemeSelector = ({ activeTab, setActiveTab, onThemeFilter }) => {
  const tabs = [
    { key: 'standard', label: 'Iron man themes' },
    { key: 'packages', label: 'Micky Mouse' }
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
      <h3 className="text-xl font-bold text-gray-800 mb-4">Theme Selection</h3>
      <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
        <TabList className="flex border-b mb-6">
          {tabs.map((tab) => (
            <Tab
              key={tab.key}
              className="px-6 py-3 font-medium border-b-2 outline-none data-[selected]:border-blue-500 data-[selected]:text-blue-600 data-[hover]:text-gray-700 data-[focus]:text-gray-700 border-transparent text-gray-500"
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