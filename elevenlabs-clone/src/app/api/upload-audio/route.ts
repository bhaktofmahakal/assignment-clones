import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const language = formData.get('language') as string
    const audioFile = formData.get('audio') as File

    if (!language || !audioFile) {
      return NextResponse.json(
        { success: false, error: 'Language and audio file are required' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await audioFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    try {
      await mkdir(uploadsDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Generate unique filename
    const timestamp = Date.now()
    const fileName = `${language}-${timestamp}-${audioFile.name}`
    const filePath = path.join(uploadsDir, fileName)

    // Write file to public/uploads
    await writeFile(filePath, buffer)

    const audioUrl = `/uploads/${fileName}`

    // Try to save to database
    try {
      const { db } = await connectToDatabase()
      
      const audioData = {
        language,
        url: audioUrl,
        fileName: audioFile.name,
        originalName: audioFile.name,
        fileSize: audioFile.size,
        mimeType: audioFile.type,
        text: 'In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros.',
        languageName: language === 'en' ? 'English' : 'Arabic',
        uploadedAt: new Date(),
        updatedAt: new Date()
      }

      // Update or insert the audio data
      await db.collection('audio_files').updateOne(
        { language },
        { $set: audioData },
        { upsert: true }
      )

      console.log(`Audio uploaded successfully for ${language}: ${audioUrl}`)

      return NextResponse.json({
        success: true,
        message: 'Audio uploaded successfully',
        data: {
          language,
          url: audioUrl,
          fileName,
          size: audioFile.size
        }
      })
    } catch (dbError) {
      console.error('Database save failed:', dbError)
      
      // Even if DB fails, file is saved locally
      return NextResponse.json({
        success: true,
        message: 'Audio uploaded successfully (file saved locally)',
        data: {
          language,
          url: audioUrl,
          fileName,
          size: audioFile.size
        }
      })
    }
  } catch (error) {
    console.error('Error in POST /api/upload-audio:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to upload audio' },
      { status: 500 }
    )
  }
}