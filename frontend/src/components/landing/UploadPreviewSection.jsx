import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useNavigate } from 'react-router-dom'
import { Upload, ImageIcon, AlertCircle } from 'lucide-react'

const UploadPreviewSection = () => {
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setError(null)
      if (fileRejections.length > 0) {
        const rej = fileRejections[0]
        const msg = rej.errors[0].code === 'file-too-large' ? 'File terlalu besar (max 5MB)' : 'Format tidak didukung'
        setError(msg)
        return
      }
      const file = acceptedFiles[0]
      if (file) {
        navigate('/detect', { state: { file } })
      }
    },
    [navigate]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  })

  return (
    <section
      id="upload-section"
      className="relative overflow-hidden rounded-2xl border-[1.5px] border-[#c4a800] py-10 px-6"
      style={{ background: 'linear-gradient(145deg, #fefcf7 0%, #fdf9ee 55%, #fbf4e0 100%)' }}
    >
      {/* Orb: bottom right */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-72 w-72 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(240,215,90,0.18) 0%, rgba(240,215,90,0.06) 55%, transparent 72%)' }}
      />
      {/* Orb: top right */}
      <div
        className="pointer-events-none absolute -top-12 right-14 h-44 w-44 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(60,139,137,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-section-title md:text-xl font-semibold text-text mb-2">
          Mulai Deteksi
        </h2>
        <p className="text-text-muted text-xs mb-6">Seret dan lepas foto wajah Anda di sini</p>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-10 cursor-pointer transition ${
            isDragActive ? 'border-teal bg-teal-xlight' : 'border-teal-light hover:border-teal'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-teal-xlight rounded-full flex items-center justify-center">
              {isDragActive ? <ImageIcon size={28} className="text-teal" /> : <Upload size={28} className="text-teal" />}
            </div>
            <p className="text-sm text-text">
              {isDragActive ? 'Lepaskan foto di sini' : 'Klik atau seret foto ke sini'}
            </p>
            <p className="text-tiny text-text-muted">JPG, PNG, WebP · Maks 5MB</p>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-500 text-sm justify-center">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
      </div>
    </section>
  )
}

export default UploadPreviewSection
