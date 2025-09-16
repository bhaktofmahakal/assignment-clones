'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Upload, Check, FileAudio, Home, Music } from 'lucide-react'
import styles from './admin.module.css'

export default function AdminPage() {
  const [englishFile, setEnglishFile] = useState<File | null>(null)
  const [arabicFile, setArabicFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<{ en?: boolean; ar?: boolean }>({})
  const [uploadStatus, setUploadStatus] = useState<{ en?: boolean; ar?: boolean }>({})

  const handleFileChange = (language: 'en' | 'ar', file: File | null) => {
    if (language === 'en') {
      setEnglishFile(file)
    } else {
      setArabicFile(file)
    }
    setUploadStatus(prev => ({ ...prev, [language]: false }))
  }

  const handleUpload = async (language: 'en' | 'ar') => {
    const file = language === 'en' ? englishFile : arabicFile
    
    if (!file) {
      alert('Please select a file first')
      return
    }

    setUploading(prev => ({ ...prev, [language]: true }))

    try {
      const formData = new FormData()
      formData.append('language', language)
      formData.append('audio', file)

      const response = await fetch('/api/upload-audio', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus(prev => ({ ...prev, [language]: true }))
        if (language === 'en') {
          setEnglishFile(null)
        } else {
          setArabicFile(null)
        }
        const fileInput = document.getElementById(`${language}-file`) as HTMLInputElement
        if (fileInput) {
          fileInput.value = ''
        }
      } else {
        alert('Upload failed: ' + result.error)
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed')
    } finally {
      setUploading(prev => ({ ...prev, [language]: false }))
    }
  }

  return (
    <div className={styles.adminContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Music size={24} />
            </div>
            <div>
              <h1 className={styles.title}>Audio Admin Panel</h1>
              <p className={styles.subtitle}>Professional Audio Management System</p>
            </div>
          </div>
          <Link href="/" className={styles.homeLink}>
            <Home size={16} />
            Back to Home
          </Link>
        </div>
      </header>

      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h2 className={styles.heroTitle}>Upload Audio Files</h2>
          <p className={styles.heroSubtitle}>
            Upload premium quality audio content for English and Arabic languages. 
            Transform your application&apos;s user experience with professional voice integration.
          </p>
        </section>

        {/* Success Messages */}
        {uploadStatus.en && (
          <div className={styles.successMessage}>
            <Check size={20} />
            English audio uploaded successfully!
          </div>
        )}
        {uploadStatus.ar && (
          <div className={styles.successMessage}>
            <Check size={20} />
            Arabic audio uploaded successfully!
          </div>
        )}

        {/* Upload Cards */}
        <div className={styles.uploadGrid}>
          {/* English Upload Card */}
          <div className={styles.uploadCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.languageIcon} ${styles.englishIcon}`}>
                EN
              </div>
              <div>
                <h3 className={styles.cardTitle}>English Audio</h3>
                <p className={styles.cardSubtitle}>Upload premium English content</p>
              </div>
            </div>

            <input
              id="en-file"
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange('en', e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />

            <label
              htmlFor="en-file"
              className={`${styles.uploadArea} ${englishFile ? styles.uploadAreaActive : ''}`}
            >
              <FileAudio className={styles.uploadIcon} />
              {englishFile ? (
                <div>
                  <div className={styles.fileInfo}>
                    <span>📁</span>
                    <span className={styles.fileName}>{englishFile.name}</span>
                  </div>
                  <div className={styles.fileSize}>
                    {(englishFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.uploadText}>Click to choose audio file</div>
                  <div className={styles.uploadFormats}>MP3, WAV, OGG, M4A, AAC</div>
                </div>
              )}
            </label>

            <button
              onClick={() => handleUpload('en')}
              disabled={!englishFile || uploading.en}
              className={`${styles.uploadButton} ${
                !englishFile || uploading.en 
                  ? uploading.en 
                    ? styles.uploadButtonLoading 
                    : styles.uploadButtonDisabled
                  : styles.uploadButtonEnabled
              }`}
            >
              {uploading.en ? (
                <>
                  <div className={styles.spinner}></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload English Audio
                </>
              )}
            </button>
          </div>

          {/* Arabic Upload Card */}
          <div className={styles.uploadCard}>
            <div className={styles.cardHeader}>
              <div className={`${styles.languageIcon} ${styles.arabicIcon}`}>
                AR
              </div>
              <div>
                <h3 className={styles.cardTitle}>Arabic Audio</h3>
                <p className={styles.cardSubtitle}>Upload premium Arabic content</p>
              </div>
            </div>

            <input
              id="ar-file"
              type="file"
              accept="audio/*"
              onChange={(e) => handleFileChange('ar', e.target.files?.[0] || null)}
              style={{ display: 'none' }}
            />

            <label
              htmlFor="ar-file"
              className={`${styles.uploadArea} ${arabicFile ? styles.uploadAreaActive : ''}`}
            >
              <FileAudio className={styles.uploadIcon} />
              {arabicFile ? (
                <div>
                  <div className={styles.fileInfo}>
                    <span>📁</span>
                    <span className={styles.fileName}>{arabicFile.name}</span>
                  </div>
                  <div className={styles.fileSize}>
                    {(arabicFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              ) : (
                <div>
                  <div className={styles.uploadText}>Click to choose audio file</div>
                  <div className={styles.uploadFormats}>MP3, WAV, OGG, M4A, AAC</div>
                </div>
              )}
            </label>

            <button
              onClick={() => handleUpload('ar')}
              disabled={!arabicFile || uploading.ar}
              className={`${styles.uploadButton} ${
                !arabicFile || uploading.ar 
                  ? uploading.ar 
                    ? styles.uploadButtonLoading 
                    : styles.uploadButtonDisabled
                  : styles.uploadButtonEnabled
              }`}
            >
              {uploading.ar ? (
                <>
                  <div className={styles.spinner}></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={20} />
                  Upload Arabic Audio
                </>
              )}
            </button>
          </div>
        </div>

        {/* Guidelines Section */}
        <section className={styles.guidelinesSection}>
          <h3 className={styles.guidelinesTitle}>Professional Guidelines</h3>
          <div className={styles.guidelinesGrid}>
            <div className={styles.guidelineItem}>
              <div className={styles.guidelineNumber}>1</div>
              <h4 className={styles.guidelineTitle}>Upload Both Languages</h4>
              <p className={styles.guidelineText}>
                Ensure complete coverage with English and Arabic audio files
              </p>
            </div>
            <div className={styles.guidelineItem}>
              <div className={styles.guidelineNumber}>2</div>
              <h4 className={styles.guidelineTitle}>Enterprise Security</h4>
              <p className={styles.guidelineText}>
                Military-grade encryption and secure MongoDB storage
              </p>
            </div>
            <div className={styles.guidelineItem}>
              <div className={styles.guidelineNumber}>3</div>
              <h4 className={styles.guidelineTitle}>Smart Automation</h4>
              <p className={styles.guidelineText}>
                Intelligent auto-play when users select language preferences
              </p>
            </div>
            <div className={styles.guidelineItem}>
              <div className={styles.guidelineNumber}>4</div>
              <h4 className={styles.guidelineTitle}>Universal Formats</h4>
              <p className={styles.guidelineText}>
                Support for MP3, WAV, OGG, M4A, AAC formats
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}