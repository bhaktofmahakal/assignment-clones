import { MongoClient, Db } from 'mongodb'

// MongoDB connection URI - in production this would be in environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'elevenlabs_clone'

let client: MongoClient | null = null
let db: Db | null = null

export async function connectToDatabase() {
  if (db) {
    return { client, db }
  }

  try {
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db(MONGODB_DB)
    
    console.log('Successfully connected to MongoDB')
    return { client, db }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}
