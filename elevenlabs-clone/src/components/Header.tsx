'use client'

import { ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-black">IIElevenLabs</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
              <span>Creative Platform</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
              <span>Agents Platform</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
              <span>Developers</span>
              <ChevronDown size={16} />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
              <span>Resources</span>
              <ChevronDown size={16} />
            </div>
            <span className="cursor-pointer hover:text-gray-700">Enterprise</span>
            <span className="cursor-pointer hover:text-gray-700">Pricing</span>
          </nav>

          {/* Auth buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-black font-medium">
              Log in
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
