'use client'

import React from 'react'
import { MessageSquare, Users, Music, FileText, Film, Mic, BookOpen } from 'lucide-react'

interface Tab {
  id: string
  name: string
  icon: React.ReactNode
}

const tabs: Tab[] = [
  { id: 'text-to-speech', name: 'TEXT TO SPEECH', icon: <MessageSquare size={16} /> },
  { id: 'agents', name: 'AGENTS', icon: <Users size={16} /> },
  { id: 'music', name: 'MUSIC', icon: <Music size={16} /> },
  { id: 'speech-to-text', name: 'SPEECH TO TEXT', icon: <FileText size={16} /> },
  { id: 'dubbing', name: 'DUBBING', icon: <Film size={16} /> },
  { id: 'voice-cloning', name: 'VOICE CLONING', icon: <Mic size={16} /> },
  { id: 'elevenreader', name: 'ELEVENREADER', icon: <BookOpen size={16} /> },
]

interface TabsNavigationProps {
  activeTab: string
  onTabChange: (tabId: string) => void
}

export default function TabsNavigation({ activeTab, onTabChange }: TabsNavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full font-medium text-sm transition-colors
                ${activeTab === tab.id 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
