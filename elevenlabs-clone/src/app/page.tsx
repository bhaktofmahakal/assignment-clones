'use client'

import { useState } from 'react'
import { ChevronDown, Play, Square, Download, Mic, Users, Music, FileText, Film, Mic2, Book } from 'lucide-react'
import './elevenlabs.css'

interface VoiceChipProps {
  name: string;
  description: string;
  bgColor: string;
  textColor: string;
  dotColor: string;
}

const VoiceChip = ({ name, description, bgColor, textColor, dotColor }: VoiceChipProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <button 
      style={{ 
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '999px',
        border: 'none',
        backgroundColor: bgColor,
        color: textColor,
        fontSize: '14px',
        cursor: 'pointer',
        fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
        boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : '0 2px 4px rgba(0, 0, 0, 0.1)',
        whiteSpace: 'nowrap'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ 
        width: '10px',
        height: '10px',
        backgroundColor: dotColor,
        borderRadius: '50%',
        flexShrink: 0
      }}></span>
      <span style={{ fontWeight: '600', fontSize: '13px' }}>{name}</span>
      <span style={{ fontSize: '12px', opacity: 0.8 }}>{description}</span>
    </button>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('text-to-speech')
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Remove Waldenburg font loading to avoid errors
  // Will use serif as fallback

  const [isPlaying, setIsPlaying] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null)
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string>('')
  const [textContent, setTextContent] = useState('In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the "burn it all down" kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.')

  const handlePlayAudio = async () => {
    if (isGenerating) return
    
    // If currently playing, stop instead
    if (isPlaying && currentAudio) {
      handleStopAudio()
      return
    }
    
    setIsGenerating(true)
    
    try {
      console.log(`Loading local audio for language: ${selectedLanguage}`)
      
      // Use local audio files based on selected language
      const audioFileName = selectedLanguage === 'en' ? 'english.mp3' : 'arabic.mp3'
      const audioUrl = `/${audioFileName}`
      
      console.log(`Playing audio from: ${audioUrl}`)
      setCurrentAudioUrl(audioUrl)
      
      const audio = new Audio(audioUrl)
      
      // Add event listeners before setting as current audio
      audio.addEventListener('loadstart', () => {
        console.log('Audio loading started')
      })
      
      audio.addEventListener('canplay', () => {
        console.log('Audio can start playing')
      })
      
      audio.addEventListener('ended', () => {
        console.log('Audio playback ended')
        setIsPlaying(false)
        setCurrentAudio(null)
      })
      
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e)
        setIsPlaying(false)
        setCurrentAudio(null)
        alert(`Error playing ${selectedLanguage === 'en' ? 'English' : 'Arabic'} audio. The audio file may not be available.`)
      })

      // Set the audio and playing state
      setCurrentAudio(audio)
      setIsPlaying(true)

      // Attempt to play
      try {
        await audio.play()
        console.log('Audio playback started successfully')
      } catch (playError) {
        console.error('Play error:', playError)
        setIsPlaying(false)
        setCurrentAudio(null)
        alert(`Could not play ${selectedLanguage === 'en' ? 'English' : 'Arabic'} audio. Browser may have blocked autoplay.`)
      }
    } catch (error) {
      console.error('Error in handlePlayAudio:', error)
      alert(`Error loading ${selectedLanguage === 'en' ? 'English' : 'Arabic'} audio file`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleStopAudio = () => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
      setCurrentAudio(null)
    }
    setIsPlaying(false)
  }

  const handleDownloadAudio = () => {
    if (currentAudioUrl) {
      const link = document.createElement('a')
      link.href = currentAudioUrl
      link.download = `elevenlabs-audio-${Date.now()}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px'
        }}>
          {/* Logo */}
          <div style={{ 
            fontSize: '18px', 
            fontWeight: '700',
            letterSpacing: '-0.5px',
            fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
            color: '#000000'
          }}>
            IIElevenLabs
          </div>
          
          {/* Navigation */}
          <nav style={{ 
            display: 'flex', 
            gap: '36px', 
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            marginLeft: '60px'
          }}>
            <button 
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#111827'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#374151'
              }}
              style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151',
              fontWeight: '500',
              padding: '8px',
              transition: 'color 0.2s ease',
              fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
              borderRadius: '6px'
            }}>
              <span>Creative Platform</span>
              <ChevronDown size={16} />
            </button>
            <button style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151',
              fontWeight: '500',
              padding: '4px',
              transition: 'color 0.2s ease',
              fontFamily: 'Inter, sans-serif'
            }}>
              <span>Agents Platform</span>
              <ChevronDown size={16} />
            </button>
            <button style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#4b5563',
              fontWeight: '500',
              padding: '4px',
              transition: 'color 0.2s ease'
            }}>
              <span>Developers</span>
              <ChevronDown size={16} />
            </button>
            <button style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#4b5563',
              fontWeight: '500',
              padding: '4px',
              transition: 'color 0.2s ease'
            }}>
              <span>Resources</span>
              <ChevronDown size={16} />
            </button>
            <a href="#" style={{ 
              textDecoration: 'none',
              color: '#374151',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease',
              fontFamily: 'Inter, sans-serif'
            }}>
              Enterprise
            </a>
            <a href="#" style={{ 
              textDecoration: 'none',
              color: '#4b5563',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}>
              Pricing
            </a>
          </nav>
          
          {/* Auth Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'center'
          }}>
            <button style={{ 
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#374151',
              fontWeight: '500',
              padding: '8px 12px',
              transition: 'color 0.2s ease',
              fontFamily: 'Inter, sans-serif'
            }}>
              Log in
            </button>
            <button style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif'
            }}>
              Sign up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ 
        padding: '120px 24px 80px',
        textAlign: 'center',
        backgroundColor: '#ffffff'
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            fontWeight: 400,
            fontSize: '80px',
            lineHeight: 0.95,
            letterSpacing: '-0.025em',
            marginBottom: '32px',
            color: '#000000',
            maxWidth: '1000px',
            margin: '0 auto 32px'
          }}>
            The most realistic voice AI platform
          </h1>
          <p style={{ 
            fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
            fontSize: '1.25rem',
            lineHeight: '1.7',
            color: '#4b5563',
            marginBottom: '48px',
            maxWidth: '700px',
            margin: '0 auto 48px',
            fontWeight: '400'
          }}>
            AI voice models and products powering millions of developers, creators, and enterprises. From 
            low‑latency conversational agents to the leading AI voice generator for voiceovers and audiobooks.
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px'
          }}>
            <button 
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1f2937'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#000000'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.15)'
              }}
              style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '16px 36px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
            }}>
              Sign up
            </button>
            <button 
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#e5e7eb'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.05)'
              }}
              style={{
              backgroundColor: '#f3f4f6',
              color: '#111827',
              padding: '16px 36px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.05)'
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section style={{ 
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '20px 24px'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {[
            { id: 'text-to-speech', label: 'TEXT TO SPEECH', Icon: Mic },
            { id: 'agents', label: 'AGENTS', Icon: Users },
            { id: 'music', label: 'MUSIC', Icon: Music },
            { id: 'speech-to-text', label: 'SPEECH TO TEXT', Icon: FileText },
            { id: 'dubbing', label: 'DUBBING', Icon: Film },
            { id: 'voice-cloning', label: 'VOICE CLONING', Icon: Mic2 },
            { id: 'elevenreader', label: 'ELEVENREADER', Icon: Book }
          ].map(tab => {
            const IconComponent = tab.Icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  backgroundColor: activeTab === tab.id ? '#111827' : '#f3f4f6',
                  color: activeTab === tab.id ? '#ffffff' : '#6b7280',
                  transition: 'all 0.2s'
                }}
              >
                <IconComponent size={16} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </section>

      {/* Main Content Area with COMPLETE gradient background */}
      <section style={{ 
        padding: '60px 24px 0',
        backgroundColor: '#f9fafb',
        position: 'relative'
      }}>
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>
          {/* FULL Gradient Background Container - Complete Background not just border */}
          <div style={{
            background: 'radial-gradient(circle at 100% 85%, rgb(253, 95, 58) 3%, rgb(232, 121, 249) 10%, rgb(103, 232, 249) 20%, rgb(243, 244, 246) 40%)',
            borderRadius: '24px',
            padding: '28px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
          }}>
            {/* Text Area */}
            <div 
              contentEditable
              suppressContentEditableWarning={true}
              onInput={(e) => setTextContent(e.currentTarget.textContent || '')}
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px',
                minHeight: '220px',
                fontSize: '17px',
                lineHeight: '1.7',
                color: '#111827',
                fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
                border: 'none',
                backdropFilter: 'blur(8px)',
                outline: 'none'
              }}
            >
              {textContent}
            </div>
            
            {/* Voice Chips */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '10px',
              marginBottom: '24px'
            }}>
              <VoiceChip 
                name="Samara" 
                description="Narrate a story" 
                bgColor="#e0f2fe" 
                textColor="#0369a1" 
                dotColor="#0ea5e9"
              />
              <VoiceChip 
                name="2 speakers" 
                description="Create a dialogue" 
                bgColor="#fce7f3" 
                textColor="#be185d" 
                dotColor="#ec4899"
              />
              <VoiceChip 
                name="Announcer" 
                description="Voiceover a game" 
                bgColor="#dcfdf7" 
                textColor="#047857" 
                dotColor="#10b981"
              />
              <VoiceChip 
                name="Sergeant" 
                description="Play a drill sergeant" 
                bgColor="#f3e8ff" 
                textColor="#7e22ce" 
                dotColor="#a855f7"
              />
              <VoiceChip 
                name="Spuds" 
                description="Recount an old story" 
                bgColor="#e0f2fe" 
                textColor="#0369a1" 
                dotColor="#0ea5e9"
              />
              <VoiceChip 
                name="Jessica" 
                description="Provide customer support" 
                bgColor="#fce7f3" 
                textColor="#be185d" 
                dotColor="#ec4899"
              />
            </div>

            {/* Controls */}
            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              {/* Language Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#111827',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  <span style={{ fontSize: '18px' }}>{selectedLanguage === 'en' ? 'US' : 'AR'}</span>
                  <span style={{ fontWeight: '600', fontSize: '13px' }}>{selectedLanguage === 'en' ? 'ENGLISH' : 'ARABIC'}</span>
                  <ChevronDown size={16} style={{ 
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s'
                  }} />
                </button>

                {isDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    zIndex: 10,
                    minWidth: '160px'
                  }}>
                    <button
                      onClick={() => { 
                        setSelectedLanguage('en')
                        setIsDropdownOpen(false)
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                        fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
                        textAlign: 'left',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>US</span>
                      <span style={{ fontWeight: '600' }}>ENGLISH</span>
                    </button>
                    <button
                      onClick={() => { 
                        setSelectedLanguage('ar')
                        setIsDropdownOpen(false)
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }}
                      style={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        width: '100%',
                        border: 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#111827',
                        fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
                        textAlign: 'left',
                        transition: 'background-color 0.2s ease'
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>AR</span>
                      <span style={{ fontWeight: '600' }}>ARABIC</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ 
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <button
                  onClick={isPlaying ? handleStopAudio : handlePlayAudio}
                  disabled={isGenerating}
                  onMouseEnter={(e) => {
                    if (!isGenerating) {
                      e.currentTarget.style.backgroundColor = isPlaying ? '#dc2626' : '#1f2937'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.25)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isGenerating) {
                      e.currentTarget.style.backgroundColor = isPlaying ? '#ef4444' : '#000000'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: isGenerating ? '#6b7280' : (isPlaying ? '#ef4444' : '#000000'),
                    color: '#ffffff',
                    padding: '12px 28px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    fontSize: '13px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    minWidth: '130px',
                    justifyContent: 'center',
                    fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    opacity: isGenerating ? 0.6 : 1
                  }}
                >
                  {isGenerating ? 
                    <div style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} /> :
                    (isPlaying ? <Square size={14} fill="white" strokeWidth={0} /> : <Play size={14} fill="white" strokeWidth={0} />)
                  }
                  <span>{isGenerating ? 'GENERATING...' : (isPlaying ? 'STOP' : 'PLAY')}</span>
                </button>
                <button 
                  onClick={handleDownloadAudio}
                  disabled={!currentAudioUrl}
                  onMouseEnter={(e) => {
                    if (currentAudioUrl) {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentAudioUrl) {
                      e.currentTarget.style.backgroundColor = '#ffffff'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  style={{
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  cursor: currentAudioUrl ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  opacity: currentAudioUrl ? 1 : 0.5
                }}>
                  <Download size={20} color="#6b7280" />
                </button>
              </div>
            </div>
            
            {/* Powered by text - inside the card */}
            <div style={{ 
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '12px',
              color: '#9ca3af',
              fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif'
            }}>
              Powered by Eleven v3 (alpha)
            </div>
          </div>
          
          {/* Experience the full audio AI platform - Outside gradient container */}
          <div style={{
            textAlign: 'center',
            marginTop: '60px',
            padding: '60px 20px',
            backgroundColor: '#ffffff'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
              marginBottom: '32px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              EXPERIENCE THE FULL AUDIO AI PLATFORM
            </h2>
            <button style={{
              backgroundColor: '#000000',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'Waldenburg, "Waldenburg Regular Fallback", Inter, sans-serif',
              transition: 'all 0.2s ease'
            }}>
              Sign up
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
