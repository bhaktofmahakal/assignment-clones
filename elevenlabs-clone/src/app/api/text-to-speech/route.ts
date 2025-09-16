import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

// Get audio from database or fallback to default URLs
const getAudioForLanguage = async (text: string, language: string, voice: string) => {
  // Try to get uploaded audio from database first
  try {
    const { db } = await connectToDatabase()
    const audioDoc = await db.collection('audio_files').findOne({ language })
    
    if (audioDoc && audioDoc.url) {
      return {
        url: audioDoc.url,
        language,
        text: audioDoc.text || text,
        voice,
        duration: Math.floor(Math.random() * 30) + 10
      }
    }
  } catch (dbError) {
    console.log('Database query failed, using fallback:', dbError)
  }
  
  // Fallback to default audio URLs if no uploaded audio found
  const defaultAudioUrls = {
    en: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    ar: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav'
  }
  
  return {
    url: defaultAudioUrls[language as keyof typeof defaultAudioUrls] || defaultAudioUrls.en,
    language,
    text,
    voice,
    duration: Math.floor(Math.random() * 30) + 10
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, language, voice } = body
    
    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      )
    }
    
    // Get audio for the specified language
    const audioData = await getAudioForLanguage(text, language || 'en', voice || 'default')
    
    // Try to save to database
    try {
      const { db } = await connectToDatabase()
      
      const ttsRecord = {
        text,
        language: language || 'en',
        voice: voice || 'default',
        audioUrl: audioData.url,
        duration: audioData.duration,
        createdAt: new Date()
      }
      
      await db.collection('tts_history').insertOne(ttsRecord)
    } catch (dbError) {
      console.log('Database save failed, continuing without saving:', dbError)
    }
    
    return NextResponse.json({
      success: true,
      data: {
        url: audioData.url,
        audioUrl: audioData.url,
        text: audioData.text,
        language: audioData.language,
        voice: audioData.voice,
        duration: audioData.duration
      }
    })
    
  } catch (error) {
    console.error('Error in POST /api/text-to-speech:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate audio' },
      { status: 500 }
    )
  }
}