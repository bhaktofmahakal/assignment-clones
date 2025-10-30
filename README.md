
# ElevenLabs Clone

A high-fidelity clone of the ElevenLabs Text-to-Speech platform built with Next.js, featuring audio playback functionality and MongoDB integration.

### Live Links
### [Cursor](https://cursorcom-website-clone-17612950779.vercel.app/)
### [Grok](https://ai-website-clone-1761067857895.vercel.app/)
### [Elevelabs](https://elevenlabs-clone-gilt.vercel.app/)
### [VectorShift](https://vectorshift-clone-frontend.vercel.app/)

## Features

- **Responsive UI Design**: Pixel-perfect recreation of ElevenLabs interface
- **Text-to-Speech Interface**: Complete tab navigation with focus on Text-to-Speech functionality
- **Audio Playback**: Language-specific audio playback (English/Arabic)
- **MongoDB Integration**: Audio files stored and served from MongoDB Atlas
- **Admin Panel**: File upload interface for managing audio content
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and MongoDB

## Technology Stack

- **Frontend**: Next.js 15.5.3 with TypeScript
- **Build Tool**: Turbopack for fast development
- **Database**: MongoDB Atlas
- **Styling**: CSS-in-JS with inline styles
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Runtime**: Node.js

## Project Structure

```
elevenlabs-clone/
├── src/
│   ├── app/
│   │   ├── admin/           # Admin panel for file upload
│   │   ├── api/             # API routes
│   │   │   ├── audio/       # Audio CRUD operations
│   │   │   └── upload-audio/ # File upload endpoint
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── TabsNavigation.tsx
│   │   └── TextToSpeechTab.tsx
│   └── lib/
│       └── mongodb.ts       # Database connection
├── public/                  # Static assets
├── .env.local              # Environment variables
└── package.json
```

## Installation & Setup

### Prerequisites
- Node.js 18+ installed
- MongoDB Atlas account
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd elevenlabs-clone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=appname
MONGODB_DB=elevenlabs_clone

# Audio Configuration
DEFAULT_ENGLISH_AUDIO_URL=https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg
DEFAULT_ARABIC_AUDIO_URL=https://commondatastorage.googleapis.com/codeskulptor-demos/pyman_assets/intromusic.ogg
```

### 4. Start Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## API Endpoints

### GET /api/audio
Retrieve audio data by language.

**Query Parameters:**
- `language` (string): Language code ('en' or 'ar')

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "objectId",
    "language": "en",
    "url": "https://example.com/audio.ogg",
    "fileName": "sample.ogg",
    "text": "Sample text content",
    "languageName": "English"
  }
}
```

### POST /api/audio
Create or update audio data.

**Request Body:**
```json
{
  "language": "en",
  "url": "https://example.com/audio.ogg",
  "text": "Audio content text",
  "languageName": "English"
}
```

### POST /api/upload-audio
Upload audio files (placeholder endpoint).

## Database Schema

### Audio Files Collection
```javascript
{
  _id: ObjectId,
  language: String,        // 'en' or 'ar'
  url: String,            // Audio file URL
  fileName: String,       // Original filename
  text: String,           // Associated text content
  languageName: String,   // Display name
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Vercel Deployment
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

### Environment Variables for Production
Configure the following in your Vercel dashboard:
- `MONGODB_URI`
- `MONGODB_DB`
- `DEFAULT_ENGLISH_AUDIO_URL`
- `DEFAULT_ARABIC_AUDIO_URL`

## Usage

1. **Main Interface**: Visit the homepage to access the Text-to-Speech interface
2. **Language Selection**: Use the dropdown to switch between English and Arabic
3. **Audio Playback**: Click the PLAY button to hear the selected language audio
4. **Admin Panel**: Visit `/admin` to upload and manage audio files

## Core Functionality

- **Header Navigation**: Complete ElevenLabs-style navigation bar
- **Tab System**: Multiple tabs with Text-to-Speech as the active tab
- **Voice Selection**: Pre-configured voice options with character descriptions
- **Text Editor**: Plain text display area with sample content
- **Audio Controls**: Play button with language-specific audio playback
- **Download Feature**: Download button for audio files

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

- **Build Size**: Optimized with Turbopack
- **Loading Time**: Sub-second page loads
- **Audio Streaming**: Progressive audio loading
- **Responsive Design**: Mobile-first approach

## Contributing

This is an assignment project. The codebase follows:
- TypeScript strict mode
- ESLint configuration
- Component-based architecture
- Inline CSS styling for rapid development

## Author

**Utsav Mishra**
- Email: utsavmishraa005@gmail.com
- Assignment: ElevenLabs Clone Implementation

## License

This project is created for educational/assignment purposes.

---

**Built with Next.js and MongoDB Atlas**
