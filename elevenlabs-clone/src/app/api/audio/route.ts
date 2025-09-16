import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

// Initialize sample data with configurable audio URLs
const sampleAudioData = {
  en: {
    language: 'en',
    url: process.env.DEFAULT_ENGLISH_AUDIO_URL || 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    languageName: 'English',
    text: 'In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros.'
  },
  ar: {
    language: 'ar',
    url: process.env.DEFAULT_ARABIC_AUDIO_URL || 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
    languageName: 'Arabic', 
    text: 'In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros.'
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const language = searchParams.get('language') || 'en'
    
    // Try to connect to MongoDB
    try {
      const { db } = await connectToDatabase()
      
      // Try to find audio data in database
      const audioDoc = await db.collection('audio_files').findOne({ language })
      
      if (audioDoc) {
        return NextResponse.json({
          success: true,
          data: audioDoc
        })
      }
    } catch (dbError) {
      console.log('MongoDB not available, using sample data:', dbError)
    }
    
    // Fallback to sample data if database not available
    const audio = sampleAudioData[language as keyof typeof sampleAudioData] || sampleAudioData.en
    
    return NextResponse.json({
      success: true,
      data: audio
    })
  } catch (error) {
    console.error('Error in GET /api/audio:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch audio data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { language, url, text, languageName } = body
    
    // Try to save to MongoDB
    try {
      const { db } = await connectToDatabase()
      
      const audioData = {
        language,
        url,
        text,
        languageName,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      await db.collection('audio_files').updateOne(
        { language },
        { $set: audioData },
        { upsert: true }
      )
      
      return NextResponse.json({
        success: true,
        message: 'Audio data saved successfully to MongoDB'
      })
    } catch (dbError) {
      console.error('MongoDB save failed:', dbError)
      
      // Fallback: just log the data
      console.log('Saving audio data (fallback):', { language, url, text, languageName })
      
      return NextResponse.json({
        success: true,
        message: 'Audio data logged (MongoDB not available)'
      })
    }
  } catch (error) {
    console.error('Error in POST /api/audio:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save audio data' },
      { status: 500 }
    )
  }
}
