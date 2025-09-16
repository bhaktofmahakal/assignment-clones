'use client'

import { useState } from 'react'
import { Play, Download, ChevronDown } from 'lucide-react'

interface VoiceChip {
  id: string
  name: string
  description: string
  color: string
}

const voiceChips: VoiceChip[] = [
  { id: 'samara', name: 'Samara', description: 'Narrate a story', color: 'bg-cyan-100 text-cyan-800' },
  { id: 'jessica', name: 'Jessica', description: 'Provide customer support', color: 'bg-pink-100 text-pink-800' },
  { id: 'spuds', name: 'Spuds', description: 'Recount an old story', color: 'bg-cyan-100 text-cyan-800' },
  { id: '2speakers', name: '2 speakers', description: 'Create a dialogue', color: 'bg-pink-100 text-pink-800' },
  { id: 'announcer', name: 'Announcer', description: 'Voiceover a game', color: 'bg-cyan-100 text-cyan-800' },
  { id: 'sergeant', name: 'Sergeant', description: 'Play a drill sergeant', color: 'bg-purple-100 text-purple-800' },
]

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'ENGLISH', flag: 'US' },
  { code: 'ar', name: 'ARABIC', flag: 'AR' },
]

interface TextToSpeechTabProps {
  onLanguageChange: (language: string) => void
  onPlayAudio: () => void
}

export default function TextToSpeechTab({ onLanguageChange, onPlayAudio }: TextToSpeechTabProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [text, setText] = useState(`In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.`)

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode)
    setIsDropdownOpen(false)
    onLanguageChange(langCode)
  }

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0]

  return (
    <div className="bg-white py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content Area */}
        <div className="bg-gradient-to-br from-orange-50 to-purple-50 rounded-2xl p-6 mb-8 border border-gray-200 shadow-lg">
          {/* Text Editor */}
          <div className="mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-48 p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-gray-800 leading-relaxed"
              placeholder="Enter your text here..."
              style={{ fontSize: '16px', lineHeight: '1.6' }}
            />
          </div>

          {/* Voice Chips */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              {voiceChips.map((chip) => (
                <div
                  key={chip.id}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium cursor-pointer hover:opacity-80 ${chip.color}`}
                >
                  <div className="w-2 h-2 rounded-full bg-current"></div>
                  <span className="font-semibold">{chip.name}</span>
                  <span className="text-xs opacity-75">{chip.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span className="text-lg">{selectedLang.flag}</span>
                <span className="font-medium">{selectedLang.name}</span>
                <ChevronDown size={16} className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Play and Download Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={onPlayAudio}
                className="flex items-center space-x-2 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <Play size={16} fill="currentColor" />
                <span>PLAY</span>
              </button>
              <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Download size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">Powered by Eleven v3 (alpha)</p>
          <div className="flex justify-center items-center space-x-4">
            <span className="text-sm text-gray-800 font-medium">EXPERIENCE THE FULL AUDIO AI PLATFORM</span>
            <button className="bg-black text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800">
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
